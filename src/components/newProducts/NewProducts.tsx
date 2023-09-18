import Image from 'next/image';
import React from 'react'
import CartIcon from '../icon/CartIcon';

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
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-8 h-[160px]  container'>
            {
                recent.length > 0 && recent.map((product) => (
                    <div key={product._id} className="">
                        <div  className='bg-white rounded-t-2xl p-4'>
                            <div className='relative h-[160px] w-full'>

                                <Image className='object-cover' fill priority src={product.image[1]} alt={`/${product.title}`} />
                            </div>
                        </div>
                        <div className=' border-b border-slate-300 border-l p-4 border-r rounded-b-2xl'>

                                <h3 className='font-bold text-sm'>{product.title}</h3>
                                <button className='primary-btn !rounded-md'>
                                    <CartIcon/>
                                </button>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default NewProducts