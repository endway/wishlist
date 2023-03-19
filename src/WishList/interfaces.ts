export interface Wish {
  id: string;
  url: string;
  for: string;
  hide?: boolean;
  label: string;
  price: number;
  checked: boolean;
}
