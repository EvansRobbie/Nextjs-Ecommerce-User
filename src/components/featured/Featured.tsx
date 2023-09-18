import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartIcon from '../icon/CartIcon'

const Featured = ({_id, title, desc, image}:{_id:string, title:string, desc:string, image:string[]}) => {
    return (
        <div className='bg-slate-900 text-slate-200 py-8'>
            <div className='container'>
                <div className='grid grid-cols-2 gap-10 items-center'>

                    <div>
                        <h1 className='text-3xl font-bold capitalize'>{title}</h1>
                        <p className='text-[#aaa] text-sm py-4'>{desc}
                        </p>
                        <div className='flex items-center'>

                            <Link href={`/product/${_id}`} className='secondary-btn !bg-transparent border !text-white inline-flex'>Read More</Link>
                            <button className='primary-btn border border-orange-500  inline-flex items-center gap-2'>
                               <CartIcon/>
                                <span>

                                    Add to Cart
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className='relative h-[40vh] w-[30vw]'>
                        <Image fill={true} priority src={image[0]} alt='heroimage' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured