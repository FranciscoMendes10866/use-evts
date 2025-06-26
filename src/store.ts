import type { SetStateAction } from "react";

import { TypedEventTarget } from "./event";

export class PubSubStore {
  #stores = new Map<string, unknown>();
  #emitters = new Map<string, TypedEventTarget<unknown>>();

  #getEmitter<T>(key: string): TypedEventTarget<T> {
    if (!this.#emitters.has(key)) {
      this.#emitters.set(key, new TypedEventTarget<T>());
    }
    return this.#emitters.get(key)! as TypedEventTarget<T>;
  }

  getValue<T>(key: string): T | undefined;
  getValue<T>(key: string, defaultValue: T): T;
  getValue<T>(key: string, defaultValue?: T): T | undefined {
    if (!this.#stores.has(key) && defaultValue !== undefined) {
      this.#stores.set(key, defaultValue);
    }
    return this.#stores.get(key) as T | undefined;
  }
  setValue<T>(key: string, value: SetStateAction<T>) {
    const currentValue = this.#stores.get(key) as T | undefined;
    const newValue =
      typeof value === "function"
        ? (value as (prev: T | undefined) => T)(currentValue)
        : value;

    if (Object.is(currentValue, newValue)) return;

    this.#stores.set(key, newValue);
    this.#getEmitter<T>(key).emit("change", newValue);
  }
  subscribe<T>(key: string, callback: (value: T) => void) {
    return this.#getEmitter<T>(key).on("change", callback);
  }
  reset(key?: string) {
    if (key) {
      this.#stores.delete(key);
      this.#emitters.delete(key);
    } else {
      this.#stores.clear();
      this.#emitters.clear();
    }
  }
  has(key: string) {
    return this.#stores.has(key);
  }
  keys() {
    return Array.from(this.#stores.keys());
  }
}
