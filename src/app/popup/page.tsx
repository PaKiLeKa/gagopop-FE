import Carousel from '@/components/carousel/Carousel';
import DatePicker from '@/components/datepicker/DatePicker';
import HorizonScroll from '@/components/list/HorizonScroll';

export default function Popup() {
  return (
    <div className='h-full overflow-auto'>
      <DatePicker searchBarStyle={'bar'} />
      <Carousel />
      <HorizonScroll />
      <HorizonScroll />
      <HorizonScroll />
      <HorizonScroll />
      <HorizonScroll />
      <HorizonScroll />
    </div>
  );
}
