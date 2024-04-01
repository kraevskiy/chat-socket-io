import { useState } from "react";
import { APIErrorType, APIUserType } from "@/types/api.types.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { LoginSchema } from "@/types/login.types.ts";
import { useUserStore } from "@/store/user.store.ts";

type UseLoginType = {
  loading: boolean;
  login: (data: LoginSchema) => Promise<void | APIErrorType>;
}

export const useLogin = (): UseLoginType => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setUser } = useUserStore();

  const login = async (data: LoginSchema) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const resData: APIUserType | APIErrorType = await res.json();
      if ('error' in resData) {
        toast({
          title: resData.error,
          variant: "destructive",
          duration: 3000
        });
        return resData;
      }
      localStorage.setItem('chat-user', JSON.stringify(resData))
      setUser(resData);
      toast({
        title: `Welcome ${resData.fullName}`,
        duration: 3000
      });
    } catch (e) {
      if (e && typeof e === "object" && "error" in e && typeof e.error === 'string') {
        toast({
          title: e.error,
          variant: "destructive",
          duration: 3000
        });
      }
      console.log(e);
    } finally {
      setLoading(false)
    }
  }

  return {loading, login};
}
