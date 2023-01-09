import { createContext, ReactNode, useContext, useState } from "react"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    setItemQuantity: (id: number, quantity: number) => void
    removeFromCart: (id: number) => void
    // cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity: number
}


const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }:ShoppingCartProviderProps){
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const openCart = () => {
        setIsOpen(true);
    }

    const closeCart = () => {
        setIsOpen(false);
    }

    function getItemQuantity(id: number){
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function setItemQuantity(id: number, quantity: number){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function increaseItemQuantity(id: number){
        setCartItems(currItems => {
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

    function decreaseItemQuantity(id: number){
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                 })
             }
        })
    }

    function removeFromCart(id: number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart, setItemQuantity, openCart, closeCart, cartItems }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}