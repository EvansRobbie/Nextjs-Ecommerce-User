import Product from "@/models/Products"
import { connect } from "@/utils/moongose"
import { NextResponse } from "next/server"

export const GET = async () =>{
    await connect()
    // console.log(connect())
    try{
         const newProduct = await Product.find({}, null, {sort:{'_id': -1}, limit:10})
        //  console.log(product)
        return NextResponse.json(newProduct, {status:200})
    }catch(e){
        // console.log(e)
       return new NextResponse("Failed to Fetch Product", {status:400})
    }

}