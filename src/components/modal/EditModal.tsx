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
import Logo from '../../../public/images/profile.png';
import { apiCred } from '@/api';

export default function EditModal({ nickname }: { nickname: string }) {
  const handleEditButton = () => {
    apiCred
      .post(`/user/profile/edit?nickname=${nickname}`)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='bg-white text-black text-base font-normal w-8 h-8  px-0 bg-transparent hover:bg-transparent'></Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='flex flex-col justify-center items-center w-[336px] h-[241px] rounded-xl'>
        <AlertDialogHeader className='flex justify-center items-center mt-3'>
          <Image src={Logo} alt='로그아웃 캐릭터' />
          <AlertDialogTitle className='text-sm font-light py-2'>
            닉네임을 변경하시겠습니까?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex-row justify-center items-center w-[336px] border-t'>
          <AlertDialogCancel className='w-1/2 mt-2 bg-white text-black hover:bg-white'>
            취소
          </AlertDialogCancel>
          <div className='w-px h-3/5 bg-gray-300'></div>
          <AlertDialogAction
            onClick={() => {
              handleEditButton();
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
