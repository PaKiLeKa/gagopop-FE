'use client';

import { Input } from '@/components/ui/input';
import DatePicker from '../datepicker/DatePicker';
import Link from 'next/link';
import GlassIcon from '../../../public/icons/glass.svg';
import { useRecoilState } from 'recoil';
import { destinationState } from '@/store/destination';
import DestinationIcon from '../../../public/icons/marker/destination_s.svg';
import StartIcon from '../../../public/icons/marker/start.svg';

export default function SearchBar({ searchBarStyle }: { searchBarStyle: string }) {
  const [destination, setDestinationState] = useRecoilState(destinationState);



  return (
    <>
      {searchBarStyle === 'circle' ? (
        <div className='flex justify-center w-full h-14 p-2 border border-b-black'>
          <div className='flex w-full'>
            <DatePicker searchBarStyle={searchBarStyle} />
            <Input
              placeholder='지역, 팝업스토어명 키워드로 찾아보세요.'
              className='rounded-full pr-16'
            />
            <button className='absolute right-6 top-4 pl-2 h-6 border-gray-300 border-l'>
              <GlassIcon />
            </button>
          </div>
        </div>
      ) : searchBarStyle === 'bar' ? (
        <div>
          <DatePicker searchBarStyle={searchBarStyle} />
          <div className='flex flex-col gap-1 p-3'>
            <div className='flex justify-center items-center gap-1'>
              <div>
                <StartIcon />
              </div>
              <Input value={destination[0]} readOnly className='rounded-full pr-16 text-sm' />
            </div>
            {destination?.slice(1).map((v, i) => {
              return (
                <div key={i} className='flex relative'>
                  <div className='flex justify-center items-center ml-1 mr-2 w-10 h-10'>
                    <DestinationIcon />
                  </div>
                  <Input
                    value={destination[i + 1]}
                    readOnly
                    className='rounded-full pr-10 text-sm'
                  />
                  <div className='flex justify-center items-center absolute right-1 top-2.5 w-10 h-5 border-l'>
                    <button className='flex justify-center items-center w-5 h-5 rounded-full bg-gray-200'>
                      ━
                    </button>
                  </div>
                </div>
              );
            })}
            <div className='flex gap-1 '>
              <div className='flex justify-center items-center ml-1 mr-1 w-10 h-10'>
                <DestinationIcon />
              </div>
              <Input
                placeholder='지역, 팝업스토어 명 키워드로 찾아보세요.'
                className='rounded-full pr-10 text-sm w-full'
              />
            </div>
          </div>
          <div className='flex gap-2 justify-center items-center bg-gray-100'>
            <button
              onClick={() => {
                setDestinationState([]);
              }}
              className='
              font-light px-16 py-3'
            >
              취소
            </button>
            <p className='text-xl text-gray-200'>│</p>
            <button className='font-light px-16 py-3'>확인</button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center w-full h-14 px-1 py-2'>
          <div className='flex justify-center items-center relative w-[95%]'>
            <Link
              href={'/'}
              className='flex justify-center items-center bg-gray-200 rounded-full aspect-square h-10 mr-1 hover:bg-gray-100'
            >
              <div className='text-2xl'>←</div>
            </Link>
            <Input
              value={'검색된 키워드'}
              className='rounded-full pr-20 font-light text-green-500'
            />
            <DatePicker searchBarStyle={searchBarStyle} />
            <button className='absolute right-3 top-2 pl-2 h-6 border-gray-300 border-l'>
              <GlassIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
