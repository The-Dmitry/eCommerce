'use server';

import { COOKIES_DATA } from '@/src/shared/constants/cookies-data';
import NewCartItemData from '@/src/shared/models/new-cart-item-data';
import { NewCustomer } from '@/src/shared/models/NewCustomer';
import { ResponseError } from '@/src/shared/models/ResponseError';
import UserData from '@/src/shared/models/UserData';
import updateCart from '@/src/shared/utils/api/cart/update-cart';
import fetchWithToken from '@/src/shared/utils/api/fetch-with-token';
import loginUser from '@/src/shared/utils/api/login-user';
import revokeToken from '@/src/shared/utils/api/revoke-token';
import signupSchema, {
  SignupData,
} from '@/src/shared/utils/schemas/signupShema';
import { cookies } from 'next/headers';
import { ZodFormattedError } from 'zod';
import loginSchema, {
  LoginData,
} from '../src/shared/utils/schemas/loginSchema';

interface AuthResult<T extends LoginData | SignupData> {
  auth?: string;
  credentials: ZodFormattedError<T>;
}

export async function authQuery(
  _: unknown,
  data: FormData
): Promise<AuthResult<LoginData>> {
  const obj = Object.fromEntries(data.entries());
  const validationResult = await loginSchema.safeParseAsync(obj);
  if (!validationResult.success) {
    return { credentials: validationResult.error.format() };
  }
  const { email, password } = obj as LoginData;
  return await loginUser(email, password);
}

export async function createUser(
  _: unknown,
  data: FormData
): Promise<AuthResult<SignupData>> {
  const obj = Object.fromEntries(data.entries());
  const validationResult = await signupSchema.safeParseAsync(obj);
  if (!validationResult.success) {
    return { credentials: validationResult.error.format() };
  }
  const { email, firstName, lastName, password } = obj as SignupData;
  const URL = `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/customers`;
  const result = await fetchWithToken<NewCustomer<ResponseError>>(URL, {
    method: 'POST',
    body: JSON.stringify({ email, firstName, lastName, password }),
  });

  if ('customer' in result) {
    await loginUser(email, password);
  }
  return { auth: result.message, credentials: { _errors: [] } };
}

export async function getUserData(): Promise<UserData | ResponseError> {
  const URL = `${process.env.HOST_URL}/${process.env.PROJECT_KEY}/me`;
  const result = await fetchWithToken<UserData>(
    URL,
    {
      method: 'GET',
    },
    revokeToken
  );
  return result;
}

export async function logOut() {
  const cookieStore = cookies();

  cookieStore.getAll().forEach((cookie) => {
    cookieStore.set({
      name: cookie.name,
      value: '',
      expires: new Date(0),
      path: '/',
    });
  });
}

export async function addProductToCart({
  productId,
  variantId,
  quantity = 1,
}: NewCartItemData) {
  const version = cookies().get(COOKIES_DATA.CART_VERSION)?.value;
  const body = JSON.stringify({
    version: version ? +version : 1, // Current cart version
    actions: [
      {
        action: 'addLineItem',
        productId: productId,
        variantId: variantId,
        quantity: quantity,
      },
    ],
  });
  const result = await updateCart(body);

  return result;
}
