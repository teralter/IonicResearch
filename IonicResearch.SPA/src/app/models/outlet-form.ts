import { OutletPhoto } from './outlet-photo';
import { OutletProduct } from './outlet-product';

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
  photos: OutletPhoto[];
  products: OutletProduct[];

  constructor() {
    this.id = 0;
    this.products = [];
    this.photos = [];
  }
}
