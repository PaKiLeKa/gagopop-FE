'use client';

import { api } from '@/api';
import PopupCard from '@/components/card/PopupCard';
import SearchBar from '@/components/searchbar/SearchBar';
import ToggleCategory from '@/components/toggle/ToggleCategory';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PopupType } from '../../types/types';

export default function SearchList() {
  const [period, setPeriod] = useState<string[]>([]);
  const [searchList, setSearchList] = useState<PopupType[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams?.get('search');
  const date = searchParams?.get('date');

  const handleCategory = (categoryState: string[]) => {
    setPeriod(categoryState);
  };

  useEffect(() => {
    api
      .get(`/popup/find?name=${search}&date=${date}`)
      .then((res) => {
        setSearchList(res.data);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);

  console.log(period);
  return (
    <div className='h-[100vh]'>
      <SearchBar searchBarStyle={'date'} />
      <ToggleCategory setCategory={handleCategory} />
      <div className='flex text-sm m-3 mt-5 -mb-3 text-gray-500'>
        검색결과 <p className='font-bold text-black ml-1'>{searchList?.length}개</p>의 팝업스토어가
        있습니다.
      </div>
      <div className='h-full mt-4 pb-48 overflow-auto'>
        {searchList?.map((popup, _i) => (
          <PopupCard
            key={popup.id}
            icon={'heart'}
            info={popup}
            period={period}
          />
        ))}
      </div>
    </div>
  );
}
