import { type PropsWithChildren, useMemo } from "react";

import { PubSubStore } from "../store";
import { PubSubContext } from "./context";

export function PubSubProvider({ children }: PropsWithChildren) {
  const store = useMemo(() => new PubSubStore(), []);
  return (
    <PubSubContext.Provider value={store}>{children}</PubSubContext.Provider>
  );
}
