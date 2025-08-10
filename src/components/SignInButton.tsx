'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut, User } from "lucide-react";

const SignInButton = () => {
    const { data: session } = authClient.useSession()
    
    return (
        <>
        
        {
            session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Avatar>
                <AvatarImage src={session?.user?.image || 'https://github.com/shadcn.png'} />
                <AvatarFallback>
                  <span className="text-sm font-semibold uppercase">
                    {session?.user?.name?.split(" ")[0][0]}
                  </span>
                </AvatarFallback>
              </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{
              authClient.signOut()
            }} className="text-red-500 focus:text-red-500 cursor-pointer flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
              </DropdownMenu>
          
            ):(
              <Button asChild>
            <Link href={'/signin'}>
                Sign In
            </Link>
        </Button>
            )
            }
        </>
    )
}

export default SignInButton