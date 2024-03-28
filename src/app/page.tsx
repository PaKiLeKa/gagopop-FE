'use client';

import PopupCard from '@/components/card/PopupCard';
import Map from '@/components/map/Map';
import SearchBar from '@/components/searchbar/SearchBar';
import BottomSlide from '@/components/slide/BottomSlide';
import { destinationState } from '@/store/destination';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Home() {
  const [searchStyle, setSearchStyle] = useState('circle');
  const [destination, setDestinationState] = useRecoilState(destinationState);

  useEffect(() => {
    if (destination.length !== 0) {
      setSearchStyle('bar');
    } else {
      setSearchStyle('circle');
    }
  }, [destination]);
  return (
    <div>
      <SearchBar searchBarStyle={searchStyle} />
      <Map />
      <BottomSlide content={<PopupCard icon='heart' />} />
    </div>
  );
}
