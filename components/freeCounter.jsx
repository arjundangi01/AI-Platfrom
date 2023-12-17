
import { useEffect, useState } from "react";


// import { useProModal } from "@/hooks/use-pro-modal";

export const FreeCounter =  ({
  isPro = false,
  apiLimitCount = 0,
}) => {
  const [mounted, setMounted] = useState(false);
//   const proModal = useProModal();
//   const proModal = useProModal();
//   const proModal = useProModal();
//   const proModal = useProModal();
//   const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  

  if (isPro) {
    return null;
  }

  return (
    <div className="px-3">
      
    </div>
  )
}