'use client';

import UserData from '@/src/shared/models/UserData';
import SubmitButton from '@/src/shared/ui/submit-button';
import changePersonalData from '@/src/shared/utils/api/personal/change-personal-data';
import { useFormState } from 'react-dom';
import Autocomplete from '../form/autocomplete';
import Form from '../form/form';

export default function PersonalDataForm({ userData }: { userData: UserData }) {
  const [errors, action] = useFormState(changePersonalData, null);
  const {
    firstName = '',
    lastName = '',
    dateOfBirth = '',
  } = 'id' in userData ? userData : {};

  const addresses = 'id' in userData ? userData.addresses : [];

  const {
    country = '',
    city = '',
    streetName = '',
    streetNumber = '',
  } = addresses.length ? addresses.at(-1)! : {};

  const firstNameError = errors?.credentials.firstName?._errors[0];
  const lastNameError = errors?.credentials.lastName?._errors[0];
  const dateOfBirthError = errors?.credentials.dateOfBirth?._errors[0];
  const countryError = errors?.credentials.country?._errors[0];

  return (
    <Form className='w-full' action={action}>
      <div className='flex w-full flex-col gap-4'>
        <div className='flex flex-col flex-wrap gap-4 sm:flex-row'>
          <Form.Text
            name='firstName'
            text='First Name'
            defaultValue={firstName}
            divClassName='flex-[1_1_48%]'
            hasError={!!firstNameError}
            className='capitalize'
          >
            {firstNameError && <Form.Error text={firstNameError} />}
          </Form.Text>
          <Form.Text
            name='lastName'
            text='Last Name'
            defaultValue={lastName}
            divClassName='flex-[1_1_48%]'
            hasError={!!lastNameError}
            className='capitalize'
          >
            {lastNameError && <Form.Error text={lastNameError} />}
          </Form.Text>
          <Form.Date
            name='dateOfBirth'
            text='Date of birth'
            defaultValue={dateOfBirth}
            className='grow'
          >
            {dateOfBirthError && <Form.Error text={dateOfBirthError} />}
          </Form.Date>
        </div>
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4'>
          <Autocomplete name='country' defaultValue={country} text='Country'>
            {countryError && <Form.Error text={countryError} />}
          </Autocomplete>
          <Form.Text
            name='city'
            text='City'
            defaultValue={city}
            autoComplete='off'
            className='capitalize'
          ></Form.Text>
          <Form.Text
            name='streetName'
            text='Street Name'
            defaultValue={streetName}
            autoComplete='off'
            className='capitalize'
          ></Form.Text>
          <Form.Input
            type='number'
            name='streetNumber'
            defaultValue={streetNumber}
            text='Street Number'
          ></Form.Input>
        </div>
      </div>
      {errors?.success ? (
        <p className='flex h-8 w-44 select-none items-center justify-center rounded-md bg-green-600 text-lg text-white'>
          Success
        </p>
      ) : (
        <SubmitButton>Accept</SubmitButton>
      )}
    </Form>
  );
}
