import Calandar from '@/components/calandar/Calandar';
import SearchBar from '@/components/searchbar/SearchBar';

export default function Home() {
  return (
    <div>
      <Calandar />
      <SearchBar />
      <div>Map</div>
      <div>Pop-Up Information Tab</div>
    </div>
  );
}
