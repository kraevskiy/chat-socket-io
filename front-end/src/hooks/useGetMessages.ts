import { useEffect, useState } from "react";
import { useConversationStore } from "@/store/conversation.store.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { APIErrorType, APIMessageType } from "@/types/api.types.ts";

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { selectedConversation, setMessages, messages } = useConversationStore();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation?._id}`);

        const data: APIMessageType[] | APIErrorType = await res.json();
        if ("error" in data) {
          toast({
            title: data.error,
            variant: "destructive",
            duration: 3000
          });
        } else {
          setMessages(data);
        }
      } catch (e) {
        if (e && typeof e === "object" && "error" in e && typeof e.error === "string") {
          toast({
            title: e.error,
            variant: "destructive",
            duration: 3000
          });
        }
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

