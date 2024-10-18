import { getUserData } from '@/app/actions';

export default async function AccountButton() {
  const data = await getUserData();
  if (!('firstName' in data)) {
    return null;
  }
  const { firstName, lastName } = data;
  return (
    <div>
      {firstName} {lastName}
    </div>
  );
  return <p>kek</p>;
}
