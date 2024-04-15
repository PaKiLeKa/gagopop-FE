import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';

export default function ToggleCategory({
  setCategory,
  periodArray,
  handleSum,
}: {
  setCategory: any;
  periodArray: string[];
  handleSum: any;
}) {
  const [value, setValue] = useState<string[]>(['open', 'opensoon', 'endsoon', 'end']);

  const openCount = periodArray.filter((item) => item === 'open').length;
  const openSoonCount = periodArray.filter((item) => item === 'opensoon').length;
  const endSoonCount = periodArray.filter((item) => item === 'endsoon').length;
  const endCount = periodArray.filter((item) => item === 'end').length;
  const totalCount =
    (value.includes('open') ? openCount : 0) +
    (value.includes('opensoon') ? openSoonCount : 0) +
    (value.includes('endsoon') ? endSoonCount : 0) +
    (value.includes('end') ? endCount : 0);
  handleSum(totalCount);
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
          value='open'
          aria-label='Toggle 오픈중'
          className='h-8 rounded-full border hover:bg-green-100 hover:border-mgreen hover:text-mgreen hover:border data-[state=on]:bg-green-100 data-[state=on]:border-mgreen data-[state=on]:text-mgreen data-[state=on]:border-2'
        >
          {`오픈중 ${openCount}`}
        </ToggleGroupItem>
        <ToggleGroupItem
          value='opensoon'
          aria-label='Toggle 오픈예정'
          className='h-8 rounded-full border hover:bg-green-100 hover:border-mgreen hover:text-mgreen hover:border data-[state=on]:bg-green-100 data-[state=on]:border-mgreen data-[state=on]:text-mgreen data-[state=on]:border-2'
        >
          {`오픈예정 ${openSoonCount}`}
        </ToggleGroupItem>
        <ToggleGroupItem
          value='end'
          aria-label='Toggle 종료'
          className='h-8 rounded-full border hover:bg-green-100 hover:border-mgreen hover:text-mgreen hover:border data-[state=on]:bg-green-100 data-[state=on]:border-mgreen data-[state=on]:text-mgreen data-[state=on]:border-2'
        >
          {`종료 ${endCount}`}
        </ToggleGroupItem>
        <ToggleGroupItem
          value='endsoon'
          aria-label='Toggle 오픈예정'
          className='h-8 rounded-full border hover:bg-green-100 hover:border-mgreen hover:text-mgreen hover:border data-[state=on]:bg-green-100 data-[state=on]:border-mgreen data-[state=on]:text-mgreen data-[state=on]:border-2'
        >
          {`종료임박 ${endSoonCount}`}
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
