import SubmitButton from '@/src/shared/ui/submit-button';
import Form from '../form/form';

export default function PersonalDataForm() {
  return (
    <Form className='w-full'>
      <div className='flex w-full flex-col gap-4'>
        <div className='flex flex-col flex-wrap gap-4 sm:flex-row'>
          <Form.Text
            name='firstName'
            text='First Name'
            divClassName='flex-[1_1_48%]'
          ></Form.Text>
          <Form.Text
            name='lastName'
            text='Last Name'
            divClassName='flex-[1_1_48%]'
          ></Form.Text>
          <Form.Date
            name='dateOfBirth'
            text='Date of birth'
            className='grow'
          ></Form.Date>
        </div>
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4'>
          <Form.Text
            name='country'
            text='Country'
            autoComplete='off'
          ></Form.Text>
          <Form.Text name='city' text='City' autoComplete='off'></Form.Text>
          <Form.Text
            name='streetName'
            text='Street Name'
            autoComplete='off'
          ></Form.Text>
          <Form.Input
            type='number'
            name='streetNumber'
            text='Street Number'
          ></Form.Input>
        </div>
      </div>
      <SubmitButton>Accept</SubmitButton>
    </Form>
  );
}
