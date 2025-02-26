import { useState, useEffect } from "react";
import { Storage } from "@plasmohq/storage";

const useStorage = (): boolean => {
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const storage = new Storage({ area: "sync" });
      const data: Record<string, string> | undefined = await storage.get("BojUserMemo");
      setFlag(data !== undefined);
    };

    fetchData();
  }, []);

  return flag;
};

export default useStorage;