import { Loader2 } from "lucide-react";

const Loader: React.FC = () => {

  return (
    <div className="flex justify-center items-center h-20">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default Loader;
