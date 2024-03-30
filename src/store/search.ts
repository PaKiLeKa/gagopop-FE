import { PopupType } from '@/types/types';
import { atom } from 'recoil';

export const destinationState = atom<PopupType[]>({
  key: 'destinationState',
  default: [],
});

const today = new Date();
export const dateState = atom<Date>({
  key: 'dateState',
  default: today,
});
