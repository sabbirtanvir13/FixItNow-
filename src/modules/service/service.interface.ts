
export interface ICreateService {
  category_id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  location: string;
}

export interface IUpdateService {
  category_id?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  location?: string;
}