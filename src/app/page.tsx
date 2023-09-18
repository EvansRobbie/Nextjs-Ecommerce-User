import Featured from '@/components/featured/Featured'
import NewProducts from '@/components/newProducts/NewProducts'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const getProduct = async () =>{
  const response = await fetch('http://localhost:3001/api/hero', {cache:'no-store'})
  if(!response.ok){
    return notFound()
  }
  return response.json()
  // console.log(response)
}

const getRecentProduct = async () =>{
  const response = await fetch('http://localhost:3001/api/recent_products', { next: { revalidate: 3600 } })
  if(!response.ok){
    return notFound()
  }
  return response.json()
  // console.log(response)
}
export default async function Home() {
  const data = await getProduct()

  const recentProducts  = await getRecentProduct()
  // console.log(recentProducts)
  // console.log(data)
  return (
    <main className="">
      <Featured {...data}/>
      <NewProducts recent = {recentProducts}/>
    </main>
  )
}
