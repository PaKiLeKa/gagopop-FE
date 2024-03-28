'use client';

import { RecoilRoot } from 'recoil';

export default function RecoilRootWrap({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
