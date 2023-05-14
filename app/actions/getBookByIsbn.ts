import prisma from "@/app/libs/prismadb"

const getBookByIsbn = async (isbn:string) => {
    const book = await prisma.book.findUnique({
        where:{
            isbn
        }
    })
    return book;
}

export default getBookByIsbn