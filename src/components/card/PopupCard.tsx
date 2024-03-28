'use client';

import Image from 'next/image';
import dumpop from '../../../public/images/dummy.png';
import Heart from '../../../public/icons/heart.svg';
import EmptyHeart from '../../../public/icons/emptyheart.svg';
import Togo from '../../../public/icons/togo.svg';
import DestinationIcon from '../../../public/icons/marker/destination_s.svg';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/destination';
import Badge from '../badge/Badge';

export default function PopupCard({ icon }: { icon: string }) {
  const [destination, setDestinationState] = useRecoilState(destinationState);

  const handleDestinationBtn = () => {
    setDestinationState([...destination, `추가됨${destination.length}`]);
  };

  return (
    <div className='flex h-[120px] p-3 border-b border-b-gray-100'>
      <div className='w-[100px] h-[100px] relative rounded-md aspect-square overflow-hidden'>
        <Image src={dumpop} alt='설명' className='w-[100px] h-[100px]' fill />
        <div className='absolute top-1'>{icon === 'heart' ? <Heart /> : <Togo />}</div>
      </div>
      <div className='flex flex-col justify-between w-2/3 ml-2 '>
        <div className='w-full'>
          <div className='flex justify-between mb-2'>
            <p className='text-[10px] text-gray-400'>2024.03.24~2024.03.24</p>
            <Badge badgeState='end' />
          </div>
          <p className='font-bold -mt-2'>팝업스토어 이름</p>
        </div>
        <div className='flex justify-between items-end'>
          <p className='text-[10px] text-gray-400'>서울시 성동구</p>
          <button
            onClick={handleDestinationBtn}
            className='flex justify-center items-center w-11 h-11 border border-gray-300 rounded-full '
          >
            <DestinationIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
