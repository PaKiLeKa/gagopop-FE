'use client';

import { Input } from '@/components/ui/input';
import DatePicker from '../datepicker/DatePicker';
import Link from 'next/link';
import GlassIcon from '../../../public/icons/glass.svg';

export default function SearchBar({ onSearching }: { onSearching: boolean }) {
  
  return (
    <>
      {onSearching ? (
        <div className='flex justify-center w-full h-14 p-2'>
          <div className='flex w-full'>
            <DatePicker onSearching={onSearching} />
            <Input
              placeholder='지역, 팝업스토어명 키워드로 찾아보세요.'
              className='rounded-full pr-16 text-sm'
            />
            <button className='absolute right-6 top-4 pl-2 h-6 border-gray-300 border-l'>
              <GlassIcon />
            </button>
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
            <DatePicker onSearching={onSearching} />
            <button className='absolute right-3 top-2 pl-2 h-6 border-gray-300 border-l'>
              <GlassIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
