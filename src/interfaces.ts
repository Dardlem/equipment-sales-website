export interface ProductList{
    [key: string]: ProductArray<Product>;
    products: ProductArray<Product>;
}

export interface ProductArray<Product> {
    [key: string]: Product;
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