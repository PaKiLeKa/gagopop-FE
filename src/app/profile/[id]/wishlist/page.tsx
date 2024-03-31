'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PopupCardWithTogo from '@/components/card/PopupCardWithTogo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiCred } from '@/api';
import { PopupType, PopupTypewithTogo, WishData } from '@/types/types';

export default function Wishlist() {
  const [activeTab, setActiveTab] = useState<string>('open');
  const [wishList, setWishList] = useState<PopupTypewithTogo[]>();
  const router = useRouter();

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
  console.log(wishList);
  useEffect(() => {
    apiCred
      .get('/user/wishlist')
      .then((res) => setWishList(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='h-[100vh]'>
      <div className='relative flex justify-center items-center w-full h-14 px-1 py-2 border border-b-black'>
        <div
          onClick={() => {
            router.back();
          }}
          className='absolute left-3 flex justify-center items-center bg-gray-200 rounded-full aspect-square h-10 mr-1 cursor-pointer hover:bg-gray-100'
        >
          <div className='text-2xl'>←</div>
        </div>
        <span className='text-xl'>위시 리스트</span>
      </div>
      <Tabs defaultValue='open' className='w-full h-full overflow-auto '>
        <TabsList className='flex justify-start w-full h-[52px] rounded-none border-b border-b-gray-200 bg-white'>
          <TabsTrigger
            value='open'
            className={`relative ml-2 w-24 h-[42px] text-base ${
              activeTab === 'open' ? 'text-red-500' : 'text-black'
            }`}
            onClick={() => setActiveTab('open')}
          >
            {activeTab === 'open' ? (
              <>
                <div className='absolute top-[43px] w-full h-1 rounded-[50px_50px_0_0] bg-red-500'></div>
              </>
            ) : null}
            오픈중
          </TabsTrigger>
          <TabsTrigger
            value='openyet'
            className={`relative w-24 h-[42px] text-base ${
              activeTab === 'openyet' ? 'text-red-500 ' : 'text-black'
            }`}
            onClick={() => setActiveTab('openyet')}
          >
            {activeTab === 'openyet' ? (
              <>
                <div className='absolute top-[43px] w-full h-1 rounded-[50px_50px_0_0] bg-red-500'></div>
              </>
            ) : null}
            오픈예정
          </TabsTrigger>
          <TabsTrigger
            value='end'
            className={`relative w-24 h-[42px] text-base ${
              activeTab === 'end' ? 'text-red-500' : 'text-black'
            }`}
            onClick={() => setActiveTab('end')}
          >
            {activeTab === 'end' ? (
              <>
                <div className='absolute top-[43px] w-full h-1 rounded-[50px_50px_0_0] bg-red-500'></div>
              </>
            ) : null}
            종료
          </TabsTrigger>
        </TabsList>
        <TabsContent value='open'>
          <div className='h-full mt-4 pb-44 overflow-auto'>
            {wishList?.map((popup: PopupTypewithTogo) =>
              calPeriod(popup.popupStore).periodState === 'open' ? (
                <PopupCardWithTogo
                  key={popup.popupStore.id}
                  info={popup}
                  period={[calPeriod(popup.popupStore).periodState]}
                />
              ) : null,
            )}
            {wishList?.map((popup: PopupTypewithTogo) =>
              calPeriod(popup.popupStore).periodState === 'endsoon' ? (
                <PopupCardWithTogo
                  key={popup.popupStore.id}
                  info={popup}
                  period={[calPeriod(popup.popupStore).periodState]}
                />
              ) : null,
            )}
          </div>
        </TabsContent>
        <TabsContent value='openyet'>
          <div className='h-full mt-4 pb-44 overflow-auto'>
            {wishList?.map((popup: PopupTypewithTogo) =>
              calPeriod(popup.popupStore).periodState === 'opensoon' ? (
                <PopupCardWithTogo
                  key={popup.popupStore.id}
                  info={popup}
                  period={[calPeriod(popup.popupStore).periodState]}
                />
              ) : null,
            )}
          </div>
        </TabsContent>
        <TabsContent value='end'>
          <div className='flex items-center h-[42px] pl-3 -mt-2 -mb-3 text-xs bg-gray-200 text-gray-500'>
            종료된 팝업스토어는<span className='font-bold text-black'>&nbsp;30일 후에&nbsp;</span>
            자동으로 사라집니다.
          </div>
          <div className='h-full mt-4 pb-44 overflow-auto opacity-50'>
            {wishList?.map((popup: PopupTypewithTogo) =>
              calPeriod(popup.popupStore).periodState === 'end' ? (
                <PopupCardWithTogo
                  key={popup.popupStore.id}
                  info={popup}
                  period={[calPeriod(popup.popupStore).periodState]}
                />
              ) : null,
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
