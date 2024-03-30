import { PopupType } from '@/types/types';
import { useEffect, useState } from 'react';

const usePeriod = (popup: PopupType) => {
  const [periodState, setPeriodState] = useState<string>('');
  const [diffDay, setDiffDay] = useState<number>(0);

  useEffect(() => {
    const today = new Date().getTime();
    const startDate = new Date(popup?.startDate).getTime();
    const endDate = new Date(popup?.endDate).getTime();

    if ((startDate <= today && today <= endDate) || (startDate <= today && startDate === endDate)) {
      setPeriodState('open');
      if (Math.floor((endDate - today) / (1000 * 60 * 60 * 24)) < 8) {
        setPeriodState('endsoon');
        setDiffDay(Math.floor((endDate - today) / (1000 * 60 * 60 * 24)));
      }
    } else {
      if (Math.floor((today - endDate) / (1000 * 60 * 60 * 24)) > 0) {
        setPeriodState('end');
      } else {
        setPeriodState('opensoon');
        setDiffDay(Math.floor((startDate - today) / (1000 * 60 * 60 * 24)));
      }
    }
  }, []);

  return { periodState, diffDay };
};
export default usePeriod;
