'use client';

import { Input } from '@/components/ui/input';
import DatePicker from '../datepicker/DatePicker';
import Link from 'next/link';
import GlassIcon from '../../../public/icons/glass.svg';
import { useRecoilState } from 'recoil';
import { dateState, destinationState } from '@/store/search';
import DestinationIcon from '../../../public/icons/marker/destination_s.svg';
import StartIcon from '../../../public/icons/marker/start.svg';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar({ searchBarStyle }: { searchBarStyle: string }) {
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const [search, setSearch] = useState<string>('');
  const [date, setDate] = useRecoilState<Date>(dateState);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchKey = searchParams?.get('search');

  const handleBack = () => {
    router.back();
  };

  return (
    <Suspense>
      {/* 홈 페이지 */}
      {searchBarStyle === 'circle' ? (
        <div className='flex justify-center items-center w-full h-14 p-2 border border-b-black'>
          <div className='flex items-center gap-1 w-full px-1'>
            <DatePicker searchBarStyle={searchBarStyle} />
            <Input
              placeholder='지역, 팝업스토어명 키워드로 찾아보세요.'
              className='rounded-full pr-18'
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Link
              className='flex justify-center items-center absolute right-5  border-l-2 pl-1 w-8 h-6'
              href={{
                pathname: '/search',
                query: {
                  search: search,
                  date:
                    date.getFullYear() +
                    '-' +
                    (date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                    '-' +
                    (date.getDate() < 9 ? '0' + date.getDate() : date.getDate()),
                },
              }}
            >
              <GlassIcon />
            </Link>
          </div>
        </div>
      ) : // 홈 페이지 목적지 검색 리스트
      searchBarStyle === 'bar' ? (
        <div className='bg-red-500'>
          <DatePicker searchBarStyle={searchBarStyle} />
          <div className='flex flex-col gap-1 p-3'>
            <div className='flex justify-center items-center gap-1'>
              <div>
                <StartIcon />
              </div>
              <Input defaultValue='출발지를 선택하세요' className='rounded-full pr-16 text-sm' />
            </div>
            {destination?.slice(1).map((v, i) => {
              return (
                <div key={i} className='flex relative'>
                  <div className='flex justify-center items-center ml-1 mr-2 w-10 h-10'>
                    <DestinationIcon />
                  </div>
                  <Input
                    value={destination[i + 1].name}
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
            {/* 목적지 하위 검색탭 */}
            <div className='flex gap-1 bg-blue-500'>
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
        // search, detail 페이지
        <div className='flex justify-center w-full h-14 px-1 py-2'>
          <div className='flex justify-center items-center relative w-[95%]'>
            <button
              onClick={() => {
                handleBack();
              }}
              className='flex justify-center items-center bg-gray-200 rounded-full aspect-square h-10 mr-1 hover:bg-gray-100'
            >
              <div className='text-2xl'>←</div>
            </button>
            <Input
              defaultValue={searchKey != null ? searchKey : ''}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className='rounded-full pr-32 font-light text-green-500'
            />
            <DatePicker searchBarStyle={searchBarStyle} />
            <Link
              className='absolute right-3 top-[9px] pt-[2px] pl-2 h-6 border-gray-300 border-l'
              href={{
                pathname: '/search',
                query: {
                  search: search,
                  date:
                    date.getFullYear() +
                    '-' +
                    (date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                    '-' +
                    (date.getDate() < 9 ? '0' + date.getDate() : date.getDate()),
                },
              }}
            >
              <GlassIcon />
            </Link>
          </div>
        </div>
      )}
    </Suspense>
  );
}
