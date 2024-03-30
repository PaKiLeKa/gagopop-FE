'use client';

import LogoutModal from '@/components/modal/LogoutModal';
import Link from 'next/link';
import ProfileImage from '../../../../public/images/profile.png';
import Image from 'next/image';
import EditIcon from '../../../../public/icons/profile/edit.svg';
import CSIcon from '../../../../public/icons/profile/cs.svg';
import LogoutIcon from '../../../../public/icons/profile/logout.svg';
import { useEffect, useState } from 'react';
import { apiCred } from '@/api';
import { User } from '@/types/types';

export default function Profile() {
  const [userData, setUserData] = useState<User>();
  useEffect(() => {
    apiCred
      .get('/user/profile')
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(userData);

  return (
    <div className='flex flex-col items-center mt-8'>
      <div className='flex flex-col items-center'>
        <Image src={ProfileImage} alt='profile image' className='w-[100px] h-[100px]'></Image>
        <span className='text-2xl font-bold mt-6'>
          {userData?.nickname ? userData?.nickname : '닉네임을 지정해보세요!'}
        </span>
        <span className='text-sm text-gray-300 font-light'>{userData?.email}</span>
      </div>
      <div className='flex flex-row justify-center items-center mt-3 p-5 w-full border-b'>
        <Link
          href={userData?.email + '/stamp'}
          className='flex flex-col justify-center items-center w-[100px]'
        >
          <p className='text-2xl text-green-500'>{userData?.stampTotal}</p>
          <p className='text-base text-gray-400'>스탬프</p>
        </Link>
        <Link
          href={userData?.email + '/togolist'}
          className='flex flex-col justify-center items-center w-[100px]'
        >
          <p className='text-2xl text-blue-500'>{userData?.togolistTotal}</p>
          <p className='text-base text-gray-400'>TO-GO</p>
        </Link>
        <Link
          href={userData?.email + '/wishlist'}
          className='flex flex-col justify-center items-center w-[100px]'
        >
          <p className='text-2xl text-red-500'>{userData?.wishlistTotal}</p>
          <p className='text-base text-gray-400'>위시리스트</p>
        </Link>
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
