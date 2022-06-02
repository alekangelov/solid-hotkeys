import { onCleanup, onMount } from 'solid-js';
import { HotkeyEvent, NormalizedKeys, Options } from './helpers/types';
import { hotkeyCallbacks, makePressed } from './common';

// im using vim now, fuck this is difficult
export const useHotkeys = (options: Options = {}) => {
  // the keys that have been pressed in the past Options.timeout ms
  const pressedKeys = makePressed(undefined, options?.debug);
  // the timeouts for said keys
  const timeouts = new Map<NormalizedKeys, NodeJS.Timeout>();

  // a funciton that clears the timeout map and the timouts themselves
  // this HAS to be done because of how keyup works
  // spoiler alert it doesnt
  // if you release multiple keys, only one event will fire
  // aka a bug's life
  const clearAllTimeouts = () => {
    timeouts.forEach((timeout, key) => {
      clearTimeout(timeout);
      timeouts.delete(key);
    });
    pressedKeys.clear();
  };

  const getCallbacks = () => {
    const arr = pressedKeys.getArray();
    const combo = arr.join('+');

    // maps are nice and performant
    const callbacks = hotkeyCallbacks.get(combo);
    return callbacks;
  };

  const unsubscribe = pressedKeys.subscribe(pressed => {
    const callbacks = getCallbacks();

    if (callbacks?.length) {
      callbacks.forEach(callback => callback(pressed));
      clearAllTimeouts();
      return;
    }
    if (hotkeyCallbacks.has('*')) {
      hotkeyCallbacks.get('*')?.forEach(callback => callback(pressed));
    }
  });

  const handleKeyDown = (event: HotkeyEvent) => {
    // if it's prevented don't do anything
    if (event.defaultPrevented) return;
    // because we use normalized keys
    // we need to make sure they're normalized 🫢
    const key = event.key.toUpperCase() as NormalizedKeys;
    pressedKeys.add(key);
    timeouts.set(
      key,
      setTimeout(() => {
        pressedKeys.delete(key);
      }, options.timeout ?? 1000),
    );
    const callbacks = getCallbacks();
    if (callbacks?.length) {
      callbacks.forEach(e => {
        if (e.options.preventDefault) event.preventDefault();
        if (e.options.stopPropagation) event.stopPropagation();
      });
    }
  };

  const handleKeyUp = (event: HotkeyEvent) => {
    if (event.defaultPrevented) return;
    pressedKeys.delete(event.key.toUpperCase() as NormalizedKeys);
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    window.addEventListener('keyup', handleKeyUp as any);
    onCleanup(() => {
      window.removeEventListener('keydown', handleKeyDown as any);
      window.removeEventListener('keyup', handleKeyUp as any);
      unsubscribe();
    });
  });
};
