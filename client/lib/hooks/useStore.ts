import { useState, useEffect } from "react";
import { StoreApi } from "zustand";

const useStore = <T, F>(store: StoreApi<T>, selector: (state: T) => F) => {
  const [data, setData] = useState<F>(selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      setData(selector(state));
    });

    return () => {
      unsubscribe();
    };
  }, [store, selector]);

  return data;
};

export default useStore;
