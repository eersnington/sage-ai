"use client";

// components/AuthButtons.tsx
import { useState } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

type AuthButtonsProps = {
    isUserAuthenticated: boolean;
};

const AuthButtons: React.FC<AuthButtonsProps> = ({ isUserAuthenticated }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
    };

    return (
        <div className="flex flex-col">
            {isUserAuthenticated ? (
                <Button className="w-full my-2" onClick={handleClick}>
                    <Link href="/api/auth/logout" passHref>
                        {loading ? <Loader className="animate-spin" /> : 'Logout'}
                    </Link>
                </Button>
            ) : (
                <>
                    <Link
                        className={cn(buttonVariants({ variant: 'outline' }), 'w-full my-2')}
                        href="/api/auth/login?"
                        onClick={handleClick}
                    >
                        {loading ? <Loader className="animate-spin" /> : 'Login'}
                    </Link>
                    <Link
                        className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
                        href="/api/auth/register?"
                        onClick={handleClick}
                    >
                        {loading ? <Loader className="animate-spin" /> : 'Register'}
                    </Link>
                </>
            )}
        </div>
    );
};

export default AuthButtons;
