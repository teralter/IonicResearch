import { OutletProduct } from './outlet-product';
import { OutletPhoto } from './outlet-photo';

export class OutletForm {
  id: number;
  repDate: Date;
  name: string;
  inn: string;
  address: string;
  openingTime: Date;
  latitude: number;
  longitude: number;
  typeId: number;
  products: OutletProduct[];
  photos: OutletPhoto[];

  constructor() {
    this.id = 0;
    this.products = [];
    this.photos = [];
  }
}
