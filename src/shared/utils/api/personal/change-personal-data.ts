'use server';

import { getUserData } from '@/app/actions';
import { BASE_URL } from '@/src/shared/constants/base-url';
import UserData from '@/src/shared/models/UserData';
import { ZodFormattedError } from 'zod';
import filterObjectEmptyValues from '../../filter-object-empty-values';
import personalDataChangeScheme, {
  PersonalChangeData,
} from '../../schemas/personal-data-change-scheme';
import validateForm from '../../validate-form';
import fetchWithToken from '../fetch-with-token';

interface ChangePersonalDataResult {
  success?: boolean;
  auth?: string;
  credentials: ZodFormattedError<PersonalChangeData>;
}

export default async function changePersonalData(
  _: unknown,
  data: FormData
): Promise<ChangePersonalDataResult> {
  const validationResult = await validateForm(personalDataChangeScheme, data);

  if (!validationResult.success) {
    return { credentials: validationResult.error.format() };
  }

  const test = await getUserData();
  if ('errors' in test) {
    return { auth: 'User not found!', credentials: { _errors: [] } };
  }
  const { id, version } = test;

  const {
    firstName,
    lastName,
    dateOfBirth,
    country,
    city,
    streetName,
    streetNumber,
  } = validationResult.data;
  const URL = `${BASE_URL.HOST}/customers/${id}`;
  console.log(URL);

  const actions = [
    filterObjectEmptyValues({ action: 'setFirstName', firstName }),
    filterObjectEmptyValues({ action: 'setLastName', lastName }),
    filterObjectEmptyValues({ action: 'setDateOfBirth', dateOfBirth }),
    {
      action: 'addAddress',
      address: filterObjectEmptyValues({
        firstName,
        lastName,
        streetName,
        streetNumber,
        city,
        country,
      }),
    },
  ];

  const request = await fetchWithToken<UserData>(URL, {
    method: 'POST',
    body: JSON.stringify({
      version: version,
      actions,
    }),
  });

  return 'errors' in request
    ? { auth: request.message, credentials: { _errors: [] } }
    : { auth: '', credentials: { _errors: [] }, success: true };
}
