import {
  useState,
  useEffect,
  useCallback,
  useContext,
  type SetStateAction,
  type DependencyList,
} from "react";

import { PubSubContext } from "./context";

export function usePubSub<T>(
  key: string,
  initialValue: T,
): [T, (value: SetStateAction<T>) => void];
export function usePubSub<T>(
  key: string,
): [T | undefined, (value: SetStateAction<T>) => void];
export function usePubSub<T>(
  key: string,
  initialValue?: T,
): [T | undefined, (value: SetStateAction<T>) => void] {
  const store = useContext(PubSubContext);
  if (!store) throw new Error("usePubSub must be used within PubSubProvider");

  const [state, setState] = useState<T | undefined>(() => {
    const current = store.getValue<T>(key);
    if (current !== undefined) return current;
    if (initialValue !== undefined) {
      store.setValue<T>(key, initialValue);
      return initialValue;
    }
    return undefined;
  });

  useEffect(() => {
    return store.subscribe<T>(key, setState);
  }, [store, key]);

  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      store.setValue<T>(key, value);
    },
    [store, key],
  );

  return [state, setValue];
}

export function usePubSubSubscription<T>(
  key: string,
  callback: (value: T) => void,
  deps: DependencyList = [],
): void {
  const store = useContext(PubSubContext);
  if (!store) {
    throw new Error("usePubSubSubscription must be used within PubSubProvider");
  }

  useEffect(() => {
    return store.subscribe<T>(key, callback);
  }, [store, key, ...deps]);
}

export type PubSubState<T> = [T, (value: SetStateAction<T>) => void];

export function createPubSub<T>(key: string, initialValue: T) {
  return function useTypedPubSub(): PubSubState<T> {
    return usePubSub(key, initialValue);
  };
}
