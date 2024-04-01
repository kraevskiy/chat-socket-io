import { useState } from "react";
import { useConversationStore } from "@/store/conversation.store.ts";
import { APIMessageType } from "@/types/api.types.ts";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation, messages } = useConversationStore();

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch(`api/messages/send/${selectedConversation?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });
      const data: APIMessageType = await res.json();

      setMessages([...messages, data]);

    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {loading, sendMessage}
};

export default useSendMessage;
