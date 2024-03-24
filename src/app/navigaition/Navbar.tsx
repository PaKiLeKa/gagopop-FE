import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='absolute bottom-0 bg-red-300 w-full h-16 flex justify-around items-center'>
      <Link href={'/'}>홈</Link>
      <Link href={'/popup'}>팝업 정보</Link>
      <Link href={'/wishlist'}>위시리스트</Link>
      <Link href={'/profile'}>프로필</Link>
    </div>
  );
}
