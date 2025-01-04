import PersonalLayout from '@features/personal/personal-layout';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-full items-center justify-center lg:block'>
      <PersonalLayout isHardNavigation={true}>{children}</PersonalLayout>
    </div>
  );
}
