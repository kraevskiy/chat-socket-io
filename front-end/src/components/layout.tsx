import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils.ts";

interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const Layout: React.FC<LayoutProps> = ({className, children, ...props}) => {

  return (
    <div
      className={cn('flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-20 relative ', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Layout;
