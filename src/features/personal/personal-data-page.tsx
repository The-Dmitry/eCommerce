import PersonalDataForm from '@features/personal/personal-data-form';
import getUserData from '@shared/utils/api/auth/get-user-data';

export default async function PersonalDataPage() {
  const userData = await getUserData();
  return <PersonalDataForm userData={userData} />;
}
