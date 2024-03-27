'use client';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import CalandarIcon from '../../../public/icons/calandar.svg';

export default function DatePicker({ onSearching }: { onSearching: boolean }) {
  const [date, setDate] = useState<Date>();

  return (
    <>
      {onSearching ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'} className='aspect-square rounded-full bg-gray-200'>
              <div>
                <CalandarIcon />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full p-0 '>
            <Calendar mode='single' selected={date} onSelect={setDate} initialFocus className='' />
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
            <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
