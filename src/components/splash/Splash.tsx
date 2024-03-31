import Image from 'next/image';
import Logo from '../../../public/images/logo.png';
import TogoIcon from '../../../public/icons/marker/togopin.svg';
import WishIcon from '../../../public/icons/marker/wishpin.svg';
import PopupIcon from '../../../public/icons/marker/popuppin.svg';
import Makers from '../../../public/makers.svg';
export default function Splash({ splash }: { splash: boolean }) {
  return splash ? (
    <div className='relative flex flex-col justify-center items-center gap-5 pb-10 h-screen z-30 bg-white'>
      <div className='flex justify-center items-center gap-3'>
        <div className='animate-bounce'>
          <PopupIcon />
        </div>
        <div className='animate-bounce' style={{ animationDelay: '0.3s' }}>
          <TogoIcon />
        </div>
        <div className='animate-bounce' style={{ animationDelay: '0.1s' }}>
          <WishIcon />
        </div>
      </div>
      <Image src={Logo} alt='로고 이미지' width={200} height={200} className='a animate-wiggle' />
      <p className='mt-4 text-sm text-center text-gray-400'>
        여러 팝업스토어를 가고 싶은 당신에게 <br />
        효율적인 최적의 순서를 알려줄 지도 서비스
      </p>
      <div className='absolute bottom-12'>
        <Makers />
      </div>
    </div>
  ) : null;
}
