export default function Badge({ badgeState, diff }: { badgeState: string; diff: number }) {
  // 뱃지 :  종료임박, 종료, 오픈D-8, 종료D-7
  // 탭 : 오픈, 오픈예정, 종료, 종료 임박
  return badgeState === 'endsoon' && diff < 2 ? (
    <div className='flex justify-center items-center w-12 h-4 text-[10px] text-white bg-morange rounded-full'>
      종료임박
    </div>
  ) : badgeState === 'endsoon' && diff < 8 ? (
    <div className='flex justify-center items-center w-12 h-4 text-[10px] text-white bg-gray-900 rounded-full'>
      종료 D-{diff}
    </div>
  ) : badgeState === 'opensoon' && diff > 0 && diff < 8 ? (
    <div className='flex justify-center items-center w-12 h-4 text-[10px] text-white bg-mblue rounded-full'>
      오픈 D-{diff}
    </div>
  ) : badgeState === 'end' ? (
    <div className='flex justify-center items-center w-12 h-4 text-[10px] text-white bg-gray-300 rounded-full'>
      종료
    </div>
  ) : (
    <div></div>
  );
}
