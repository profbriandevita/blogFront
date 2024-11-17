'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";





const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({email, password})
        })


        if (response.ok) {
            router.push('/')
        } else {
            const data = await response.json()
            setError(data.error || 'Error al iniciar la sesion')
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesion</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input 
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500"
                >
                    Iniciar Sesion
                </button>
            </form>
            <div className='text-center mt-6'>
                <p className="text-gray-700">¿No tienes una cuenta? {' '}</p>
                <Link href='/pages/register'>
                    <span className="text-indigo-600 hover:underline">Registrate</span>
                </Link>

            </div>
        </div>
    )



}

export default Login;