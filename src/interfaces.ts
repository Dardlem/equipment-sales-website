export interface ProductList{
    [key: string]: ProductArray;
    products: ProductArray;
}

export interface ProductArray extends Array<any> {
    [key: number]: Product;
}

export interface Product{
    [key: string]: any;
    name: string;
    price: number;
    description: string;
    preview: string;
}

export interface ProductCard {
    name: string;
    price: number;
    description: string;
    preview: string;
    id: string;
}

export interface ShoppingCart {
    products: Array<ShoppingCartItem>;
}

export interface ShoppingCartItem {
    name: string;
    price: number;
    quantity: number;
    id: string;
    image: string;
}