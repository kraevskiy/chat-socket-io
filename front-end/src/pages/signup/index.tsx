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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupInputs, SignupSchema } from "@/types/signup.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useSignup } from "@/hooks";
import { cn } from "@/lib/utils.ts";

const Signup = () => {
  const [password, setPassword] = useState(true);
  const { signup, loading } = useSignup();
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupInputs),
    defaultValues: {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: ""
    }
  });
  const watchConfirmPassword = form.watch("confirmPassword");
  const watchPassword = form.watch("password");

  useEffect(() => {
    const passwordField = form.getFieldState("password");
    if (!passwordField.invalid && passwordField.isDirty && passwordField.isTouched) {
      const valuePassword = form.getValues("password");
      if (valuePassword !== watchConfirmPassword) {
        form.setError("confirmPassword", { message: "Password don't match" });
      } else {
        form.clearErrors("confirmPassword");
      }
    }
  }, [watchConfirmPassword, watchPassword]);

  const submitHandler = async (data: SignupSchema) => {
    const res = await signup(data);
    if (typeof res === 'object') {
      form.setError(res.field as keyof SignupSchema, {})
      form.setFocus(res.field as keyof SignupSchema);
    }
  };

  const isActive = (active: boolean) => active ? ` -rotate-90 scale-0` : " -rotate-0 scale-1";

  return (
    <div className="w-[400px] max-w-[100%] md:w-[800px] relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <div
            className="absolute -inset-2 bg-gradient-to-r from-pink-400 dark:from-pink-600 to-purple-400 dark:to-purple-600 rounded-lg blur-md opacity-50 animate-tilt" />
          <Card className="relative">
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Fill the form to signup.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            autoComplete="name"
                            placeholder="John Dee" {...field}
                            className={cn("text-lg", fieldState.error && "border-red-400")}
                          />
                        </FormControl>
                      </FormItem>
                    )} />
                </div>
                <div className="flex flex-col space-y-2">
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
                </div>
                <div className="flex flex-col space-y-2">
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
                </div>
                <div className="flex flex-col space-y-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>
                          Confirm password
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
                </div>

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Gender
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex gap-6 items-center"
                          disabled={loading}
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <FormLabel>
                              Male
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <FormLabel>
                              Female
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap">
              <Link to="/login" className="text-xs hover:underline mb-3 md:mb-0">
                Already have an account?
              </Link>
              <Button className="w-full md:w-auto" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
