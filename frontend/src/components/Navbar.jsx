import React, { useState } from 'react'
import Logo from '../images/logo.png'
import { HiMenuAlt3 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { useMutation } from 'react-query';
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout } from '../utils/authService';

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const logoutMutation = useMutation(logout);
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logoutMutation.mutateAsync();
        navigate("/login")
    }

    return (
        <header className='w-full fixed z-10 bg-black opacity-90'>
            <nav className='flex w-full py-1 md:py-1 px-4 md:px-20 items-center justify-between'>
                <a href="/" className='flex items-center justify-center text-white text-lg cursor-pointer'>
                    <img src={Logo} alt="Logo" className='hidden md:block w-8 h-8 lg:w-14 lg:h-14' />
                    Flavor<span>Verse</span>
                </a>

                <ul className='hidden md:flex text-white gap-6'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/recipes">Explore</Link>
                    </li>
                    {/* <li>
                        <Link to="/favorites">Favorites</Link>
                    </li> */}
                </ul>

                { isAuthenticated() &&
                    <div>
                        <Button
                            title='Logout'
                            conteinerStyle='md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]'
                            textStyle='text-white'
                            handleClick= {handleLogout}
                        />
                    </div>
                }


                <button className='block md:hidden text-white text-xl'
                    onClick={() => setOpen(prev => !prev)}>
                    {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
                </button>
            </nav>
            <div className={`${open ? "flex" : "hidden"} bg-black flex-col w-full px-4 pt-16 pb-10 text-white gap-6 text-[14px]`}>
                <Link href="/">Home</Link>
                <Link href="/recipes">Recipes</Link>
                {/* <Link href="/favorites">Favorites</Link> */}
            </div>
        </header>
    )
}

export default Navbar