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
import useLoginModal from '@/app/hooks/useLoginModal'
import {signIn} from "next-auth/react"

const RegisterModal = () => {
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
            name:'',
            email:'',
            password:''
        }
    })
    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        axios.post('/api/register',data)
        .then(() => {
            signIn('credentials',data)
        })
        .then(() => {
            router.refresh();
            toast.success('Successfully created')
            registerModal.onClose()
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
            subtitle='Create an account'
            />
            <Input 
            id='name'
            label='Name'
            register={register}
            errors={errors}
            required
            disabled={isLoading}
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
            onClick={() => {}}
            disabled={isLoading}
            icon={AiOutlineGoogle}
            outline
            />
             <Button 
            label="Continue with facebook"
            onClick={() => {}}
            disabled={isLoading}
            icon={AiFillGithub}
            outline
            />
             <Button 
            label="Continue with github"
            onClick={() => {}}
            disabled={isLoading}
            icon={FaFacebookF}
            outline
            />
            <hr />
            <div className='font-light text-neutral-500 text-center'>
                Already have an account ?
                <span className='text-black hover:underline ml-2 cursor-pointer'
                onClick={() => {
                    registerModal.onClose();
                    loginModal.onOpen();
                }}>
                    Log in
                </span>
            </div>
        </div>
    )
  return (
    <Modal 
    isOpen={registerModal.isOpen}
    onClose={registerModal.onClose}
    title='Welcome to your favorite book library'
    actionLabel='Register'
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default RegisterModal