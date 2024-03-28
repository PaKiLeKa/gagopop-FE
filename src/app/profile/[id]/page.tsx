'use client';

import LogoutModal from '@/components/modal/LogoutModal';
import Link from 'next/link';
import ProfileImage from '../../../../public/images/profile.png';
import Image from 'next/image';
import EditIcon from '../../../../public/icons/profile/edit.svg';
import CSIcon from '../../../../public/icons/profile/cs.svg';
import LogoutIcon from '../../../../public/icons/profile/logout.svg';

export default function Profile() {
  return (
    <div className='flex flex-col items-center mt-8'>
      <div className='flex flex-col items-center'>
        <Image src={ProfileImage} alt='profile image' className='w-[100px] h-[100px]'></Image>
        <span className='text-2xl font-bold mt-6'>팝업스토어 러버</span>
        <span className='text-sm text-gray-300 font-light'>popupstorelover@naver.com</span>
      </div>
      <div className='flex flex-row justify-center items-center mt-3 p-5 w-full border-b'>
        <div className='flex flex-col justify-center items-center w-[100px]'>
          <p className='text-2xl text-green-500'>250</p>
          <p className='text-base text-gray-400'>스탬프</p>
        </div>
        <div className='flex flex-col justify-center items-center w-[100px]'>
          <p className='text-2xl text-blue-500'>5</p>
          <p className='text-base text-gray-400'>TO-GO</p>
        </div>
        <div className='flex flex-col justify-center items-center w-[100px]'>
          <p className='text-2xl text-red-500'>50</p>
          <p className='text-base text-gray-400'>위시리스트</p>
        </div>
      </div>
      <div className='flex flex-col w-full px-3'>
        <div className='flex gap-2 p-3 py-4 border-b'>
          <EditIcon />
          <Link href={'/profile/id/edit'}>내 정보 수정</Link>
        </div>
        <div className='flex gap-2 p-3 py-4 border-b'>
          <CSIcon />
          <Link href={'/cs-center'}>고객센터</Link>
        </div>
        <div className='flex items-center gap-2 p-3 py-4 border-b'>
          <LogoutIcon />
          <LogoutModal />
        </div>
      </div>
    </div>
  );
}
