'use client'
import { useCartContext } from '@/context/CartContext'
import Image from 'next/image'
import React from 'react'

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCartContext()
  // console.log(cart)
  return (
    <div className='grid grid-cols-3 w-full gap-8 container  my-6 p-4'>
      <div className=" bg-white rounded-xl p-4 col-span-2 shadow-md h-full">
        {!cart?.items.length && (
          <div className="">Your Cart is Empty</div>
        )}
        {cart && cart.items.length > 0 && (
          
            <div>
              <h2>cart</h2>
              <table>
                <thead>
                  <tr>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Price</td>
                  </tr>
                </thead>
                  {
                    cart?.items.map((product)=>(
                      <tr key={product._id} className=''>
                        <td className='flex items-center gap-2'>
                          <div className="relative w-[50px] flex-1 h-[150px] border">
                            <Image className='object-fit  w-[10px]' priority fill src={product.image[0]} alt={`/${product.title}`}/>
                          </div>
                          <h4 className='flex-1'>{product.title}</h4>
                        </td>
                        <td className=''>
                          <div className='w-full flex items-center justify-evenly '>
                          <button onClick={() =>decreaseQuantity(product._id)} className='text-xl bg-[#eee] px-4 py-1.5 rounded-md font-medium cursor-pointer'>-</button>
                          {product.qty}
                          <button onClick={() =>increaseQuantity(product._id)} className='text-xl bg-[#eee] px-4 py-1.5 rounded-md font-medium cursor-pointer'>+</button>

                          </div>
                          </td>
                        <td>{ Number(product.price) * product.qty! }</td>
                      </tr>
                    ))
                  }
                <tbody>
                  
                </tbody>
              </table>
                <div className=''>

                </div>
            </div>
        )}
      </div>
      {!!cart.items.length && (

      <div className=" bg-white rounded-xl flex flex-col shadow-md items-center p-4 gap-2 h-full">
        <h2 className='font-bold py-2'>Order Information</h2>
        <input type="text"  placeholder='Address 1'/>
        <input type="text"  placeholder='Address 2'/>
        <button className='primary-btn ml-0 !bg-slate-900 mt-4 capitalize rounded-md'>continue to payment</button>
      </div>
      )}
        
    </div>
  )
}

export default Cart