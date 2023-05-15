"use client"

import React, { useState } from 'react'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../Button'
import {AiFillGithub, AiOutlineGoogle} from "react-icons/ai"
import {FaFacebookF} from "react-icons/fa"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {signIn} from "next-auth/react"
import useLoginModal from '@/app/hooks/useLoginModal'

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading,setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })
    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        signIn('credentials',data)
        .then(() => {
            toast.success('Successfully logged in')
            loginModal.onClose()
            router.refresh()
        }).catch((error) => {
            console.log(error)
            toast.error(error?.response?.data || error?.message)
        }).finally(() => {
            setIsLoading(false)
        })
    }
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading 
            title='Join us and stay in touch with other book lovers'
            subtitle='Log into your account'
            />
            <Input 
            id='email'
            label='Email'
            type='email'
            register={register}
            errors={errors}
            required
            disabled={isLoading}
            />
            <Input 
            id='password'
            label='Password'
            type='password'
            register={register}
            errors={errors}
            required
            disabled={isLoading}
            />
        </div>
    )
    const footerContent = (
        <div className='flex flex-col gap-4'>
            <hr />
            <Button 
            label="Continue with google"
            onClick={() => signIn('google')}
            disabled={isLoading}
            icon={AiOutlineGoogle}
            outline
            />
             <Button 
            label="Continue with facebook"
            onClick={() => signIn('github')}
            disabled={isLoading}
            icon={AiFillGithub}
            outline
            />
             <Button 
            label="Continue with github"
            onClick={() => signIn('facebook')}
            disabled={isLoading}
            icon={FaFacebookF}
            outline
            />
            <hr />
            <div className='font-light text-neutral-500 text-center'>
                This is your first time visiting the website ?
                <span className='text-black hover:underline ml-2 cursor-pointer'
                onClick={() => {
                    loginModal.onClose();
                    registerModal.onOpen();
                }}>
                    Create a new account
                </span>
            </div>
        </div>
    )
  return (
    <Modal 
    isOpen={loginModal.isOpen}
    onClose={loginModal.onClose}
    title='Welcome to your favorite book library'
    actionLabel='Login'
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModal