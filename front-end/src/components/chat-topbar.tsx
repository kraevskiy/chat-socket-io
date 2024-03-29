import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { UserData } from "@/data.tsx";

interface ChatTopbarProps {
  selectedUser: UserData;
}

const ChatTopbar: React.FC<ChatTopbarProps> = ({selectedUser}) => {

  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedUser.avatar}
            alt={selectedUser.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>
    </div>
  );
};

export default ChatTopbar;
