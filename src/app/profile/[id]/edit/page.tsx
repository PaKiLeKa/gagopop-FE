'use client';

import Link from 'next/link';
import PencilIcon from '../../../../../public/icons/profile/pencil.svg';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const router = useRouter();

  return (
    <div>
      <div className='relative flex justify-center items-center w-full h-14 px-1 py-2 border border-b-black'>
        <div
          onClick={() => {
            router.back();
          }}
          className='absolute left-3 flex justify-center items-center bg-gray-200 rounded-full aspect-square h-10 mr-1 cursor-pointer hover:bg-gray-100'
        >
          <div className='text-2xl'>←</div>
        </div>
        <span className='text-xl'>내 정보 수정</span>
      </div>
      <p className='p-4 font-bold text-base'>개인정보</p>
      <p className='mb-1 pl-5 text-sm font-semibold'>닉네임</p>
      <div className='relative'>
        <input className='border-b w-[90%] text-base p-2 ml-4 mb-5 font-light'></input>
        <button>
          <PencilIcon className='absolute top-2 right-7 ' />
        </button>
      </div>
      <p className='mb-1 pl-5 text-sm font-semibold'>이메일</p>
      <input
        className='border-b w-[90%] text-base p-2 ml-4 mb-1 font-light placeholder:text-gray-300'
        placeholder='example@naver.com'
        readOnly
      ></input>
      <p className='ml-6 text-[10px] text-gray-300 font-light'>0000.00.00 가입</p>
    </div>
  );
}
