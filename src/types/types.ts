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
}

export interface PopupTypewithWish {
  inWishlist: boolean;
  popupStore: PopupType;
}

export interface currentMapType {
  setCenter: (arg0: any) => void;
  setZoom: (arg0: number) => void;
}