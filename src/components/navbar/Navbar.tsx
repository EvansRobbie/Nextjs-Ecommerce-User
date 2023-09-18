"use client"
import { useCartContext } from '@/context/CartContext'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const {cartProducts} = useCartContext()
  return (
    <header className='h-20 bg-slate-900 flex items-center'>
        <div className=' container flex items-center justify-between w-full'>
            <Link className='text-white' href={'/'}>E-commerce</Link>
            <nav className='flex gap-4 text-[#aaa]'>
            <Link className='' href={'/'}>Home</Link>
            <Link className='' href={'/products'}>All Products</Link>
            <Link className='' href={'/categories'}>Categories</Link>
            <Link className='' href={'cart'}>Cart({cartProducts ? cartProducts?.length : 0})</Link>
            </nav>

        </div>
    </header>
  )
}

export default Navbar