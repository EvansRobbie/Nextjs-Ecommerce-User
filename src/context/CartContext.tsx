"use client"
import AsyncStorageService from '@/utils/AsyncServiceStorage';
// import { ProductEntity } from '@/types/product/Product';
import React, { useContext, createContext, useState, useReducer, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast'

interface ProductEntity {
    _id:string,
    title:string,
    desc:string;
    image:string[],
    price:string;
    properties?:{
      color:string;
      storage:string
    }
    qty?:number
}
type Action = {
  type: string;
  payload: any;
};
interface CartType {
  items: Array<ProductEntity>;
}


interface CartContextValue {
  cart: {
    items: ProductEntity[]; // Use the actual type for cart items
  };
  addToCart: (item: ProductEntity, id: string) => void;
  itemQuantity: number
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  removeFromCart: (id:string, name:string) => void
  totalPrice:number
  // Add more functions or properties as needed
}
const CartContext = createContext<CartContextValue>({} as CartContextValue);

export const ACTION = {
  ADD_TO_CART: 'addToCart',
  REMOVE_FROM_CART: 'removeFromCart',
  INCREASE_QUANTITY: 'increaseQuantity',
  DECREASE_QUANTITY: 'decreaseQuantity',
  //   REMOVE_ALL: 'removeAll',

}
const reducer = (cart: CartType, action: Action) => {
  switch (action.type) {
    case ACTION.ADD_TO_CART: {
      // let newCart = {...cart, items:[...cart.items, {...action.payload, qty: 1}]}
      let inCart = false;
      const updatedCart = cart.items.map((item: any) => {

        if (item._id === action.payload._id) {
          inCart = true
          // toast.success(`Item QTY Increased`)
          return { ...item, qty: item.qty + 1 }
        }
        return item

      })
      if (!inCart) {
        updatedCart.push({ ...action.payload, qty: 1 })
      }
      return { ...cart, items: updatedCart }
    }
    case ACTION.REMOVE_FROM_CART: {

      // console.log(cart.items)
      return { ...cart, items: cart.items.filter((item) => item._id !== action.payload.id) }

    }
    case ACTION.INCREASE_QUANTITY: {
      return {
        ...cart,
        items: cart.items.map((item) => {
          if (item._id === action.payload.id) {
            toast.success(`Item QTY Increased`);
            return { ...item, qty: item.qty! + 1 };
          }
          return item;
        }),
      };
    }
    case ACTION.DECREASE_QUANTITY: {
      return {
        ...cart, items: cart.items.filter((item) => {
          if (item._id === action.payload.id) {
            // console.log(item.qty)
            if (item.qty! > 1) {
              toast.success(`Item QTY Decreased`)
              return { ...item, qty: item.qty! -= 1 }

            }
           
            return item
          }
          return item
        })
      }

    }
    // case ACTION.REMOVE_ALL:{
    //   toast.success(`Cart Cleared`)
    //   return {cart, items: []}
    // }
    // case ACTION.TOTAL_ITEMS:{
    //   const total = 
    // }
    default:
      return cart
  }
}
// const newCart = (cart) =>{
//   return {cart: cart, qty:+1}
// }
const CartContextProvider = ({ children }: { children: ReactNode }) => {

const [cart, dispatch] = useReducer(reducer, { items: [] });
  // item quantity toatal
  const [itemQuantity, setItemQuantity] = useState(0)
  // Total cart price
  const [totalPrice, setTotalPrice] = useState(0)

  // Total Quanity
  useEffect(() => {
    const total = cart.items.reduce((accumulator: any, currentIndex) =>
      accumulator + currentIndex.qty
      , 0)
    setItemQuantity(total)
  }, [cart])
  // Total cart Price
  useEffect (() =>{
    const total = cart.items.reduce((accumulator, currentIndex)=>
    accumulator + currentIndex.qty * currentIndex.price , 0)
    setTotalPrice(total)
  }, [cart])

  const addToCart = (item: ProductEntity, id: string) => {
    const inCart = cart.items.find((item) => item._id === id)
    // console.log(inCart)
    if (inCart) {
      toast.success(`Item QTY Increased`)
    }
    else {
      toast.success(`${item.title} added to Cart`)
     
    }
    dispatch({ type: ACTION.ADD_TO_CART, payload: item })
  }
// add ittems to local storage 
// useEffect(()=>{

// }, [cart])
  const removeFromCart = (id:string, name:string) =>{
    toast.success(`${name} removed from Cart`)
    // AsyncStorageService.removeData("cartItems");
    dispatch({type:ACTION.REMOVE_FROM_CART, payload:{id : id }})
  }
  const increaseQuantity = (id: string) => {
    dispatch({ type: ACTION.INCREASE_QUANTITY, payload: { id: id } })
  }
  const decreaseQuantity = (id: string) => {
      cart.items.map((i)=> i.qty <= 1 && removeFromCart(id, i.title));
    dispatch({ type: ACTION.DECREASE_QUANTITY, payload: { id: id } })

  }
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data:any = await AsyncStorageService.getData("cartItems");
        if (data && Array.isArray(data)) {
          data.forEach((item) => {
            // console.log(item)
            dispatch({ type: ACTION.ADD_TO_CART, payload: {...item} });
          });
        }
      } catch (error) {
        console.error("Error fetching cart from AsyncStorage:", error);
      }
    }
    fetchCart();
  }, []);
 // Save cart items to AsyncStorage whenever cart changes
 useEffect(() => {
  const saveCart = async () => {
    try {
      await AsyncStorageService.setData("cartItems", cart.items);
    } catch (error) {
      console.error("Error saving cart to AsyncStorage:", error);
    }
  }
  saveCart();
}, [cart]);


  // const removeAll =() =>{
  //   dispatch({type:ACTION.REMOVE_ALL})
  // }
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      totalPrice,
      itemQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}
const useCartContext = () => {
  return useContext(CartContext)
}
export {CartContextProvider, useCartContext}