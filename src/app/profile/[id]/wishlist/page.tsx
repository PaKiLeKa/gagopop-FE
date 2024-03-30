'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PopupCard from '@/components/card/PopupCard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Wishlist() {
  const [activeTab, setActiveTab] = useState<string>('open');
  const router = useRouter();

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
            <PopupCard icon='togo' />
            <PopupCard icon='togo' />
          </div>
        </TabsContent>
        <TabsContent value='openyet'>
          <div className='h-full mt-4 pb-44 overflow-auto'>
            <PopupCard icon='togo' />
            <PopupCard icon='togo' />
            <PopupCard icon='togo' />
            <PopupCard icon='togo' />
          </div>
        </TabsContent>
        <TabsContent value='end'>
          <div className='flex items-center h-[42px] pl-3 -mt-2 -mb-3 text-xs bg-gray-200 text-gray-500'>
            종료된 팝업스토어는<span className='font-bold text-black'>&nbsp;30일 후에&nbsp;</span>
            자동으로 사라집니다.
          </div>
          <div className='h-full mt-4 pb-44 overflow-auto opacity-50'>
            <PopupCard icon='togo' />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}