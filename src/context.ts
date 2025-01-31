import { Queue } from "./queue";

export interface Context {
  disposer?: Queue;
  computation?: () => void;
}

let context: Context | undefined;

export function getContext(): Context {
  return context || {};
}

export function runWithContext<T>(newContext: Context, fn: () => T): T {
  const currentContext = context;

  context = Object.freeze({ ...getContext(), ...newContext });

  try {
    return fn();
  } finally {
    context = currentContext;
  }
}
