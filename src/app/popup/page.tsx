'use client';

import { api } from '@/api';
import Carousel from '@/components/carousel/Carousel';
import DatePicker from '@/components/datepicker/DatePicker';
import HorizonScroll from '@/components/list/HorizonScroll';
import { useEffect, useState } from 'react';

export default function Popup() {
  const [popupCategory, setPopupCategory] = useState({});
  useEffect(() => {
    api
      .get('/popup/info')
      .then((res) => setPopupCategory(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className='h-full overflow-auto'>
      <DatePicker searchBarStyle={'bar'} />
      <Carousel />
      {Object.entries(popupCategory)?.map((list, i) => (
        <HorizonScroll key={i} list={list} />
      ))}
    </div>
  );
}
