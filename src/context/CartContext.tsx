"use client"
import React, {Dispatch, ReactNode, SetStateAction, createContext, useContext, useState} from 'react'

interface cart {
  _id:string
  title:string
  desc:string
  price:string
  image:string[]
}
interface cartProps {
  cartProducts: cart[] | null
  setCartProducts:Dispatch<SetStateAction<cart[] | any>>
  addToCart:(productId:string) =>void;
} 
const CartContext = createContext<cartProps>({} as cartProps)

const CartContextProvider = ({children}:{children:ReactNode}) => {
  const [cartProducts, setCartProducts] = useState<cart[] | null>(null)

  const addToCart = (productId:string) =>{
    setCartProducts((prev:any) => [...prev, productId])
}
  return (
    <CartContext.Provider value={{cartProducts, setCartProducts, addToCart}}>
        {children}
    </CartContext.Provider>
  )
}

const useCartContext = () =>{
  return useContext(CartContext)
}

export  { CartContextProvider, useCartContext}