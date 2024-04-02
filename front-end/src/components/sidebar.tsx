import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, LogOut, Loader2 } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { useGetConversation, useLogout } from "@/hooks";
import { useConversationStore } from "@/store/conversation.store.ts";
import { useToast } from "@/components/ui/use-toast.ts";
import { useSocketContext } from "@/context/socket.context.tsx";
import { Badge } from "@/components/ui/badge";

interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isCollapsed: boolean;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isLoading, isCollapsed, className, ...props }) => {
  const { logout, loading: loadingLogout } = useLogout();
  const { selectedConversation, setSelectedConversation, unreadMessages } = useConversationStore();
  const { conversations } = useGetConversation();
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const { onlineUsers } = useSocketContext();


  const handleSearch = () => {
    if (search.length < 3) {
      return toast({
        description: "Search must be at least 3 characters long.",
        variant: "info",
        duration: 3000
      });
    }

    const conversation = conversations.find((c) => c.fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast({
        description: "No such user found.",
        variant: "info",
        duration: 3000
      });
    }

  };

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn("relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2", className)}
      {...props}
    >
      {!isCollapsed && (
        <>
          <div className="flex justify-between p-2 items-center flex-wrap gap-4">
            <div className="flex gap-2 items-center text-2xl">
              <p className="font-medium">Chats</p>
              {/*<span className="text-zinc-300">(20)</span>*/}
            </div>

            <div className="flex gap-2">
              <ModeToggle />
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={logout}
                      aria-label="toggle theme"
                    >
                      {loadingLogout ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
                        <LogOut className="h-4 w-4 rotate-180" />}

                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </div>
            <div className="flex gap-2 w-full justify-stretch items-center hover:cursor-pointer">
              <Input
                id="search"
                placeholder="Search"
                value={search}
                className={"text-lg"}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search onClick={handleSearch} />
            </div>
          </div>
          <hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        </>
      )}
      <nav
        className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 overflow-y-auto overflow-x-hidden">
        {
          isLoading && <div className="flex justify-center items-center h-20">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        }
        {conversations.map((conversation) =>
          isCollapsed ? (
            <TooltipProvider key={conversation._id}>
              <Tooltip key={conversation._id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    onClick={() => setSelectedConversation(conversation)}
                    className={cn(
                      "h-11 w-11 md:h-16 md:w-16 bg-primary-foreground",
                      conversation._id === selectedConversation?._id && "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={conversation.picture}
                        alt={conversation.fullName + conversation.username}
                        width={6}
                        height={6}
                        className="w-10 h-10"
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{conversation.fullName}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {conversation.fullName}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              key={conversation._id}
              size="lg"
              variant="outline"
              onClick={() => setSelectedConversation(conversation)}
              className={cn(
                conversation._id === selectedConversation?._id &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                "justify-start gap-4 h-20"
              )}
            >
              <div className="relative">
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={conversation.picture}
                    alt={conversation.fullName + conversation.username}
                    width={6}
                    height={6}
                    className="w-10 h-10 "
                  />
                </Avatar>
                {onlineUsers.includes(conversation._id) &&
                  <span className="absolute top-0 right-0 bg-green-600 w-2.5 h-2.5 rounded-full border border-white" />}
              </div>
              <div className="flex w-full text-left justify-between">
                <span>{conversation.fullName}</span>
                {unreadMessages[conversation._id] && <Badge>{unreadMessages[conversation._id]}</Badge>}

                {/*{link.messages.length > 0 && (*/}
                {/*  <span className="text-zinc-300 text-xs truncate ">*/}
                {/*    {link.messages[link.messages.length - 1].name.split(" ")[0]}*/}
                {/*    : {link.messages[link.messages.length - 1].message}*/}
                {/*  </span>*/}
                {/*)}*/}
              </div>
            </Button>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
