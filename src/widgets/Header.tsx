import { getUserData } from '@/app/actions';
import Logo from '../entities/logo';
import CartButton from '../features/cart/cart-button';
import UserNavigation from '../features/user-navigation';
import Burger from './burger';

export default async function Header() {
  const data = await getUserData();

  return (
    <header className=''>
      <div className='mx-auto flex h-16 w-full max-w-screen-xl shrink-0 place-content-between items-center px-4 text-orange-400'>
        <Logo />
        <nav className='flex items-center gap-4'>
          <UserNavigation data={data} icon className='hidden sm:inline' />
          <CartButton />
          <Burger>
            <UserNavigation data={data} />
          </Burger>
        </nav>
      </div>
    </header>
  );
}
