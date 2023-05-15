"use client"

import useBookModal from '@/app/hooks/useBookModal'
import Modal from './Modal'
import { useCallback, useState } from 'react'
import Heading from '../Heading'
import Input from '../inputs/Input'
import {useForm,FieldValues,SubmitHandler} from "react-hook-form"
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BeatLoader } from 'react-spinners'

const BookModal = () => {
    const {isOpen,onClose,onOpen} = useBookModal()
    const [isLoading,setIsLoading] = useState(false);
    const [book,setBook] = useState<any>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<FieldValues>({
        defaultValues:{
            isbn: ''
        }
    })
    const onSubmit:SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        if(!book || !(book.volumeInfo.industryIdentifiers[0].identifier === data.isbn || book.volumeInfo.industryIdentifiers[1].identifier === data.isbn )){
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${data.isbn}`)
            const json = await response.json()
            console.log(json)
            if(json?.items?.length > 0){
                setBook(json.items[0])
            }else{
                setBook(null)
                reset()
                toast.error('Invalid ISBN')
            }
            return setIsLoading(false)
        }
        axios.post('/api/books',{
            isbn: book.volumeInfo.industryIdentifiers[0].identifier,
            title: book.volumeInfo.title,
            subTitle: book.volumeInfo.subtitle,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            language: book.volumeInfo.language,
            categories: book.volumeInfo.categories,
            publishedDate: book.volumeInfo.publishedDate,
            rating: book.volumeInfo.averageRating
        }).then(() => {
            toast.success('Book added to your library')
            setBook(null)
        }).catch((error) => {
            console.log(error)
            toast.error(error?.response?.data)
        }).finally(() => {
            setIsLoading(false)
            onClose()
        })
        console.log(book)
    }
    const onSecondAction = () => {
        reset()
        setBook(null)
    }
    const body = (
        <div className='flex flex-col gap-4'>
            <Heading 
            title='Which book do you like to add to your library?'
            subtitle='Add your book by its ISBN number'
            />
            <Input
            id='isbn'
            label='ISBN'
            register={register}
            errors={errors}
            required
            disabled={isLoading}
            thumbnail={book ? book.volumeInfo.imageLinks.smallThumbnail : undefined}
            reset={() => setValue('isbn','')} 
            />
            <hr />
            {book && (
                <div className='flex items-center gap-4'>
                    <div>
                        <Image 
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        width={100}
                        height={100}
                        className='object-cover rounded-md'
                        />
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div className='text-2xl font-bold'>
                            {book.volumeInfo.title}
                        </div>
                        <div className='text-xl font-semibold'>
                            {book.volumeInfo.subtitle}
                        </div>
                        <div className='text-md font-light text-green-800'>
                            {book.volumeInfo.authors.join(', ')}
                        </div>
                        <div className='text-sm text-neutral-500 font-light'>
                            {book.volumeInfo.categories?.join(', ')}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
  return (
    <Modal 
    isOpen={isOpen}
    onClose={onClose}
    actionLabel={isLoading ? <BeatLoader size={18} color='white'/> : (book ? 'Confirm' : 'Search')}
    onSubmit={handleSubmit(onSubmit)}
    title='Add a book to your library'
    disabled={isLoading}
    body={body}
    secondaryAction={book ? onSecondAction : undefined}
    secondaryActionLabel={book ? 'Cancel' : undefined}
    />
  )
}

export default BookModal