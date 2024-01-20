"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance, setAuthToken } from '../../api/api';
import { UserDataState } from '@/interface/interface';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Badge } from '@/components/ui/badge';
import { CiPhone } from "react-icons/ci";
import { PiGenderIntersexLight } from "react-icons/pi";
import { Button } from '@/components/ui/button';
import { IoIosShareAlt } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { RxCopy } from "react-icons/rx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Loader from '@/components/Loader';
import { useToast } from "@/components/ui/use-toast"

export default function Profile() {
  const { toast } = useToast()
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<UserDataState | null>(null);
  const [userURI, setUserURI] = useState(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Set the auth token from localStorage
        const token = localStorage.getItem('authToken');
        setAuthToken(token);

        // Make a request to fetch the user profile by ID
        const response = await axiosInstance.get(`/users/${id}`);
        setUserProfile(response.data);
      } catch (error) {
        // Handle error, e.g., redirect to login if unauthorized
        console.error('Error fetching user profile:', error);
        window.location.href = `/auth/login`;
      }
    };
    
    fetchUserProfile();
  }, [id]); 
  
  const copyToClipboard = (text:string) => {
    navigator.clipboard.writeText(text)
    .then(() => {
      toast({
        title: "🔥🔥🔥",
        description: "Your Content Successfully Copied.",
      });
    })
    .catch((err) => {
      console.error('Unable to copy text to clipboard:', err);
    });
  };
  
  if (!userProfile) {
    return <Loader/>;
  }

  console.log(userProfile.picturePath)
  
  return (
    <section className='h-full w-full flex flex-col justify-start items-center p-5'>
      <div className='flex justify-start items-start w-full gap-5 border rounded-lg p-6'>
        <Avatar>
          <AvatarImage className='min-w-44 h-44 border' src={`http://localhost:8080/${userProfile.picturePath}`} alt={`@${userProfile.firstName}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='w-full flex justify-between'>
          <div className='w-fit flex flex-col'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {userProfile.firstName}{" "}{userProfile.lastName}
            </h1>
            <p className="text-md flex items-center gap-2 text-muted-foreground">
              {userProfile.occupation || "NONE"}
            </p>
            <Badge onClick={()=>copyToClipboard(userProfile.email)} variant={"secondary"} className='w-fit my-1 cursor-crosshair'>{userProfile.email}</Badge>
            <p className="text-sm flex items-center gap-2 text-muted-foreground">
              <MdOutlineWorkOutline size={15}/> {userProfile.worksAt || "NONE"}
            </p>
            <p className="text-sm flex items-center gap-2 text-muted-foreground">
              <IoLocationOutline size={15}/> {userProfile.location || "NONE"}
            </p>
            <p className="text-sm flex items-center gap-2 text-muted-foreground">
              <CiPhone size={15}/> {userProfile.phone || "NONE"}
            </p>
            <p className="text-sm flex items-center gap-2 text-muted-foreground">
              <PiGenderIntersexLight size={15}/> {userProfile.sex || "NONE"}
            </p>
          </div>
        </div>
        <div className='flex w-fit gap-2 rounded-lg'>
          <Button className='rounded-full w-16 h-16' variant={"secondary"}><TbEdit size={25}/></Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={(e:any)=>setUserURI(e.target.baseURI)}className='rounded-full w-16 h-16' variant={"secondary"}><IoIosShareAlt size={25} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Your BCAD Link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view your profile.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={userURI ?? ""}
                    readOnly
                  />
                </div>
                <Button variant={"secondary"} onClick={()=>{
                  navigator.clipboard.writeText(userURI ?? "")
                  toast({
                    title: "Copied!",
                    description: "Success!",
                  })
                  }} size="sm" className="px-3">
                  <RxCopy className="h-4 w-4" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        ---
      </div>
    </section>
  );
}



