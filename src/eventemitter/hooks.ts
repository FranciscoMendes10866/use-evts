import { useCallback, useContext, useEffect, type DependencyList } from "react";

import { EventEmitterContext } from "./context";

export function useEmitter<T>(key: string) {
  const eventTarget = useContext(EventEmitterContext);
  if (!eventTarget) {
    throw new Error("useEmitter must be used within EventEmitterProvider");
  }

  return useCallback(
    (value: T) => {
      eventTarget.emit(key, value);
    },
    [eventTarget, key],
  );
}

type CallbackFn<T> = (value: T) => void;

export function useListener<T>(
  key: string,
  callback: CallbackFn<T>,
  deps: DependencyList = [],
) {
  const eventTarget = useContext(EventEmitterContext);
  if (!eventTarget) {
    throw new Error("useListener must be used within EventEmitterProvider");
  }

  useEffect(() => {
    return eventTarget.on(key, (datum) => callback(datum as T));
  }, [eventTarget, key, ...deps]);
}

export function createEventHooks<T>(key: string) {
  return {
    useEmitter: function useTypedEmitter() {
      return useEmitter<T>(key);
    },
    useListener: function useTypedListener(
      callback: CallbackFn<T>,
      deps: DependencyList = [],
    ) {
      return useListener(key, callback, deps);
    },
  };
}
