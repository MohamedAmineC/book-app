import NextAuth,{ AuthOptions } from "next-auth";
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials:{
                email:{
                    label: 'email',
                    type: 'text'
                },
                password:{
                    label: 'password',
                    type: 'password'
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('email and password are required')
                }
                const user  = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })
                if(!user || !user.hashedPassword){
                    throw new Error('user not found')
                }
                const isMatchedPassword = await bcrypt.compare(credentials.password,user.hashedPassword)
                if(!isMatchedPassword){
                    throw new Error('wrong password')
                }
                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: '/'
    }
}

const handler = NextAuth(authOptions)

export {handler as GET,handler as POST};