"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ModelCreateRequested from "@/components/ai-studio/model-create/model-create-requested/ModelCreateRequested";

function Requested() {
  const router = useRouter();
  useEffect(() => {
    const timeoutMove = setTimeout(() => {
      router.push("/ai-studio");
    }, 4000);
  }, []);
  return <ModelCreateRequested />;
}

export default Requested;
