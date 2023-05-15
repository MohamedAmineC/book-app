import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import bcrypt from "bcrypt"

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {
            name,
            email,
            password
        } = body
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(user){
            return new NextResponse('User already exists',{status:409})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                hashedPassword
            }
        })
        return NextResponse.json(newUser)
    } catch(error:any){
        return new NextResponse('Internal server error',{status:500})
    }
}