"use client"
import AsyncStorageService from '@/utils/AsyncServiceStorage'
import React, {Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState} from 'react'

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
  useEffect(() => {
    const fetchData = async () => {
      if (cartProducts && cartProducts?.length > 0) {
        await AsyncStorageService.setData('product_cart', cartProducts)
       
      }
    }
    const fetchCartProduct = async () =>{
      const cartData = await AsyncStorageService.getData("product_cart")
      setCartProducts(cartData)
    }
    fetchCartProduct()
    fetchData()
  }, [cartProducts])
console.log(cartProducts)
  const addToCart = (productId:string) =>{
    setCartProducts((prev:any) => {
      if (prev) {
        return [...prev, productId];
    } else {
        return [productId];
    }
    
})
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