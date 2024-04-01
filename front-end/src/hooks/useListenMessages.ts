import { useSocketContext } from "@/context/socket.context.tsx";
import { useConversationStore } from "@/store/conversation.store.ts";
import { useEffect } from "react";
import soundIn from "@/assets/sounds/message-in.mp3";
import { useToast } from "@/components/ui/use-toast.ts";

export const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, setUnreadMessages, unreadMessages, selectedConversation } = useConversationStore();
  const {toast} = useToast();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(soundIn);
      sound.play();
      setMessages([...messages, newMessage]);
      if (selectedConversation?._id !== newMessage.senderId) {
        toast({
          title: 'You have new message',
          duration: 2000
        });
        const newUnreadMessages = {...unreadMessages};
        newUnreadMessages[newMessage.senderId] = newUnreadMessages[newMessage.senderId] ? ++newUnreadMessages[newMessage.senderId] : 1;
        setUnreadMessages(newUnreadMessages);
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);

};
