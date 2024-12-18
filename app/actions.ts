'use server';

import { BASE_URL } from '@/src/shared/constants/base-url';
import { COOKIES_DATA } from '@/src/shared/constants/cookies-data';
import { CartData } from '@/src/shared/models/CartData';
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
import validateForm from '@/src/shared/utils/validate-form';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
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
  const validationResult = await validateForm(loginSchema, data);
  if (!validationResult.success) {
    return { credentials: validationResult.error.format() };
  }
  const { email, password } = validationResult.data;
  const success = await loginUser(email, password);
  if (typeof success === 'boolean') redirect('/');
  return success;
}

export async function createUser(
  _: unknown,
  data: FormData
): Promise<AuthResult<SignupData>> {
  const validationResult = await validateForm(signupSchema, data);
  if (!validationResult.success) {
    return { credentials: validationResult.error.format() };
  }
  const { email, firstName, lastName, password } = validationResult.data;
  const result = await fetchWithToken<NewCustomer<ResponseError>>(
    `${BASE_URL.HOST}/customers`,
    {
      method: 'POST',
      body: JSON.stringify({ email, firstName, lastName, password }),
    }
  );

  if ('customer' in result) {
    const success = await loginUser(email, password);
    if (success) redirect('/');
  }
  return { auth: result.message, credentials: { _errors: [] } };
}

export async function getUserData(): Promise<UserData | ResponseError> {
  const URL = `${BASE_URL.HOST}/me`;
  const result = await fetchWithToken<UserData>(
    URL,
    {
      method: 'GET',
    },
    revokeToken
  );
  return result;
}

export async function logOut(needRedirect?: boolean) {
  const cookieStore = cookies();

  cookieStore.getAll().forEach((cookie) => {
    cookieStore.set({
      name: cookie.name,
      value: '',
      expires: new Date(0),
      path: '/',
    });
  });
  if (needRedirect) {
    redirect('/');
  }
}

export async function addProductToCart({
  productId,
  variantId,
  quantity = 1,
}: NewCartItemData) {
  const version = cookies().get(COOKIES_DATA.CART_VERSION)?.value;
  const body = JSON.stringify({
    version: version ? +version : 1,
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

export async function removeProductFromCart({
  lineItemId,
  quantity = 1,
}: {
  lineItemId: string;
  quantity: number;
}) {
  const version = cookies().get(COOKIES_DATA.CART_VERSION)?.value;
  const body = JSON.stringify({
    version: version ? +version : 1,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId: lineItemId,
        quantity,
      },
    ],
  });

  const result = await updateCart(body);

  return result;
}

export async function deleteCart() {
  const version = cookies().get(COOKIES_DATA.CART_VERSION)?.value;
  const id = cookies().get(COOKIES_DATA.CART_ID)?.value;
  const result = await fetchWithToken<CartData>(
    `${BASE_URL.HOST}/me/carts/${id}?version=${version}`,
    {
      method: 'DELETE',
    }
  );
  if (!('errors' in result)) {
    cookies().delete(COOKIES_DATA.CART_VERSION);
    cookies().delete(COOKIES_DATA.CART_ID);
  }
}

export async function applyPromoCode(_: unknown, kek: FormData) {
  const value = kek.get('code')?.toString();

  if (!value) {
    return '';
  }
  const version = cookies().get(COOKIES_DATA.CART_VERSION)?.value;
  const id = cookies().get(COOKIES_DATA.CART_ID)?.value;
  const code = value.toUpperCase();
  const result = await fetchWithToken<CartData>(
    `${BASE_URL.HOST}/carts/${id}`,
    {
      method: 'POST',
      body: JSON.stringify({
        version: version ? +version : 1,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      }),
    }
  );

  if ('version' in result) {
    cookies().set(COOKIES_DATA.CART_VERSION, `${result.version}`);
    return '';
  }
  return result.message;
}
