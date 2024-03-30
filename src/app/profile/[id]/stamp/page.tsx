'use client';
import { useRouter } from 'next/navigation';
import stampLogo from '../../../../../public/images/stampLogo.png';
import Image from 'next/image';

export default function Stamp() {
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
        <span className='text-xl'>스탬프 현황</span>
      </div>

      <div className='flex flex-col justify-center items-center h-[80vh] text-center font-light'>
        <Image src={stampLogo} alt='스탬프 이미지' width={100} height={100} />
        <p className='mt-7 text-base text-[#465361] font-bold'>서비스 준비중입니다.</p>
        <p className='mt-1 text-sm text-gray-500'>
          보다 나은 서비스를 제공하기 위하여 <br />
          페이지를 준비중에 있습니다.
        </p>
        <div className='mt-7 py-5 w-72 bg-[#EFEFF1] rounded-xl'>
          <div className='pb-4 border-b border-gray-200 text-base text-[#465361] font-bold'>
            스탬프란?
          </div>
          <p className='text-xs pt-4 text-gray-500'>
            방문했던 팝업 스토어를 기록해보세요! <br />
            휘발되었던 기억을 모아주고, <br />
            기록 인증에 따라 스탬프를 획득할 수 있습니다!
            <br />
            <br />
            팝업 스토어 방문을 보다 재밌게 다녀보세요~
          </p>
        </div>
      </div>
    </div>
  );
}
