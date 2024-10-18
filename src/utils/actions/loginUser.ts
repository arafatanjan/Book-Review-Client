"use server"

 import { UserData } from "@/app/register/page";

export const loginUser= async(data: UserData) => {
    const res=await fetch(`${process.env.BACKEND_URL}/login`,{
        method: 'POST',
        headers:{
            'content-Type':"application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store"
    });
    const userInfo= await res.json();
    return userInfo
} 