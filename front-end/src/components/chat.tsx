import { lazy, Suspense, useEffect } from "react";
import { MessagesSquare } from "lucide-react";
import { useConversationStore } from "@/store/conversation.store.ts";
import Loader from "@/components/loader.tsx";

const ChatTopbar = lazy(() => import("@/components/chat-topbar.tsx"));
const ChatList = lazy(() => import("@/components/chat-list.tsx"));

interface ChatProps {
}

const Chat: React.FC<ChatProps> = () => {
  const { selectedConversation, setSelectedConversation } = useConversationStore();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <div className="flex flex-col justify-between w-full h-full">

      {
        selectedConversation ? <>
          <Suspense fallback={<Loader />}>
            <ChatTopbar selectedUser={selectedConversation} />
            <ChatList
              selectedUser={selectedConversation}
            />
          </Suspense>
        </> : <NoChatSelected />
      }
    </div>
  );
};

const NoChatSelected = () => {
  return (
    <div className="flex items-center w-full h-full p-10 justify-center">
      <div className="px-4 text-center sm:text-xl font-semibold flex flex-col items-center gap-2">
        <p>Welcome</p>
        <p>Select a chat to start messaging</p>
        <p><MessagesSquare className="w-16 h-16" /></p>
      </div>
    </div>
  );
};

export default Chat;
