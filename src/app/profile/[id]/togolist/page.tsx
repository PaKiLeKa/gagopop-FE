'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import togoLogo from '../../../../../public/images/togoLogo.png';

export default function TogoList() {
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
        <span className='text-xl'>투고리스트</span>
      </div>
      <div className='flex flex-col justify-center items-center h-[80vh] text-center font-light'>
        <Image src={togoLogo} alt='투고리스트 이미지' width={100} height={100} />
        <p className='mt-7 text-base text-[#465361] font-bold'>서비스 준비중입니다.</p>
        <p className='mt-1 text-sm text-gray-500'>
          보다 나은 서비스를 제공하기 위하여 <br />
          페이지를 준비중에 있습니다.
        </p>
        <div className='mt-7 py-5 w-72 bg-[#EFEFF1] rounded-xl'>
          <div className='pb-4 border-b border-gray-200 text-base text-[#465361] font-bold'>
            투고리스트란?
          </div>
          <p className='text-xs pt-4 text-gray-500'>
            가고 싶은 팝업스토어, 더 이상 <br />
            따로따로 찾아서 검색하지 않아도 돼요! <br />
            <br />
            가고 싶은 팝업 스토어를 투고리스트에 저장해보세요. <br />
            저장된 팝업 스토어의 경로를 바로 추천해드립니다!
          </p>
        </div>
      </div>
    </div>
  );
}
