import { Collection, ObjectId } from 'mongodb';

export interface Item {
	_id: ObjectId;
	title: string;
}

export interface Supplier {
	_id: ObjectId;
	title: string;
}

export interface Order {
	_id: ObjectId;
	supplier: ObjectId | Supplier;
	customerAddress: string;
	items: ObjectId[]
}

export interface Database {
	items: Collection<Item>;
	suppliers: Collection<Supplier>;
	orders: Collection<Order>
}