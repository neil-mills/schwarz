export interface Item {
  _id: string;
  title: string;
}

export interface Supplier {
  _id: string;
  title: string;
}

export interface Order {
  _id: string;
  supplier: Supplier;
  items: Item[];
  customerAddress: string;
}

export interface OrderData {
  orders: Order[];
}

export interface OrderDataVariables {
  filters?: {
    supplier?: string;
    customerAddress?: string
  }
}

export interface SupplierData {
  supplier: Supplier
}
