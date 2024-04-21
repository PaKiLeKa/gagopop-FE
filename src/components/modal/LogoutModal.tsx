'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LogoutLogo from '../../../public/images/logoutLogo.png';
import { apiCred } from '@/api';
import { useRouter } from 'next/navigation';
import { Cookies } from 'react-cookie';

export default function LogoutModal() {
  const cookie = new Cookies();
  const router = useRouter();

  const handleLogOutButton = () => {
    apiCred
      .get('/api/logout')
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='bg-white text-black text-base font-normal h-0 px-0 hover:bg-white'>
          로그아웃
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='flex flex-col justify-center items-center w-[336px] h-[241px] rounded-xl'>
        <AlertDialogHeader className='flex justify-center items-center mt-3'>
          <Image src={LogoutLogo} alt='로그아웃 캐릭터' />
          <AlertDialogTitle className='text-sm font-light py-2'>
            로그아웃 하시겠습니까?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex-row justify-center items-center w-[336px] border-t'>
          <AlertDialogCancel className='w-1/2 mt-2 bg-white text-black hover:bg-white'>
            취소
          </AlertDialogCancel>
          <div className='w-px h-3/5 bg-gray-300'></div>
          <AlertDialogAction
            onClick={() => {
              cookie.set('login', false, { path: '/' });
              handleLogOutButton();
              router.push('/login');
            }}
            className='w-1/2 mt-2 bg-white text-black hover:bg-white'
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
