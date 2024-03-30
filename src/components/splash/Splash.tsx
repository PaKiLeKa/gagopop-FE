import Image from 'next/image';
import Logo from '../../../public/images/logo.png';

export default function Splash() {
  return (
    <div className='flex justify-center items-center h-screen relative -top-14 z-30 bg-[#fcc32e]'>
      <Image src={Logo} alt='로고 이미지' />
    </div>
  );
}
