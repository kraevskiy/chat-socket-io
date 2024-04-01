import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import { APIUsersTypeItem } from "@/types/api.types.ts";

interface ChatTopbarProps {
  selectedUser: APIUsersTypeItem;
}

const ChatTopbar: React.FC<ChatTopbarProps> = ({selectedUser}) => {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedUser.picture}
            alt={selectedUser.fullName}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.fullName}</span>
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>
    </div>
  );
};

export default ChatTopbar;
