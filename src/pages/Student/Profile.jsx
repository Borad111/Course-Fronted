import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Profile() {
  const navigate=useNavigate();
  // const {isAuthenticated}=useSelector((state)=>state.authSlice)
  const [name, SetName] = useState("");
  const [profilePhoto, SetProfilePhoto] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const { data, isLoading,refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: UpdateuserData,
      error: UpdateUserError,
      isLoading: UpdateUserIsLoading,
      isSuccess: UpdateUserIsSucccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e, type) => {
    if (type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        SetProfilePhoto(file);
      }
    }
    if(type === "name"){
      SetName(e.target.value);
    }
  };

 
  const user = data?.user;

  const updateUserHandler = async() => {
    const formdata=new FormData();
    formdata.append("name",name);
    formdata.append("profilePhoto",profilePhoto);
    await updateUser(formdata);
  };


  useEffect(()=>{
    refetch();
  },[])
  useEffect(()=>{
    
    if(UpdateUserIsSucccess && UpdateuserData){
      console.log("Update Successfully");
      refetch();
      toast.success(UpdateuserData.message || "Update Successfully") ;
      setIsDialogOpen(false); 
    }
    if(UpdateUserError){
      console.log("Error in Update User")
      toast.error(UpdateUserError.message || "Error in Update User") ;
    }
  },[UpdateUserError,UpdateuserData,UpdateUserIsSucccess])

  if (isLoading) {
    return <h1>Profile Loading </h1>;
  }
  return (
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
  {/* Profile Section */}
  <h1 className="font-bold text-2xl md:text-left text-center mt- mb-6 md:mb-8">Profile</h1>
  
  <div className="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-8 w-full">
    {/* Avatar Section */}
    <div className="w-full max-w-[200px] flex flex-col items-center">
      <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-md">
        <AvatarImage
          className="rounded-lg"
          src={user?.photoURL || "https://github.com/shadcn.png"}
          alt="@shadcn"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>

    {/* User Info Section */}
    <div className="w-full px-2 sm:px-0">
      <div className="space-y-3">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <h1 className="font-semibold text-gray-900 dark:text-gray-300">
            Name: <span className="font-normal">{user?.name}</span>
          </h1>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <h1 className="font-semibold text-gray-900 dark:text-gray-300">
            Email: <span className="font-normal">{user?.email}</span>
          </h1>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <h1 className="font-semibold text-gray-900 dark:text-gray-300">
            Role: <span className="font-normal">{user?.role}</span>
          </h1>
        </div>

        <Dialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button size="sm" className="mt-3 w-full md:w-auto">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] dark:shadow-lg dark:shadow-white sm:max-w-md rounded-lg">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-semibold">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => onChangeHandler(e, "name")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profilePhoto" className="font-semibold">Profile Photo</Label>
                <Input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChangeHandler(e, "file")}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                disabled={UpdateUserIsLoading} 
                onClick={updateUserHandler}
                className="w-full sm:w-auto"
              >
                {UpdateUserIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>

  {/* Enrolled Courses Section */}
  <div className="mt-12 md:mt-16">
    <h1 className="font-bold text-2xl mb-6">Enrolled Courses</h1>
    {user.enrollCourses.length === 0 ? (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
        <h1>You haven't enrolled in any courses yet</h1>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
        {user.enrollCourses.map((data) => (
          <Course course={data} key={data._id} />
        ))}
      </div>
    )}
  </div>
</div>
  );
}

export default Profile;
