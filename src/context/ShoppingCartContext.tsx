import { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"
import { Product, ProductArray } from "../interfaces"

type ShoppingCartProviderProps = {
    children: ReactNode
    data: ProductArray<Product>
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: string) => number
    increaseItemQuantity: (id: string) => void
    decreaseItemQuantity: (id: string) => void
    setItemQuantity: (id: string, quantity: number) => void
    removeFromCart: (id: string) => void
    // cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: string
    quantity: number
}


const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children, data }:ShoppingCartProviderProps ){
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const openCart = () => {
        setIsOpen(true);
    }

    const closeCart = () => {
        setIsOpen(false);
    }

    function getItemQuantity(id: string){
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function setItemQuantity(id: string, quantity: number){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity}]
            } else {
                return currItems.map(item => {
                    if (item.id === id && quantity >= 0) {
                        return {...item, quantity}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function increaseItemQuantity(id: string){
        setCartItems(currItems => {
            console.log("Increasing quantity of item: " + id)
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseItemQuantity(id: string){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id && item.quantity > 0) {
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: string){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart, setItemQuantity, openCart, closeCart, cartItems }}>
            {children}
            <ShoppingCart isOpen={isOpen} cartItems={cartItems} data={data}/>
        </ShoppingCartContext.Provider>
    )
}