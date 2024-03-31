export interface PopupType {
  address: string;
  endDate: Date;
  id: number;
  imageUrl: string;
  info: string;
  latitude: number;
  longitude: number;
  name: string;
  opened: boolean;
  startDate: Date;
  snsLink: string;
  operatingTime: string;
  promoted: boolean;
}

export interface PopupTypewithWish {
  inWishlist: boolean;
  popupStore: PopupType;
}
export interface PopupTypewithTogo {
  inTogo: boolean;
  popupStore: PopupType;
}

export interface currentMapType {
  setCenter: (arg0: any) => void;
  setZoom: (arg0: number) => void;
}

export type WishData = {
  popupStore: PopupType[];
  inTogo: boolean;
};

export interface PopupCategoryList {
  [index: string]: PopupType[];
}

export interface User {
  email: string;
  nickname: null;
  wishlistTotal: number;
  togolistTotal: number;
  stampTotal: number;
}
