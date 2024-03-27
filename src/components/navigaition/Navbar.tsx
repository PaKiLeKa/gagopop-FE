'use client';

import Link from 'next/link';
import { useState } from 'react';
import HomeIcon from '../../../public/icons/navbar/home.png';
import PopupIcon from '../../../public/icons/navbar/popup.png';
import WishIcon from '../../../public/icons/navbar/wish.png';
import ProfileIcon from '../../../public/icons/navbar/profile.png';
import HomeHover from '../../../public/icons/navbar/home_h.png';
import PopupHover from '../../../public/icons/navbar/popup_h.png';
import WishHover from '../../../public/icons/navbar/wish_h.png';
import ProfileHover from '../../../public/icons/navbar/profile_h.png';

import Image from 'next/image';

export default function Navbar() {
  const [isLogin, setIsLogIn] = useState(true);
  
  return (
    <div className='absolute bottom-0 flex justify-around items-center w-full h-16 bg-white border-t-2 border-gray-400 z-20'>
      <Link href={'/'} className='flex flex-col justify-center items-center group'>
        <Image src={HomeIcon} alt='홈으로 이동' className='group-hover:hidden' />
        <Image src={HomeHover} alt='홈으로 이동' className='hidden group-hover:block' />
        <p className='text-xs text-gray-400 group-hover:text-black'>홈</p>
      </Link>
      <Link href={'/popup'} className='flex flex-col justify-center items-center group'>
        <Image src={PopupIcon} alt='팝업정보로 이동' className='group-hover:hidden' />
        <Image src={PopupHover} alt='팝업정보로 이동' className='hidden group-hover:block' />
        <p className='text-xs text-gray-400'>팝업정보</p>
      </Link>
      <Link href={'/wishlist'} className='flex flex-col justify-center items-center group'>
        <Image src={WishIcon} alt='위시리스트으로 이동' className='group-hover:hidden' />
        <Image src={WishHover} alt='위시리스트으로 이동' className='hidden group-hover:block' />
        <p className='text-xs text-gray-400 group-hover:text-black'>위시리스트</p>
      </Link>
      {isLogin ? (
        <Link href={'/profile/id'} className='flex flex-col justify-center items-center group'>
          <Image src={ProfileIcon} alt='프로필로 이동' className='group-hover:hidden' />
          <Image src={ProfileHover} alt='프로필로 이동' className='hidden group-hover:block' />
          <p className='text-xs text-gray-400 group-hover:text-black'>내정보</p>
        </Link>
      ) : (
        <Link href={'/login'} className='flex flex-col justify-center items-center group'>
          <Image src={ProfileIcon} alt='로그인으로 이동' className='group-hover:hidden' />
          <Image src={ProfileHover} alt='로그인으로 이동' className='hidden group-hover:block' />
          <p className='text-xs text-gray-400 group-hover:text-black'>로그인</p>
        </Link>
      )}
    </div>
  );
}
