'use client';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CalandarIcon from '../../../public/icons/calandar.svg';
import { dateState } from '@/store/search';
import { useRecoilState } from 'recoil';
import { SelectSingleEventHandler } from 'react-day-picker';

export default function DatePicker({ searchBarStyle }: { searchBarStyle: string }) {
  const [date, setDateState] = useRecoilState<Date>(dateState);

  const handleDateSelect: SelectSingleEventHandler = (val: Date | undefined) => {
    if (val !== undefined) {
      setDateState(val);
    }
  };

  return (
    <>
      {searchBarStyle === 'circle' ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'} className='aspect-square rounded-full bg-gray-200'>
              <div>
                <CalandarIcon />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full p-0'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              className=''
            />
          </PopoverContent>
        </Popover>
      ) : searchBarStyle === 'bar' ? (
        <Popover>
          <Button
            variant={'outline'}
            className={cn(
              'w-[360px] h-14 justify-start gap-3 text-left font-normal text-xl rounded-none border-b-black',
              !date && 'text-muted-foreground',
            )}
          >
            <div className='flex justify-center items-center w-10 h-10 -ml-1 bg-gray-300 rounded-full'>
              <CalandarIcon />
            </div>
            {date ? (
              format(date, 'yyyy.MM.dd')
            ) : (
              <span className='text-xl'>날짜를 지정해주세요.</span>
            )}
          </Button>
          <PopoverContent className='w-auto p-0 absolute'>
            <Calendar mode='single' selected={date} onSelect={handleDateSelect} initialFocus />
          </PopoverContent>
        </Popover>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-1/5 justify-start absolute top-1 right-16 text-left text-xs font-light  bg-transparent text-gray-400 border-none hover:bg-transparent',
                !date && 'text-muted-foreground',
              )}
            >
              {date ? format(date, 'yyyy.MM.dd') : <span>선택된 날짜</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full p-0'>
            <Calendar
              className='absolute -right-9 -top-4'
              mode='single'
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
