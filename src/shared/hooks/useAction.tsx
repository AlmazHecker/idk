import { useState, useCallback } from "react";

const useAction = (func: () => Promise<unknown>) => {
  const [isLoading, setIsLoading] = useState(false);

  const executeAction = useCallback(async () => {
    setIsLoading(true);

    await func();

    setIsLoading(false);
  }, [func]);

  return { isLoading, executeAction };
};

export default useAction;
