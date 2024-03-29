import ChatTopbar from "@/components/chat-topbar.tsx";
import ChatList from "@/components/chat-list.tsx";
import { Message, UserData } from "@/data.tsx";
import { useState } from "react";
import {MessagesSquare} from "lucide-react";

interface ChatProps {
  messages?: Message[];
  selectedUser?: UserData;
  isMobile: boolean;
}
const Chat: React.FC<ChatProps> = ({selectedUser, isMobile, messages}) => {
  const [messagesState, setMessages] = useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {
        selectedUser ? <>
          <ChatTopbar selectedUser={selectedUser}/>
          <ChatList
            messages={messagesState}
            selectedUser={selectedUser}
            sendMessage={sendMessage}
            isMobile={isMobile}
          />
        </> : <NoChatSelected />
      }
    </div>
  );
};

const NoChatSelected = () => {
  return (
    <div className="flex items-center w-full h-full p-10">
      <div className="px-4 text-center sm:text-xl font-semibold flex flex-col items-center gap-2">
        <p>Welcome</p>
        <p>Select a chat to start messaging</p>
        <p><MessagesSquare className="w-16 h-16"/></p>
      </div>
    </div>
  )
}

export default Chat;
