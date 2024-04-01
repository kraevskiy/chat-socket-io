import { useState } from "react";
import { APIAnswerType } from "@/types/api.types.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { useAuthContext } from "@/context/AuthContext.tsx";

type UseLogoutType = {
  loading: boolean;
  logout: () => Promise<void>;
}

export const useLogout = (): UseLogoutType => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data: APIAnswerType | Response = await res.json();
      if ("error" in data) {
        console.error(data.error);
      }
      if ("message" in data) {
        localStorage.removeItem("chat-user");
        setAuthUser(null);
        toast({
          title: data.message,
          duration: 3000
        });
      }
    } catch (e) {
      if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
        toast({
          title: typeof e.message === "string" ? e.message : "Something went wrong",
          variant: "destructive",
          duration: 3000
        });
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    logout
  };
};
