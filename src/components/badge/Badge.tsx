export default function Badge({ badgeState }: { badgeState: string }) {
  return badgeState === 'end' ? (
    <div className='flex justify-center items-center w-12 h-4 text-[10px] text-white bg-orange-600 rounded-full'>
      종료임박
    </div>
  ) : (
    <div className='flex justify-center items-center w-12 h-4 text-[10px] text-white bg-gray-900 rounded-full'>
      종료 0일전
    </div>
  );
}
