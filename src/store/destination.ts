import { atom } from 'recoil';

export const destinationState = atom<string[]>({
  key: 'destinationState',
  default: [],
});
