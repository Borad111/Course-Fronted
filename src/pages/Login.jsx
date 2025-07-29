import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [SignupInput, SetSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [LoginInput, SetLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerdata,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  useEffect(() => {
    console.log("okkk")
    if(registerIsSuccess && registerdata){
      console.log("registerdata successfully");
      toast.success(registerdata.message || "register success");
    }
    if(registerError){
      toast.error(registerError.data?.message || "register error");
    }
    
  }, [registerdata, registerIsLoading, registerError, registerIsSuccess]);

  useEffect(()=>{
    if(loginIsSuccess && loginData){
      console.log("logindata successfully");
      toast.success(loginData.message || "login success");

      setTimeout(() => {
        navigate("/");
      }, 1500); // Wait for 1.5 seconds before navigating
    
      // navigate("/")
    }
    if(loginError){
      toast.error(loginError.data?.message || "login error");
    }
  },[loginData,loginError,loginIsSuccess])
  const navigate=useNavigate();
  const ChangeInputHandler = (e, type) => {
    const { name, value } = e.target; 
    if (type === "signup") {
      SetSignupInput({ ...SignupInput, [name]: value });
    } else {
      SetLoginInput({ ...LoginInput, [name]: value });
    }
  };

  const HandleAuthentication = async (type) => {
    const InputData = type === "signup" ? SignupInput : LoginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(InputData);
    console.log(InputData);
  };
  
  return (
    <div className="flex  justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create n new Account and click signup when you're Done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => ChangeInputHandler(e, "signup")}
                  name="name"
                  value={SignupInput.name}
                  type="text"
                  placeholder="Ex. Patel"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  onChange={(e) => ChangeInputHandler(e, "signup")}
                  name="email"
                  value={SignupInput.email}
                  type="email"
                  placeholder="abc07@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={SignupInput.password}
                  onChange={(e) => ChangeInputHandler(e, "signup")}
                  placeholder="*******"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => HandleAuthentication("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2>please wait ... </Loader2>
                  </>
                ) : (
                  "signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login and password here.After signup you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  onChange={(e) => ChangeInputHandler(e, "login")}
                  name="email"
                  value={LoginInput.email}
                  type="email"
                  placeholder="abc02@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new"> password</Label>
                <Input
                  onChange={(e) => ChangeInputHandler(e, "login")}
                  name="password"
                  value={LoginInput.password}
                  type="password"
                  placeholder="*********"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => HandleAuthentication("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    please wait...
                  </>
                ) : (
                  "login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
