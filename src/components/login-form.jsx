"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Icons } from './icons'
import Link from 'next/link'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import axios from 'axios'

function LoginForm({ origin = "signIn"}) {

    const [loading, setLoading] = useState(false);
    const { 
        register,
        handleSubmit
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            systemid: ""
        }
    })
    const router = useRouter();

    const onSubmit = (data) => {
        console.log('on submit function called')
        setLoading(true);
        try {
            if(origin == "signIn"){
                signIn("credentials", {
                    ...data,
                    redirect: false
                }).then((callback)=> {
                    if(callback?.ok){
                        console.log('logged in successfully')
                        router.refresh();
                    } else if(callback?.error){
                        console.log(callback.error, ' callback error')
                        throw new Error("something went wrong");
                    }
                })
            } else {
                // about to make an api call
                console.log('about to make api call')
                axios.post("/api/auth/register", data)
                .then(()=> {
                    console.log('user created hopefully')
                })
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='flex h-screen justify-center items-center'>
        <div className="space-y-2 flex flex-col w-full sm:w-1/2 items-center">
            {origin == "signUp" && <Input
                {...register('name')}
                type="text"
                placeholder="Your Name"
            />}
            {origin == "signUp" && <Input
                {...register('systemid')}
                type="systemid"
                placeholder="Your systemid"
            />}
            <Input
                {...register('email')}
                type="email"
                placeholder="Your email"
            />
            <Input
                {...register('password')}
                type="password"
                placeholder="Input your password"
            />
            <Button onClick={handleSubmit(onSubmit)} className="w-full">{origin == "signUp" ? "sign up" : "sign in"}</Button>
            {origin == "signUp" ? 
                <span className='mx-auto'>Already have an account? <Link className='font-semibold underline' href="/sign-in">sign in</Link></span>
            : 
                <span className='mx-auto'>New to airbnb? <Link className='font-semibold underline' href="/sign-up">sign up</Link> </span>
            }
        </div>
    </div>
  )
}

export default LoginForm