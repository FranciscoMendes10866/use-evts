import { createContext } from "react";

import type { PubSubStore } from "../store";

export const PubSubContext = createContext<PubSubStore | null>(null);
