import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInputs, LoginSchema } from "@/types/login.types.ts";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { useLogin } from "@/hooks/useLogin.ts";
import { cn } from "@/lib/utils.ts";

const Login = () => {
  const [password, setPassword] = useState(true);
  const { loading, login } = useLogin();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginInputs),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const submitHandler = async (data: LoginSchema) => {
    const res = await login(data);
    if (typeof res === 'object') {
      form.setError(res.field as keyof LoginSchema, {})
      form.setFocus(res.field as keyof LoginSchema);
    }
  };

  const isActive = (active: boolean) => active ? ` -rotate-90 scale-0` : " -rotate-0 scale-1";

  return (
    <div className="w-[400px] max-w-[100%] relative">
      <div
        className="absolute -inset-2 bg-gradient-to-r from-pink-400 dark:from-pink-600 to-purple-400 dark:to-purple-600 rounded-lg blur-md opacity-50 animate-tilt" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <Card className="relative">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Fill the form to login.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        autoComplete="username"
                        placeholder="super_angle" {...field}
                        className={cn("text-lg", fieldState.error && "border-red-400")}
                      />
                    </FormControl>
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={loading}
                          autoComplete="current-password"
                          type={password ? "password" : "text"}
                          placeholder={password ? "******" : "------"}
                          className={cn("text-lg", fieldState.error && "border-red-400")}
                          {...field}
                        />
                        <span
                          className="absolute top-[50%] right-2 translate-y-[-50%]"
                          onClick={() => setPassword(!password)}
                        >
                            <Eye className={`transition-all h-[1.2rem] w-[1.2rem]${isActive(!password)}`} />
                            <EyeOff
                              className={`absolute transition-all h-[1.2rem] w-[1.2rem] top-0${isActive(password)}`} />
                          </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )} />
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap">
              <Link to="/signup" className="text-xs hover:underline mb-3 md:mb-0">
                Don't have an account?
              </Link>
              <Button className="w-full md:w-auto" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default Login;
