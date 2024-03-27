'use client';

import PopupCard from '@/components/card/PopupCard';
import SearchBar from '@/components/searchbar/SearchBar';
import ToggleCategory from '@/components/toggle/ToggleCategory';
import { useState } from 'react';

export default function SearchList() {
  const [category, setCategory] = useState<string[]>([]);
  const handleCategory = (categoryState: string[]) => {
    setCategory(categoryState);
  };
  const num = 5;
  console.log(category);
  
  return (
    <div className='h-[100vh]'>
      <SearchBar onSearching={false} />
      <ToggleCategory setCategory={handleCategory} />
      <div className='flex text-sm m-3 mt-5 -mb-3 text-gray-500'>
        검색결과 <p className='font-bold text-black ml-1'>{num}개</p>의 팝업스토어가 있습니다.
      </div>
      <div className='h-full mt-4 pb-48 overflow-auto'>
        <PopupCard />
        <PopupCard />
        <PopupCard />
        <PopupCard />
        <PopupCard />
        <PopupCard />
        <PopupCard />
        <PopupCard />
        <PopupCard />
        <PopupCard />
      </div>
    </div>
  );
}
