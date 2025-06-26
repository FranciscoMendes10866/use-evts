type UnsubscribeFn = () => void;

interface TypedCustomEvent<T> extends CustomEvent<T> {
  detail: T;
}

export class TypedEventTarget<T = unknown> extends EventTarget {
  #addTypedListener(
    type: string,
    callback: (data: T) => void,
    options: AddEventListenerOptions = {},
  ): UnsubscribeFn {
    const controller = new AbortController();
    const handler = (event: Event) => {
      callback((event as TypedCustomEvent<T>).detail);
    };
    this.addEventListener(type, handler, {
      ...options,
      signal: controller.signal,
    });
    return () => controller.abort();
  }

  emit(type: string, data: T): void {
    this.dispatchEvent(new CustomEvent<T>(type, { detail: data }));
  }
  on(type: string, callback: (data: T) => void): UnsubscribeFn {
    return this.#addTypedListener(type, callback, { once: false });
  }
  once(type: string, callback: (data: T) => void): UnsubscribeFn {
    return this.#addTypedListener(type, callback, { once: true });
  }
}
