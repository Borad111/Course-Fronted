import { Menu, School, Store } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DarkMode } from "@/pages/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
function Navbar() {
  const { user } = useSelector((Store) => Store.auth);
  const [UserLogout, { data, isSuccess, error, isLoading }] =
    useUserLogoutMutation();
  const navigate = useNavigate();
  const [isDropdownopen, SetDropDownOpen] = useState(false);

  const LogoutHandler = async () => {
    await UserLogout();
  };
  console.log(user);
  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data.message || " Logout Successfully");
      navigate("/login");
    }
    if (error) {
      toast.error(error.message || "Logout UnSuccessfully");
    }
  }, [isSuccess, isSuccess, error]);

  const closeDropdown = () => {
    SetDropDownOpen(false);
  };

  return (
 <div
  style={{
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)",
  }}
  className="h-16 dark:bg-[#071120] bg-white dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10 duration-300 px-[5%]"
>
  {/* Desktop View */}
  <div className="max-w-[1920px] mx-auto hidden md:flex justify-between items-center h-full w-full">
    {/* Left Side - Logo with equal padding */}
    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-2 cursor-pointer"
    >
      <School size={"30"} />
      <h1 className="font-extrabold text-2xl whitespace-nowrap">E-Learning</h1>
    </div>

    {/* Right Side Menu */}
    <div className="flex items-center gap-4 md:gap-6">
      {user ? (
        <DropdownMenu open={isDropdownopen} onOpenChange={SetDropDownOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                className="cursor-pointer"
                src={user.photoURL || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={closeDropdown}>
                <Link to="/MyLearing">My Learning</Link>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={closeDropdown}>
                <Link to="Profile">Edit Profile</Link>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={LogoutHandler}>
                Logout
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {user.role == "admin" && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    DashBoard
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          {/* <Button onClick={() => navigate("/login")} variant="outline">
            Sign Up
          </Button> */}
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      )}
      <DarkMode />
    </div>
  </div>

  {/* Mobile View */}
<div className="md:hidden flex justify-between items-center h-full px-4">
  <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
    <School size={"24"} />
    <h1 className="font-extrabold text-xl">E-Learning</h1>
  </div>
  
  <div className="flex items-center gap-4">
    <DarkMode />
    {user && <MobileNavbar />} {/* Only show MobileNavbar when user is logged in */}
    {!user && (
      <div className="flex gap-2">
        {/* <Button onClick={() => navigate("/login")} variant="outline" size="sm">
          Sign Up
        </Button> */}
        <Button onClick={() => navigate("/login")} size="sm">
          Login
        </Button>
      </div>
    )}
  </div>
</div>
</div>
  );
}

export default Navbar;

const MobileNavbar = () => {
  const { user } = useSelector((Store) => Store.auth);
  const [UserLogout, { isLoading }] = useUserLogoutMutation();
  const navigate = useNavigate();
  const [isDropdownopen, SetDropDownOpen] = useState(false);

  const LogoutHandler = async () => {
    try {
      const data = await UserLogout().unwrap();
      toast.success(data?.message || "Logout Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Logout Unsuccessful");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    document.getElementById("mobile-menu-trigger")?.click();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          id="mobile-menu-trigger"
          size="icon"
          className="rounded-full hover:bg-black hover:text-white transition-colors duration-300 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[85%] max-w-[320px]">
        <SheetHeader className="flex flex-row items-center justify-between pt-6 pb-4 border-b dark:border-b-gray-700">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <School size={24} />
            <SheetTitle className="font-extrabold text-xl">E-Learning</SheetTitle>
          </div>
          {/* <DarkMode /> */}
        </SheetHeader>
        
        <nav className="flex flex-col gap-1 py-4">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                className="w-full justify-start h-12 text-left"
                onClick={() => handleNavigation("/MyLearing")}
              >
                My Learning
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start h-12 text-left"
                onClick={() => handleNavigation("/Profile")}
              >
                Edit Profile
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start h-12 text-left text-red-500 hover:text-red-600"
                onClick={LogoutHandler}
                disabled={isLoading}
              >
                {isLoading ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="w-full justify-start h-12 text-left"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>
              {/* <Button 
                variant="outline" 
                className="w-full justify-start h-12 text-left"
                onClick={() => handleNavigation("/signup")}
              >
                Sign Up
              </Button> */}
            </>
          )}
        </nav>

        {user?.role === "admin" && (
          <div className="mt-auto pt-4 border-t dark:border-t-gray-700">
            <Button 
              variant="default" 
              className="w-full" 
              onClick={() => handleNavigation("/admin")}
            >
              Admin Dashboard
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
