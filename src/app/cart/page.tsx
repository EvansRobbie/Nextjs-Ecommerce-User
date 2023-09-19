'use client'
import { useCartContext } from '@/context/CartContext'
import React from 'react'

const featured = () => {
  const { cart } = useCartContext()
  console.log(cart)
  return (
    <div className='grid grid-cols-3 w-full gap-8 container  my-6 p-4'>
      <div className=" bg-white rounded-xl p-4 col-span-2 shadow-md h-full">
        {!cart?.items.length && (
          <div className="">Your Cart is Empty</div>
        )}
        {cart && cart.items.length > 0 && (
          
            <div>
              <h2>cart</h2>
                <div className=''>

                {
                  cart?.items.map((product)=>(
                    <div key={product._id}>
                      {product.title}
                    </div>
                  ))
                }
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

export default featured