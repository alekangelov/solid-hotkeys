import { InternalCallback, NormalizedKeys } from './helpers/types';

export const hotkeyCallbacks = new Map<string, InternalCallback[]>();

type Listener = (pressed: Set<NormalizedKeys>) => void;

// this is a botched observable basically
export const makePressed = (
  initialValue: Set<NormalizedKeys> = new Set(),
  debugVal: boolean = false,
) => {
  const pressed = new Set(initialValue);
  const listeners = new Set<Listener>();
  const notifyListeners = () =>
    listeners.forEach(listener => listener(pressed));
  const debug = (changed: any, change: any) => {
    // eslint-disable-next-line no-console
    console.info(
      `Current Pressed: ${Array.from(pressed).join(
        '+',
      )}. Changed: ${change}${changed}`,
    );
  };
  return {
    add: (key: NormalizedKeys) => {
      pressed.add(key);
      if ([...pressed].length) notifyListeners();
      if (debugVal) {
        debug(key, '+');
      }
    },
    delete: (key: NormalizedKeys) => {
      pressed.delete(key);
      if ([...pressed].length) notifyListeners();
      notifyListeners();
      if (debugVal) {
        debug(key, '-');
      }
    },
    has: (key: NormalizedKeys) => pressed.has(key),
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    clear: () => {
      if (debugVal) {
        debug('', 'clear');
      }
      if (![...pressed].length) return;
      pressed.clear();
      notifyListeners();
    },
    get: () => pressed,
    getArray: () => [...pressed],
  };
};
