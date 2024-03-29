'use client';

import Image from 'next/image';
import PopupIcon from '../../../public/icons/marker/popuppin.svg';
import TogoIcon from '../../../public/icons/marker/togopin.svg';
import HeartIcon from '../../../public/icons/marker/wishpin.svg';
import GoogleIcon from '../../../public/icons/google.svg';
import Logo from '../../../public/images/logo.png';

export default function Login() {
  return (
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

      <button className='flex items-center gap-2 mt-7 border border-black px-3 py-2 rounded-full text-sm hover:bg-blue-500 hover:border-white'>
        <GoogleIcon />
        <p>Google계정으로 회원가입</p>
      </button>

      <p className='w-full mt-8 p-7 text-sm border-t text-center'>이미 가입한 아이디가 있다면?</p>

      <button className='flex items-center gap-2 bg-gray-100 px-3 pr-7 py-2 rounded-full text-sm hover:bg-gray-200'>
        <GoogleIcon />
        <p>Google계정으로 로그인</p>
      </button>

      <p className='text-sm text-green-500 mt-3'>계정을 잃어버리셨나요?</p>
    </div>
  );
}
