'use client';

import { api, apiCred } from '@/api';
import PopupCard from '@/components/card/PopupCardWithWish';
import SearchBar from '@/components/searchbar/SearchBar';
import ToggleCategory from '@/components/toggle/ToggleCategory';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { PopupType, PopupTypewithWish } from '../../types/types';

export default function SearchList() {
  const [period, setPeriod] = useState<string[]>([]);
  const [searchList, setSearchList] = useState<PopupTypewithWish[]>([]);
  const [periodArray, setPeriodArray] = useState<string[]>([]);
  const [total, setTotal] = useState<number>();
  const searchParams = useSearchParams();
  const search = searchParams?.get('search');
  const date = searchParams?.get('date');

  const handleCategory = (categoryState: string[]) => {
    setPeriod(categoryState);
  };
  const handleSum = (total: number) => {
    setTotal(total);
  };

  const calPeriod = (popup: PopupType) => {
    const today = new Date().getTime();
    const startDate = new Date(popup?.startDate).getTime();
    const endDate = new Date(popup?.endDate).getTime();
    let periodState;
    let diffDay = 0;

    if ((startDate <= today && today <= endDate) || (startDate <= today && startDate === endDate)) {
      periodState = 'open';
      if (Math.floor((endDate - today) / (1000 * 60 * 60 * 24)) < 8) {
        periodState = 'endsoon';
        diffDay = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
      }
    } else {
      if (Math.floor((today - endDate) / (1000 * 60 * 60 * 24)) > 0) {
        periodState = 'end';
      } else {
        periodState = 'opensoon';
        diffDay = Math.floor((startDate - today) / (1000 * 60 * 60 * 24));
      }
    }
    return { periodState, diffDay };
  };

  useEffect(() => {
    apiCred
      .get(`/popup/find?name=${search}&date=${date}`)
      .then((res) => {
        setSearchList(res.data);
        const newPeriodArray = res.data?.map((popup: { popupStore: PopupType }) => {
          return calPeriod(popup.popupStore).periodState;
        });
        setPeriodArray(newPeriodArray);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);

  console.log(periodArray);
  return (
    <Suspense>
      <div className='h-[100vh]'>
        <SearchBar searchBarStyle={'date'} />
        <ToggleCategory
          setCategory={handleCategory}
          periodArray={periodArray}
          handleSum={handleSum}
        />
        <div className='flex text-sm m-3 mt-5 -mb-3 text-gray-500'>
          검색결과 <p className='font-bold text-black ml-1'>{total}개</p>의 팝업스토어가 있습니다.
        </div>
        <div className='h-full mt-4 pb-48 overflow-auto'>
          {searchList?.map((popup, _i) => (
            <PopupCard key={popup.popupStore.id} info={popup} period={period} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
