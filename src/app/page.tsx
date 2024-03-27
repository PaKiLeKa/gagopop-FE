import PopupCard from '@/components/card/PopupCard';
import Map from '@/components/map/Map';
import SearchBar from '@/components/searchbar/SearchBar';
import BottomSlide from '@/components/slide/BottomSlide';

export default function Home() {
  return (
    <div>
      <SearchBar onSearching={true} />
      <Map />
      <BottomSlide content={<PopupCard />} />
    </div>
  );
}
