import { DetailedHTMLProps, HTMLAttributes } from "react";
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
import { useLogout } from "@/hooks";

interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isCollapsed: boolean;
}

export const userData = [
  {
    id: 1,
    avatar: "https://avatar.iran.liara.run/public/boy",
    messages: [
      {
        id: 1,
        avatar: "https://avatar.iran.liara.run/public/boy",
        name: "Jane Doe",
        message: "Hey, Jakob"
      },
      {
        id: 2,
        avatar: "https://avatar.iran.liara.run/public/boy",
        name: "Jakob Hoeg",
        message: "Hey!"
      },
      {
        id: 3,
        avatar: "https://avatar.iran.liara.run/public/boy",
        name: "Jane Doe",
        message: "How are you?"
      },
      {
        id: 4,
        avatar: "https://avatar.iran.liara.run/public/boy",
        name: "Jakob Hoeg",
        message: "I am good, you?"
      },
      {
        id: 5,
        avatar: "https://avatar.iran.liara.run/public/boy",
        name: "Jane Doe",
        message: "I am good too!"
      },
      {
        id: 6,
        avatar: "https://avatar.iran.liara.run/public/boy",
        name: "Jakob Hoeg",
        message: "That is good to hear!"
      },
      {
        id: 7,
        avatar: "https://avatar.iran.liara.run/public/boy",
        name: "Jane Doe",
        message: "How has your day been so far?"
      },
      {
        id: 8,
        avatar: "https://avatar.iran.liara.run/public/boy",
        name: "Jakob Hoeg",
        message: "It has been good. I went for a run this morning and then had a nice breakfast. How about you?"
      },
      {
        id: 9,
        avatar: "https://avatar.iran.liara.run/public/boy",
        name: "Jane Doe",
        message: "I had a relaxing day. Just catching up on some reading."
      }
    ],
    name: "Jane Doe"
  },
  {
    id: 2,
    avatar: "https://avatar.iran.liara.run/public/boy",
    name: "John Doe"
  },
  {
    id: 3,
    avatar: "https://avatar.iran.liara.run/public/boy",
    name: "Elizabeth Smith"
  },
  {
    id: 4,
    avatar: "https://avatar.iran.liara.run/public/boy",
    name: "John Smith"
  }
];

const links = userData.map((user) => ({
  name: user.name,
  messages: user.messages ?? [],
  avatar: user.avatar,
  variant: "grey"
}));

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, className, ...props }) => {
  const { logout, loading } = useLogout();
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
              <span className="text-zinc-300">(20)</span>
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
                    >
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :
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
              <Input id="search" placeholder="Search" />
              <Search />
            </div>
          </div>
          <hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
        </>
      )}
      <nav
        className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 overflow-y-auto overflow-x-hidden">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className={cn(
                      "h-11 w-11 md:h-16 md:w-16",
                      link.variant === "grey" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={link.avatar}
                        alt={link.avatar}
                        width={6}
                        height={6}
                        className="w-10 h-10"
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{link.name}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              key={index}
              size="lg"
              variant="outline"
              className={cn(
                // link.variant === "grey" &&
                // "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                "justify-start gap-4 h-20"
              )}
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={link.avatar}
                  alt={link.avatar}
                  width={6}
                  height={6}
                  className="w-10 h-10 "
                />
              </Avatar>
              <div className="flex flex-col max-w-28 text-left">
                <span>{link.name}</span>
                {link.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {link.messages[link.messages.length - 1].name.split(" ")[0]}
                    : {link.messages[link.messages.length - 1].message}
                  </span>
                )}
              </div>
            </Button>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
