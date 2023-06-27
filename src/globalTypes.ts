export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  brand: string;
  available: boolean;
  weight: number;
  options?: ProductOptionsInterface[];
}

interface ProductOptionsInterface {
  color: string | string[];
  power?: number[];
  storage?: string[];
  quantity: number;
}

export interface StateInterface {
  products: ProductInterface[];
  cart: ProductInterface[];
}

export interface ActionInterface {
  type: string;
  payload: any;
}
