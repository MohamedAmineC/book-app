import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getBookByIsbn from "@/app/actions/getBookByIsbn";

interface bodyParams {
    isbn:string,
    title:string,
    subTitle?: string,
    authors:string[],
    description: string,
    image: string,
    language: string,
    categories: string[],
    publishedDate:string,
    rating: number
}

export async function POST(req:Request) {
    try{
    const body:bodyParams = await req.json();
    const {
        isbn,
        title,
        subTitle,
        authors,
        description,
        image,
        language,
        categories,
        publishedDate,
        rating
    } = body

    const book = await getBookByIsbn(isbn);
    if(book){
        return new NextResponse('Book already exists',{status:401})
    }
    const newBook = await prisma.book.create({
        data:{
            isbn,
            title,
            subTitle,
            authors,
            description,
            language,
            categories,
            image,
            publishedDate: new Date(publishedDate),
            rating
        }
    })
    return NextResponse.json(newBook);
    } catch(error:any){
        return new NextResponse('Internal server error',{status:500})
    }
}