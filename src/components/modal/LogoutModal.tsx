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

export default function LogoutModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>로그아웃</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='0 w-[320px] h-[200px]'>
        <AlertDialogHeader className='flex justify-center items-center'>
          <AlertDialogTitle>로그아웃 하시겠습니까?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className='items-end'>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
