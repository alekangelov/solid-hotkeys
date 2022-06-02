import { createSignal, onCleanup, onMount } from 'solid-js';

type Options = {
  name: string;
  storage: Storage;
};

export const createPersistedSignal = <T>(initialValue: T, options: Options) => {
  let { name } = options;
  if (!name) {
    name = `persisted-signal-${Math.random()}`;
  }
  const storage = window?.localStorage;

  const [signalPrev, setSignalPrev] = createSignal(initialValue);

  const updateValue = () => {
    const value = storage?.getItem(name);
    if (value) {
      setSignalPrev(() => JSON.parse(value) as T);
    }
  };

  const setSignal = (value: (prev: T) => T) => {
    setSignalPrev(prev => {
      storage?.setItem(name, JSON.stringify(value(prev)));
      return value(prev);
    });
  };

  onMount(() => {
    window.addEventListener('storage', updateValue);
    onCleanup(() => {
      window.removeEventListener('storage', updateValue);
    });
  });

  return [signalPrev, setSignal];
};
