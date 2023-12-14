import Input from "@/components/Input"
import axios from 'axios'
import { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
// import router from "next/router";
import {FcGoogle} from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';


const auth = () => {

    const [email, setEmail] = useState(" ")
    const [password, setPassword] = useState("")
    const [name, setUserName] = useState("")
    const [variant , setVariant] = useState("login")

    // const toggleVariant = 
    const toggleVariant =() => {
        setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
        console.log("variant toggled");
      };
      const login = useCallback(async () => {
        try {
            console.log("started")
            await signIn('credentials', {
                email,
                password,
                // redirect: false,
                callbackUrl: '/profile'
                
            });

            // router.push('/')
            console.log('ended')
        } catch (error) {
                console.error('Authentication error:', error);
        }
    }, [email, password]);


      const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                password,
                name
            });
            login()
        } catch (error) {
            console.log('Server Response:', error);
        }
    }, [email, name, password,login]);

   
    return (
        <div className="relative w-full h-[100%] bg-[url('/Images/hero.jpg')]  bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-30" >
            <nav className="px-12 py-5">
                <img src="./Images/logo.png" alt="logo" className="h-12"></img>
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 md:max-w-md rounded w-full">
                    <h2 className="flex text-4xl justify-center text-white mb-8 font-semibold ">
                        {variant === 'login' ? 'Signin' : 'Register'}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {variant === 'register' && (
                    <Input 
                        label="Username"
                        onChange={(e: any)=>{setUserName(e.target.value)}}
                        id="UserName"
                        type="text"
                        value={name}
                        />)}
                        <Input 
                        label="Email"
                        onChange={(e: any)=>{setEmail(e.target.value)}}
                        id="email"
                        type="email"
                        value={email}
                        />
                         <Input 
                        label="Password"
                        onChange={(e: any)=>{setPassword(e.target.value)}}
                        id="Password"
                        type="password"
                        value={password}
                        />
                    </div>
                        <button onClick={variant === 'login' ? login : register} className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition' >{variant === 'login' ? 'Login' : 'Sign Up'}</button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                                <div onClick={() =>signIn('google',{callbackUrl: '/profile'})} className="w-10 h-10 bg-white flex justify-center  cursor-pointer hover:opacity-80 rounded-full transition "> <FcGoogle size={30} className="flex my-auto "/></div>
                                <div onClick={() => signIn('github',{ callbackUrl: '/profile'})} className="w-10 h-10 bg-white flex justify-center cursor-pointer hover:opacity-80 rounded-full transition "> <FaGithub fill="black" stroke="black" size={30} className="flex my-auto "/></div>
                                
                        </div>
                        
                        <p className="text-neutral-400 mt-12">
                        {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'} 
                            <span className="text-white ml-1 hover:underline cursor-pointer"
                            onClick = {toggleVariant}>
                                {variant === 'login' ?  'Create an account' : 'Login '}
                            </span>
                        </p>
                </div>  

            </div>
        </div>
        </div>
    )
    }
    export default   auth;
