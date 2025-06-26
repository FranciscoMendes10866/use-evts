import { type PropsWithChildren, useMemo } from "react";

import { TypedEventTarget } from "../event";
import { EventEmitterContext } from "./context";

export function EventEmitterProvider({ children }: PropsWithChildren) {
  const eventTarget = useMemo(() => new TypedEventTarget(), []);
  return (
    <EventEmitterContext.Provider value={eventTarget}>
      {children}
    </EventEmitterContext.Provider>
  );
}
