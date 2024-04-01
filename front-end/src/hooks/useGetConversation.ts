import { useEffect, useState } from "react";
import { APIErrorType, APIUsersType } from "@/types/api.types.ts";
import { useToast } from "@/components/ui/use-toast.ts";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<APIUsersType>([]);
  const { toast } = useToast();

  useEffect(() => {
    const getConversation = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users");
        const data: APIUsersType | APIErrorType = await res.json();
        if ("error" in data) {
          console.error(data.error);
          toast({
            title: data.error,
            variant: "destructive",
            duration: 3000
          });
        } else {
          setConversations(data);
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
    getConversation();
  }, []);


  return { loading, conversations };

};

export default useGetConversation;
