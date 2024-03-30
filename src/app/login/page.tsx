'use client';

import Image from 'next/image';
import PopupIcon from '../../../public/icons/marker/popuppin.svg';
import TogoIcon from '../../../public/icons/marker/togopin.svg';
import HeartIcon from '../../../public/icons/marker/wishpin.svg';
import GoogleIcon from '../../../public/icons/google.svg';
import Logo from '../../../public/images/logo.png';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('https://gagopop.kro.kr/oauth2/authorization/google');
  };
  useEffect(() => {
    console.log(document.cookie);
  }, []);

  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <div className='flex flex-col justify-center items-center mt-12'>
        <div className='flex gap-2'>
          <PopupIcon />
          <TogoIcon />
          <HeartIcon />
        </div>
        <Image src={Logo} alt='로고 이미지' className='w-36 h-16 mt-3' />
        <p className='text-sm text-center mt-8'>
          회원가입을 하시면 더 편리하게 <br /> 내 정보페이지를 사용하실 수 있어요!
        </p>

        <button
          onClick={() => {
            handleLogin();
          }}
          className='flex items-center gap-2 mt-7 border border-black px-3 py-2 rounded-full text-sm hover:bg-blue-500 hover:border-white'
        >
          <GoogleIcon />
          <p>Google계정으로 시작하기</p>
        </button>
      </div>
    </div>
  );
}
