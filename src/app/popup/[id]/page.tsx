'use client';

import Image from 'next/image';
import SearchBar from '@/components/searchbar/SearchBar';
import DetailMap from '@/components/map/DetailMap';
import Dummy from '../../../../public/images/dummy.png';
import HeartIcon from '../../../../public/icons/heart.svg';
import EmptyHeartIcon from '../../../../public/icons/emptyheart.svg';
import TogoIcon from '../../../../public/icons/detail/togo.svg';
import ShareIcon from '../../../../public/icons/detail/share.svg';
import TimeIcon from '../../../../public/icons/detail/time.svg';
import AddressIcon from '../../../../public/icons/detail/address.svg';
import SNSIcon from '../../../../public/icons/detail/sns.svg';
import MapIcon from '../../../../public/icons/detail/map.svg';
import GrowIcon from '../../../../public/icons/detail/grow.svg';
import IntroIcon from '../../../../public/icons/detail/intro.svg';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/destination';
import Badge from '@/components/badge/Badge';

export default function PopUpDetail() {
  const [destination, setDestinationState] = useRecoilState(destinationState);

  const handleDestinationBtn = () => {
    setDestinationState(['저장됨']);
  };

  return (
    <div className='h-full pb-[104px]'>
      <SearchBar searchBarStyle={'date'} />
      <div className='h-full overflow-auto'>
        <div className='relative aspect-square'>
          <Image src={Dummy} alt='팝업 스토어 이미지' fill className='brightness-75' />
          <div className='absolute'>
            <div className='flex flex-col justify-between w-[360px] aspect-square p-4'>
              <div className='flex flex-col gap-2'>
                <EmptyHeartIcon width='40' height='40' viewBox='0 0 20 20' />
                <TogoIcon />
                <ShareIcon />
              </div>
              <div className='flex justify-between items-end text-white'>
                <div>
                  <Badge badgeState='end' />
                  <p>0000.00.00~0000.00.00</p>
                  <p className='text-2xl font-bold'>팝업 제목입니다</p>
                </div>
                <GrowIcon />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex gap-1'>
            <TimeIcon />
            <div className='text-sm'>
              <p>운영시간</p>
              <p className='text-gray-400 font-light'>매일 : 00:00~00:00</p>
            </div>
          </div>
          <div className='flex gap-1'>
            <AddressIcon />
            <div className='text-sm'>
              <p>주소</p>
              <p className='text-gray-400 font-light'>무신사 스퀘어 성수2</p>
            </div>
          </div>
          <div className='flex gap-1'>
            <SNSIcon />
            <div className='text-sm'>
              <p>SNS</p>
              <a href='https://www.instagram.com/popup' className='text-blue-400 font-light'>
                https://www.instagram.com/popup
              </a>
            </div>
          </div>
          <div className='flex gap-2'>
            <div>
              <IntroIcon />
            </div>
            <div className='text-sm'>
              <p>팝업스토어 소개</p>
              <p className='text-gray-400 font-light'>
                멋진멋진 팝업스토어입니다.ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇ 멋진 팝업스토어입니다.
              </p>
            </div>
          </div>
          <div>
            <div className='flex gap-1 mb-2'>
              <MapIcon />
              <p>지도</p>
            </div>
            <DetailMap />
          </div>
        </div>
      </div>

      <button
        onClick={handleDestinationBtn}
        className='flex justify-center items-center w-full h-12 bg-yellow-500'
      >
        목적지설정
      </button>
    </div>
  );
}
