import { getUserData } from '@/app/actions';
import LogoutButton from './logout-button';

export default async function AccountButton() {
  const data = await getUserData();
  if (!('firstName' in data)) {
    return null;
  }
  const { firstName, lastName } = data;
  return (
    <div className='flex gap-2'>
      <p>
        {firstName[0].toUpperCase()}. {lastName[0].toUpperCase()}.
      </p>
      <LogoutButton />
    </div>
  );
}
