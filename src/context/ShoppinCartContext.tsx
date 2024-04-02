import { ReactNode, createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart: ()=> void
    closeCart: ()=> void
    cartQuantity: ()=> number
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartItems: CartItems[]
}

type CartItems = {
    id: number
    quantity: number
}

export const ShoppingCartContext = createContext(null)

export default function useShoppingCartContext() {
  return useContext(ShoppingCartContext)
}


// Provider 
export function ShoppingCartProvider({children}: ShoppingCartProviderProps){

    const [cartItems, setCartItems] = useLocalStorage<CartItems[]>("shopping-cart",[])
    const [isOpen, setisOpen] = useState(false)

    function openCart(){
        setisOpen(true)
    }

    function closeCart(){
        setisOpen(false)
    }

    function cartQuantity(){
        return cartItems.reduce( (quantity, item)=> item.quantity + quantity, 0)
    }

    function getItemQuantity(id: number) {
        return cartItems.find( (item)=> item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number){
        setCartItems( cartItems => {            
            if(cartItems.find( (item) => item.id === id) == null) {
                return [...cartItems, {id, quantity: 1}]
            } else {
                return cartItems.map((item)=>{
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        }          
        )
    }

    function decreaseCartQuantity(id: number){
        setCartItems( cartItems => {            
            if(cartItems.find( (item) => item.id === id)?.quantity === 1 ) {
                return cartItems.filter( item => item.id !== id )
            } else {
                return cartItems.map((item)=>{
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        }          
        )
    }

    function removeFromCart(id: number){
        setCartItems(cartItems => cartItems.filter( item => item.id !== id ))
    }
    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart,
            isOpen}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
