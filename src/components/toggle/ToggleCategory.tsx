import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';

export default function ToggleCategory({ setCategory }: { setCategory: any }) {
  const [value, setValue] = useState<string[]>([]);

  return (
    <>
      <ToggleGroup
        variant='outline'
        type='multiple'
        value={value}
        onValueChange={(value) => {
          if (value) {
            setValue(value);
            setCategory(value);
          }
        }}
        className='flex justify-start ml-5'
      >
        <ToggleGroupItem
          value='오픈중'
          aria-label='Toggle 오픈중'
          className='h-8 rounded-full border hover:bg-green-100 hover:border-green-500 hover:text-green-500 hover:border data-[state=on]:bg-green-100 data-[state=on]:border-green-500 data-[state=on]:text-green-500 data-[state=on]:border-2'
        >
          오픈중
        </ToggleGroupItem>
        <ToggleGroupItem
          value='오픈예정'
          aria-label='Toggle 오픈예정'
          className='h-8 rounded-full border hover:bg-green-100 hover:border-green-500 hover:text-green-500 hover:border data-[state=on]:bg-green-100 data-[state=on]:border-green-500 data-[state=on]:text-green-500 data-[state=on]:border-2'
        >
          오픈예정
        </ToggleGroupItem>
        <ToggleGroupItem
          value='종료'
          aria-label='Toggle 종료'
          className='h-8 rounded-full border hover:bg-green-100 hover:border-green-500 hover:text-green-500 hover:border data-[state=on]:bg-green-100 data-[state=on]:border-green-500 data-[state=on]:text-green-500 data-[state=on]:border-2'
        >
          종료
        </ToggleGroupItem>
        <ToggleGroupItem
          value='종료임박'
          aria-label='Toggle 오픈예정'
          className='h-8 rounded-full border hover:bg-green-100 hover:border-green-500 hover:text-green-500 hover:border data-[state=on]:bg-green-100 data-[state=on]:border-green-500 data-[state=on]:text-green-500 data-[state=on]:border-2'
        >
          종료임박
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
