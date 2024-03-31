import { PopupType } from '@/types/types';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const destinationState = atom<PopupType[]>({
  key: 'destinationState',
  default: [],
});

const today = new Date();
export const dateState = atom<Date>({
  key: 'dateState',
  default: today,
});

export const loginState = atom<boolean>({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const splashState = atom<boolean>({
  key: 'splash',
  default: true,
});
