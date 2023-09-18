"use client"
import Image from 'next/image';
import React from 'react'
import CartIcon from '../icon/CartIcon';
import Link from 'next/link';
import { useCartContext } from '@/context/CartContext';

interface recentProps {
    recent: {
        _id: string;
        title: string;
        desc: string;
        price: string;
        image: string[];
        properties?: {
            color: string;
            storage: string
        }
    }[]
}

const NewProducts: React.FC<recentProps> = ({ recent }) => {
    const {addToCart, cartProducts} = useCartContext()
   
    return (
        <div className=" container px-4 py-8 ">
            <h2 className='text-lg text-slate-500 font-semibold pb-4'>New Arrivals</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8  h-[160px] '>
                {
                    recent.length > 0 && recent.map((product) => (
                        <div key={product._id} className="">
                            <div className='bg-white rounded-t-2xl p-4'>
                                <Link href={`product/${product._id}`}>
                                    <div className='relative h-[160px] w-full'>

                                        <Image className='object-cover' fill priority src={product.image[1]} alt={`/${product.title}`} />
                                    </div>
                                </Link>
                            </div>
                            <div className=' border-b border-slate-300 border-l p-4 border-r rounded-b-2xl'>

                                <Link href={`product/${product._id}`} className='font-bold text-sm'>{product.title}</Link>
                                <div className="flex items-center justify-between pt-4">
                                    <div>Ksh <span className='font-bold'>{product.price}</span></div>
                                    <button onClick={() => addToCart(product._id)} className='border-2 border-orange-500 px-4 py-1.5 hover:text-slate-50 hover:bg-orange-500 flex items-center hover:border-orange-500 transition ease-in duration-300 font-bold gap-2 !rounded-md'>
                                        <CartIcon /> <span className='text-sm'>Add to cart</span>
                                    </button>

                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NewProducts