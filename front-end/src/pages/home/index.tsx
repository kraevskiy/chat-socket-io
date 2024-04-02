import { Card } from "@/components/ui/card.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import { lazy, Suspense, useEffect, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { useGetConversation, useListenMessages } from "@/hooks";
import Loader from "@/components/loader.tsx";

const Chat = lazy(() => import("@/components/chat.tsx"));
const Sidebar = lazy(() => import("@/components/sidebar.tsx"));

const Home = () => {
  const defaultLayout = [320, 480];
  const navCollapsedSize = 8;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { loading } = useGetConversation();
  useListenMessages();

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div className="w-[1200px] max-w-[100%] relative h-full">
      <Card className="relative flex-row h-full">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-full items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={isMobile ? 0 : 24}
            maxSize={isMobile ? 8 : 30}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                true
              )}`;
            }}
            onExpand={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                false
              )}`;
            }}
            className={cn(
              isCollapsed && "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
            )}
          >
            <Suspense fallback={<Loader />}>
              <Sidebar
                isCollapsed={isCollapsed || isMobile}
                isLoading={loading}
              />
            </Suspense>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <Suspense fallback={<Loader />}>
              <Chat />
            </Suspense>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
};

export default Home;
