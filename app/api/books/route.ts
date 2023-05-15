import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getBookByIsbn from "@/app/actions/getBookByIsbn";
import getCurrentUser from "@/app/actions/getCurrentUser";

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
    const currentUser = await getCurrentUser();
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

    if(!currentUser){
        return new NextResponse('Please login to continue this action',{status:403})
    }
    const book = await getBookByIsbn(isbn);
    if(book){
        const updatedUser = await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                books:{
                    connect:{
                        id:book.id
                    }
                }
            }
        })

        return new NextResponse('Book added to your library')
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
            rating,
            user:{
                connect:{
                    id: currentUser?.id
                }
            }
        }
    })
    return NextResponse.json(newBook);
    } catch(error:any){
        return new NextResponse('Internal server error',{status:500})
    }
}