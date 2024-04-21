'use client';

import { api } from '@/api';
import Carousel from '@/components/carousel/Carousel';
import DatePicker from '@/components/datepicker/DatePicker';
import HorizonScroll from '@/components/list/HorizonScroll';
import { PopupCategoryList, PopupType } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';

export default function Popup() {
  // const [popupCategory, setPopupCategory] = useState<PopupCategoryList>({});
  const popupCategory = useQuery({
    queryKey: ['popupCategory'],
    queryFn: async () => {
      const response = await api.get('/popup/info');
      return response.data;
    },
  });

  // useEffect(() => {
  //   api
  //     .get('/popup/info')
  //     .then((res) => setPopupCategory(res.data))
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <Suspense>
      <div className='h-full overflow-auto'>
        <DatePicker searchBarStyle={'bar'} />
        <Carousel list={popupCategory.data?.Header} />
        {popupCategory.data && Object.entries(popupCategory.data)
          .slice(1)
          ?.map((list, i) => (
            <HorizonScroll key={i} list={list as [string, PopupType[]]} />
          ))}
      </div>
    </Suspense>
  );
}
