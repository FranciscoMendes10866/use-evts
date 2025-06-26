# 📦 use-evts

Lightweight, React-friendly event & pub-sub utilities with full TypeScript support.

**use-evts** provides two core patterns:
- An event emitter hook system (`useEmitter` / `useListener`)
- A pub-sub store hook system (`usePubSub`)

Great for building global communication layers, decoupled state management, or lightweight event-driven systems in React apps.

---

## ✨ Features

* ✅ Fully typed with TypeScript
* ✅ Supports React Context for isolated scopes
* ✅ Decoupled event emitters (`useEmitter` / `useListener`)
* ✅ Reactive state pub-sub (`usePubSub`)
* ✅ No external dependencies

---

## 📥 Installation

```bash
npm install use-evts
```

---

## 🛠️ Basic Setup

### Event Emitter Provider

Wrap your app or part of your tree:

```tsx
import { EventEmitterProvider } from "use-evts";

function App() {
  return (
    <EventEmitterProvider>
      <YourComponents />
    </EventEmitterProvider>
  );
}
```

### PubSub Provider

For shared reactive state:

```tsx
import { PubSubProvider } from "use-evts";

function App() {
  return (
    <PubSubProvider>
      <YourComponents />
    </PubSubProvider>
  );
}
```

---

# 🚀 Usage Guide

## 1️⃣ Event Emitters

### Emitting Events

```tsx
import { useEmitter } from "use-evts";

function Sender() {
  const emitMessage = useEmitter<string>("my-event");

  return (
    <button onClick={() => emitMessage("Hello World!")}>
      Send Message
    </button>
  );
}
```

### Listening to Events

```tsx
import { useListener } from "use-evts";

function Receiver() {
  useListener<string>("my-event", (msg) => {
    console.log("Received:", msg);
  });

  return <div>Listening...</div>;
}
```

---

## 2️⃣ Typed Event Hook Factory

Simplifies strongly typed emitters/listeners:

```tsx
import { createEventHooks } from "use-evts";

const chatHooks = createEventHooks<string>("chat-message");

function ChatSender() {
  const emitChat = chatHooks.useEmitter();
  return (
    <button onClick={() => emitChat("Hi there!")}>
      Send Chat
    </button>
  );
}

function ChatReceiver() {
  chatHooks.useListener((msg) => {
    console.log("Chat Received:", msg);
  });

  return <div>Chat Listener</div>;
}
```

---

## 3️⃣ PubSub (Reactive State Sharing)

### Global State with `usePubSub`

```tsx
import { usePubSub } from "use-evts";

function CounterDisplay() {
  const [count] = usePubSub<number>("counter", 0);
  return <div>Count: {count}</div>;
}

function CounterButtons() {
  const [_, setCount] = usePubSub<number>("counter", 0);

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
    </>
  );
}
```

---

## 4️⃣ Typed PubSub Hook

```tsx
import { createPubSub } from "use-evts";

const useCounter = createPubSub<number>("counter", 0);

function Counter() {
  const [count, setCount] = useCounter();

  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </>
  );
}
```

---

## 5️⃣ Subscribing Without State

Useful for side effects:

```tsx
import { usePubSubSubscription } from "use-evts";

function Logger() {
  usePubSubSubscription<number>("counter", (val) => {
    console.log("Counter changed to", val);
  });

  return null;
}
```

---

# 🔧 Advanced Store Controls

Access store methods via `PubSubStore`:

```ts
const store = new PubSubStore();
store.setValue("key", 123);
store.getValue("key"); // 123
store.has("key"); // true
store.reset("key");
```

---

# 🏗 Example Structure

```tsx
<EventEmitterProvider>
  <PubSubProvider>
    <App />
  </PubSubProvider>
</EventEmitterProvider>
```

Both providers are independent — use one or both based on needs.

---

# 📚 API Reference

## EventEmitter

| Hook               | Description                        |
|-------------------|-------------------------------------|
| `useEmitter<T>(key)` | Returns emitter for a key |
| `useListener<T>(key, callback, deps?)` | Subscribe to events |
| `createEventHooks<T>(key)` | Creates typed emitter/listener hooks |

## PubSub

| Hook               | Description                        |
|-------------------|-------------------------------------|
| `usePubSub<T>(key, initialValue?)` | Shared reactive state |
| `usePubSubSubscription<T>(key, callback, deps?)` | Subscribe to state changes |
| `createPubSub<T>(key, initialValue)` | Typed pub-sub hook |

---

# 🧩 License

MIT License

---

# 💡 Contributing

PRs and suggestions welcome! Open issues or contribute improvements.
