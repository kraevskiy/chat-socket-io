
import {
  SendHorizontal,
  ThumbsUp
} from "lucide-react";
import { useRef, useState } from "react";
import { loggedInUserData, Message } from "@/data.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea.tsx";
import EmojiPicker from "./emoji-picker";
import { Button } from "@/components/ui/button.tsx";

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

const ChatBottombar: React.FC<ChatBottombarProps> = ({
  sendMessage,
}) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const newMessage: Message = {
      id: message.length + 1,
      name: loggedInUserData.name,
      avatar: loggedInUserData.avatar,
      message: "👍",
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: message.length + 1,
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className="w-full border flex items-center h-5 resize-none overflow-hidden bg-background"
          ></Textarea>
          <div className="absolute right-2 bottom-0.5  ">
            <EmojiPicker onChange={(value) => {
              setMessage(message + value)
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }} />
          </div>
        </motion.div>

        {message.trim() ? (
          <Button
            size="icon"
            variant="outline"
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="outline"
            onClick={handleThumbsUp}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBottombar;
