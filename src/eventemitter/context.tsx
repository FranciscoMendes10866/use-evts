import { createContext } from "react";

import type { TypedEventTarget } from "../event";

export const EventEmitterContext = createContext<TypedEventTarget | null>(null);
