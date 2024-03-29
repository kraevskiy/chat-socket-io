import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"

const Login = () => {
  const [password, setPassword] = useState(true);

  const isActive = (active: boolean) => active ? ` -rotate-90 scale-0` : ' -rotate-0 scale-1';

  return (
    <div className="w-[400px] max-w-[100%] relative">
      <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 dark:from-pink-600 to-purple-400 dark:to-purple-600 rounded-lg blur-md opacity-50 animate-tilt"/>
      <Card className="relative">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Fill the form to login.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="john"/>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={password ? "password" : "text"} placeholder={password ? '******' : '------'}/>
                  <span className="absolute top-[50%] right-2 translate-y-[-50%]" onClick={() => setPassword(!password)}>
                    <Eye className={`transition-all h-[1.2rem] w-[1.2rem]${isActive(!password)}`}/>
                    <EyeOff className={`absolute transition-all h-[1.2rem] w-[1.2rem] top-0${isActive(password)}`}/>
                  </span>
                </div>
              </div>

            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap">
          <Button variant="link" size="sm" className="text-xs mb-3 md:mb-0 p-0">Don't have an account?</Button>
          <Button className="w-full md:w-auto">Log In</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
