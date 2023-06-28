export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  brand: string;
  available: boolean;
  weight: number;
  options?: [
    {
      color: string | string[];
      power?: number[] | null;
      storage?: string[] | null;
      quantity: number;
    }
  ];
  reservedQuantity?: number;
}

export interface CartProductInterface {
  id: number;
  name: string;
  price: number;
  brand: string;
  available: boolean;
  weight: number;
  options?: {
    color: string;
    power?: number | null;
    storage?: string | null;
    quantity: number;
  };
  reservedQuantity?: number;
}

export interface StateInterface {
  products: ProductInterface[];
  cart: ProductInterface[];
}

export interface ActionInterface {
  type: string;
  payload: any;
}
