'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import HomeIcon from '../../../public/icons/navbar/home.png';
import PopupIcon from '../../../public/icons/navbar/popup.png';
import WishIcon from '../../../public/icons/navbar/wish.png';
import ProfileIcon from '../../../public/icons/navbar/profile.png';
import HomeHover from '../../../public/icons/navbar/home_h.png';
import PopupHover from '../../../public/icons/navbar/popup_h.png';
import WishHover from '../../../public/icons/navbar/wish_h.png';
import ProfileHover from '../../../public/icons/navbar/profile_h.png';
import { apiCred } from '@/api';

export default function Navbar() {
  const [isLogin, setIsLogIn] = useState<string>('false');
  const [userEmail, setUserEmail] = useState<string>('');
  const pathname = usePathname();
  const initailPathName = pathname?.split('/')[1];
  const wishPathName = pathname?.split('/')[3];

  useEffect(() => {
    apiCred
      .get('/user/profile')
      .then((res) => {
        setUserEmail(res.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function getCookie(name: string) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }
  useEffect(() => {
    const isLoginCookie = getCookie('islogin');
    if (isLoginCookie !== null) setIsLogIn(isLoginCookie);
    else {
      setIsLogIn('false');
    }
  }, []);
  console.log(isLogin);

  return (
    <div className='absolute bottom-0 flex just items-center w-full h-16 p-4 bg-white border-t border-black z-20 shadow-[0_-10px_10px_-10px_rgba(0,0,0,0.4)]'>
      <Link href={'/'} className='flex flex-col justify-center items-center w-[84px] group '>
        <Image src={HomeIcon} alt='홈으로 이동' className='group-hover:hidden' />
        <Image src={HomeHover} alt='홈으로 이동' className='hidden group-hover:block' />
        <p className='text-xs text-gray-400 group-hover:text-black'>홈</p>
        {initailPathName === '' ? (
          <div className='absolute top-0 bg-black w-[80px] h-1 rounded-[0_0_80px_80px]'></div>
        ) : null}
      </Link>
      <Link href={'/popup'} className='flex flex-col justify-center items-center w-[84px] group'>
        <Image src={PopupIcon} alt='팝업정보로 이동' className='group-hover:hidden' />
        <Image src={PopupHover} alt='팝업정보로 이동' className='hidden group-hover:block' />
        <p className='text-xs text-gray-400'>팝업정보</p>
        {initailPathName === 'popup' ? (
          <div className='absolute top-0 bg-black w-[80px] h-1 rounded-[0_0_80px_80px]'></div>
        ) : null}
      </Link>
      <Link
        href={'/profile/' + userEmail + '/wishlist'}
        className='flex flex-col justify-center items-center w-[84px] group'
      >
        <Image src={WishIcon} alt='위시리스트으로 이동' className='group-hover:hidden' />
        <Image src={WishHover} alt='위시리스트으로 이동' className='hidden group-hover:block' />
        <p className='text-xs text-gray-400 group-hover:text-black'>위시리스트</p>
        {wishPathName === 'wishlist' ? (
          <div className='absolute top-0 bg-black w-[80px] h-1 rounded-[0_0_80px_80px]'></div>
        ) : null}
      </Link>
      {isLogin === 'true' ? (
        <Link
          href={'/profile/' + userEmail}
          className='flex flex-col justify-center items-center w-[84px] group'
        >
          <Image src={ProfileIcon} alt='프로필로 이동' className='group-hover:hidden' />
          <Image src={ProfileHover} alt='프로필로 이동' className='hidden group-hover:block' />
          <p className='text-xs text-gray-400 group-hover:text-black'>내정보</p>
          {(wishPathName !== 'wishlist' && initailPathName === 'profile') ||
          initailPathName === 'cs-center' ? (
            <div className='absolute top-0 bg-black w-[80px] h-1 rounded-[0_0_80px_80px]'></div>
          ) : null}
        </Link>
      ) : (
        <Link href={'/login'} className='flex flex-col justify-center items-center w-[84px] group'>
          <Image src={ProfileIcon} alt='프로필로 이동' className='group-hover:hidden' />
          <Image src={ProfileHover} alt='프로필로 이동' className='hidden group-hover:block' />
          <p className='text-xs text-gray-400 group-hover:text-black'>로그인</p>
          {initailPathName === 'profile' || initailPathName === 'cs-center' ? (
            <div className='absolute top-0 bg-black w-[80px] h-1 rounded-[0_0_80px_80px]'></div>
          ) : null}
        </Link>
      )}
    </div>
  );
}
