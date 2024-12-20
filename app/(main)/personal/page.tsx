import { getUserData } from '@/app/actions';
import PersonalDataForm from '@features/personal/personal-data-form';

export default async function personalPage() {
  const userData = await getUserData();
  return <PersonalDataForm userData={userData} />;
}
