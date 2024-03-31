'use client';

import PopupCard from '@/components/card/PopupCard';
import Map from '@/components/map/Map';
import SearchBar from '@/components/searchbar/SearchBar';
import BottomSlide from '@/components/slide/BottomSlide';
import { destinationState } from '@/store/search';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { api, apiCred } from '@/api';
import { PopupTypewithWish } from '../types/types';
export default function Home() {
  const [searchStyle, setSearchStyle] = useState('circle');
  const [popupList, setPopupList] = useState<PopupTypewithWish[]>([]);
  const [destination, setDestinationState] = useRecoilState(destinationState);

  useEffect(() => {
    if (destination.length > 1) {
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
    <div>
      <SearchBar searchBarStyle={searchStyle} />
      <Map />
      <BottomSlide
        content={
          popupList.length > 0 && (
            <div className='h-full mt-4 pb-48 overflow-auto'>
              {popupList?.map((popup) => (
                <PopupCard
                  key={popup.popupStore.id}
                  icon={popup.inWishlist === true ? 'heart' : 'emptyheart'}
                  info={popup}
                  period={['open', 'opensoon', 'endsoon']}
                />
              ))}
            </div>
          )
        }
      />
    </div>
  );
}
