import Product from "@/models/Products"
import { connect } from "@/utils/moongose"
import { NextResponse } from "next/server"

export const GET = async () =>{
    await connect()
    // console.log(connect())
    try{
        const productId:String  =  "650714f65035a4b2a83e8203"
         const product = await Product.findById(productId)
        //  console.log(product)
        return NextResponse.json(product, {status:200})
    }catch(e){
        // console.log(e)
       return new NextResponse("Failed to Fetch Product", {status:400})
    }

}