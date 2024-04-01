'use client';

import PopupCard from '@/components/card/PopupCardWithWish';
import Map from '@/components/map/Map';
import SearchBar from '@/components/searchbar/SearchBar';
import BottomSlide from '@/components/slide/BottomSlide';
import { destinationState, splashState } from '@/store/store';
import { Suspense, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { api, apiCred } from '@/api';
import { PopupTypewithWish } from '../types/types';
import Splash from '@/components/splash/Splash';
export default function Home() {
  const [searchStyle, setSearchStyle] = useState('circle');
  const [popupList, setPopupList] = useState<PopupTypewithWish[]>([]);
  const [destination, setDestinationState] = useRecoilState(destinationState);
  const [splash, setSplashState] = useRecoilState(splashState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashState(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (destination.length > 0) {
      setSearchStyle('bar');
    } else {
      setSearchStyle('circle');
    }
  }, [destination]);

  useEffect(() => {
    apiCred
      .get('/popup/find-all')
      .then((res) => {
        setPopupList(res.data);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);

  return (
    <Suspense>
      <Splash splash={splash} />
      <SearchBar searchBarStyle={searchStyle} />
      <Map />
      <BottomSlide
        content={
          popupList.length > 0 && (
            <div className='h-full mt-4 pb-48 overflow-auto'>
              {popupList?.map((popup) => (
                <PopupCard
                  key={popup.popupStore.id}
                  info={popup}
                  period={['open', 'opensoon', 'endsoon']}
                />
              ))}
            </div>
          )
        }
      />
    </Suspense>
  );
}
