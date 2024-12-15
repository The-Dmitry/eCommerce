import Form from '../form/form';

export default function PersonalDataForm() {
  return (
    <Form>
      <Form.Text name='firstName'></Form.Text>
      <Form.Text name='lastName'></Form.Text>
    </Form>
  );
}
