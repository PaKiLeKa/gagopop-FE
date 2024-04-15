'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import UseArrc from '@/components/accordion/UseArrc';
import UserArrc from '@/components/accordion/UserArrc';
import ReportArrc from '@/components/accordion/ReportArrc';
import EtcArrc from '@/components/accordion/EtcArrc';
import ReportLogo from '../../../public/images/report.svg';

export default function CsCenter() {
  const router = useRouter();
  return (
    <div>
      <div className='relative flex justify-center items-center w-full h-14 px-1 py-2 border border-b-black'>
        <div
          onClick={() => {
            router.back();
          }}
          className='absolute left-3 flex justify-center items-center bg-gray-200 rounded-full aspect-square h-10 mr-1 cursor-pointer hover:bg-gray-100'
        >
          <div className='text-2xl'>←</div>
        </div>
        <span className='text-xl'>고객 센터</span>
      </div>
      <Tabs defaultValue='faq' className='w-[360px]'>
        <TabsList className='grid w-full h-[53px] grid-cols-2 text-black bg-white border-b'>
          <TabsTrigger
            value='faq'
            className='h-12 font-light data-[state=active]:font-semibold data-[state=active]:text-mgreen data-[state=active]:border-mgreen data-[state=active]:border-b-4'
          >
            FAQ(자주 묻는 질문)
          </TabsTrigger>
          <TabsTrigger
            value='inquiry'
            className='h-12 font-light data-[state=active]:font-semibold data-[state=active]:text-mgreen data-[state=active]:border-mgreen data-[state=active]:border-b-4'
          >
            제보 혹은 문의하기
          </TabsTrigger>
        </TabsList>
        <TabsContent value='faq'>
          <Tabs defaultValue='이용문의' className=''>
            <TabsList className='flex justify-start items-center gap-1 ml-2 text-black bg-white'>
              <TabsTrigger
                value='이용문의'
                className='border rounded-full p-2 text-xs data-[state=active]:bg-green-100  data-[state=active]:text-mgreen data-[state=active]:border-mgreen'
              >
                이용문의
              </TabsTrigger>
              <TabsTrigger
                value='회원문의'
                className='border rounded-full p-2 text-xs data-[state=active]:bg-green-100  data-[state=active]:text-mgreen  data-[state=active]:border-mgreen'
              >
                회원문의
              </TabsTrigger>
              <TabsTrigger
                value='제보/홍보문의'
                className='border rounded-full p-2 text-xs data-[state=active]:bg-green-100  data-[state=active]:text-mgreen  data-[state=active]:border-mgreen'
              >
                제보/홍보문의
              </TabsTrigger>
              <TabsTrigger
                value='기타'
                className='border rounded-full p-2 text-xs data-[state=active]:bg-green-100  data-[state=active]:text-mgreen  data-[state=active]:border-mgreen'
              >
                기타
              </TabsTrigger>
            </TabsList>
            <TabsContent value='이용문의' className='px-5'>
              <UseArrc />
            </TabsContent>
            <TabsContent value='회원문의' className='px-5'>
              <UserArrc />
            </TabsContent>
            <TabsContent value='제보/홍보문의' className='px-5'>
              <ReportArrc />
            </TabsContent>
            <TabsContent value='기타' className='px-5'>
              <EtcArrc />
            </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value='inquiry' className='flex flex-col justify-center items-center'>
          <div className='mt-4'>
            <ReportLogo />
          </div>
          <div className='bg-gray-100 p-7 m-5 rounded-lg text-sm font-light'>
            <p className='text-wrap text-center'>
              제보 및 1:1 문의는 <span className='font-bold'>0000@0000.com</span>으로
              <br /> 연락주시면 최대한 신속하고 친절하게
              <br /> 안내해 드리겠습니다!
            </p>
            <p className='text-xs text-gray-400 text-center mt-4'>
              평일 09:00~18:00, 주말 및 공휴일은 휴일
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
