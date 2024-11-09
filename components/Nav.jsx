'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, getProviders, useSession } from 'next-auth/react';

const Nav = () => {
    const isLoggedIn = true;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, settoggleDropdown] = useState(false);
    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        fetchProviders();
    }, []);

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='flex gap-2 flex-center'>
                <Image
                    src="/assets/images/logo.svg" // Note the leading '/' to access the root assets folder
                    alt="Logo"
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>EZ Prompter</p>
            </Link>
            <div className='sm:flex hidden'>
                {isLoggedIn ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>
                        <button type='button' onClick={signOut} className='outline_btn'>
                            Sign Out
                        </button>
                        <Link href="/Profile">
                            <Image
                                src="/assets/images/logo.svg"
                                width={37}
                                height={37}
                                alt='profile'
                                className='rounded-full'
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign in with {provider.name}
                                </button>
                            ))
                        }
                    </>
                )}
            </div>
            <div className='sm:hidden flex relative'>
                {isLoggedIn ? (<div className='flex'>
                    <Image
                        src="/assets/images/logo.svg"
                        width={37}
                        height={37}
                        alt='profile'
                        className='rounded-full'
                        onClick={() => settoggleDropdown((prev) => !prev)

                        }
                    />
                    {toggleDropdown && (
                        <div className='dropdown'>
                        <Link href="/profile" className='dropdown_link'
                            onClick={()=>settoggleDropdown(false)}
                        >My Profile</Link>
                        <Link href="/create-prompt" className='dropdown_link'
                            onClick={()=>settoggleDropdown(false)}
                        >Create Prompt</Link>
                        <button type='button' className='mt-5 w-full black_btn' onClick={()=>{
                            settoggleDropdown(false);
                            signOut();
                        }}>Sign Out </button>
                        </div>
                    )}
                        
                </div>) : <>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign in with {provider.name}
                            </button>
                        ))
                    }
                </>}
            </div>
        </nav>
    );
};

export default Nav;
