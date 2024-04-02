import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils.ts";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import ChatBottombar from "./chat-bottombar";
import { APIUsersTypeItem } from "@/types/api.types.ts";
import { useUserStore } from "@/store/user.store.ts";
import { extractTimeUtil } from "@/utils/extract-time.util.ts";
import { useGetMessages } from "@/hooks";
import { useConversationStore } from "@/store/conversation.store.ts";

interface ChatListProps {
  selectedUser: APIUsersTypeItem;
}

const ChatList: React.FC<ChatListProps> = ({
  selectedUser
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();
  const { messages } = useGetMessages();
  const { unreadMessages, setUnreadMessages } = useConversationStore();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (unreadMessages[selectedUser._id]) {
      const { [selectedUser._id]: _, ...otherMessages } = unreadMessages;
      setUnreadMessages(otherMessages);
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2
                }
              }}
              style={{
                originX: 0.5,
                originY: 0.5
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.senderId === user?._id ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {message.senderId !== user?._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={selectedUser.picture}
                      alt={selectedUser.fullName + selectedUser.username}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <div className={cn("flex flex-col", message.senderId === user?._id ? "items-end" : "items-start")}>
                  <span className="bg-accent p-3 rounded-md max-w-xs">
                    {message.message}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-700">
                    {extractTimeUtil(message.createdAt)}
                  </span>
                </div>
                {message.senderId === user?._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={user.picture}
                      alt={user.fullName + user.username}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar />
    </div>
  );
};

export default ChatList;
