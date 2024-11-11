import { Article } from '@/types/article';
import React, { useState } from 'react'


interface CreateArticleModalProps {
    onClose: () => void;
    onSubmit: (newArticle: Partial<Article>) => Promise<{success: boolean, message:string}>
}

export const CreateArticleModal: React.FC<CreateArticleModalProps> = ({onClose, onSubmit}) => {

 const [title, setTitle] = useState('')
 const [content, setContet] = useState('')
 const [image_url, setImageUrl] = useState('')


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onSubmit({title, content, image_url})
        onClose()
    }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-4'>Crear Nuevo Articulo</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Titulo</label>
                    <input 
                    type="text"
                    className='w-full p-2 border border-gray-300 rounded'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Contenido</label>
                    <textarea 
                   
                    className='w-full p-2 border border-gray-300 rounded'
                    value={content}
                    onChange={(e) => setContet(e.target.value)}
                    required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>URL de Imagen</label>
                    <input 
                    type="text"
                    className='w-full p-2 border border-gray-300 rounded'
                    value={image_url}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                    />
                </div>
                <div className='flex justify-end'>
                <button 
                className='bg-gray-400 hover:bg-gray-500 text-white px-4 rounded mr-2'
                type='button'
                onClick={onClose}
                >
                    Cancelar
                </button>
                <button 
                className='bg-gray-400 hover:bg-gray-500 text-white px-4 rounded mr-2'
                type='submit'
                >
                    Crear
                </button>
                </div>
            </form>
        </div> 

    </div>
  )
}
