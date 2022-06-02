import { onCleanup, onMount } from 'solid-js';
import { HotkeyEvent, NormalizedKeys, Options } from './helpers/types';
import { findMatch, modifierArr } from './helpers';

// im using vim now, fuck this is difficult
export const useHotkeys = (
  options: Options = { debug: false, timeout: 500 },
) => {
  // the keys that have been pressed in the past Options.timeout ms
  const pressedKeys = new Set<NormalizedKeys>();
  // the timeouts for said keys
  const timeouts = new Map<NormalizedKeys, NodeJS.Timeout>();

  // a funciton that clears the timeout map and the timouts themselves
  // this HAS to be done because of how keyup works
  // spoiler alert it doesnt
  // if you release multiple keys, only one event will fire
  // aka a bug's life
  const clearAllTimeouts = () => {
    // if (options.debug) console.log('CLEARING ALL IMEOUTS');
    timeouts.forEach((timeout, key) => {
      clearTimeout(timeout);
      timeouts.delete(key);
    });
  };

  // wait for all tasks to finish running
  // and then clear the keys
  const clearKeys = () => {
    // if (options.debug) console.log('CLEARING ALL KEYS AND TIMEOUTS');
    setTimeout(() => {
      clearAllTimeouts();
      pressedKeys.clear();
    }, 0);
  };

  const setTimeoutForKey = (key: NormalizedKeys) => {
    if (timeouts.has(key)) {
      clearTimeout(timeouts.get(key));
      timeouts.delete(key);
    }
    // if (options.debug) console.log('SETTINGS TIMEOUT FOR: ', key);
    timeouts.set(
      key,
      setTimeout(() => {
        // if (options.debug) console.log('timeout hopefully');
        pressedKeys.delete(key);
      }, options.timeout ?? 500),
    );
  };

  const handleKeyDown = (event: HotkeyEvent) => {
    // if it's prevented don't do anything
    if (event.defaultPrevented) return;
    // because we use normalized keys
    // we need to make sure they're normalized 🫢
    const key = event.key.toUpperCase() as NormalizedKeys;
    setTimeoutForKey(key);
    if (!modifierArr.includes(key)) {
      pressedKeys.add(key);
    }
    const arr = [...pressedKeys];
    // maps are nice and performant
    const { hasPotential, exact } = findMatch(event, arr);
    if (exact) {
      exact(event);
      clearKeys();
    }
    if (hasPotential) {
      event.preventDefault();
    }
  };

  const handleKeyUp = (event: HotkeyEvent) => {
    if (event.defaultPrevented) return;
    clearTimeout(timeouts.get(event.key.toUpperCase() as NormalizedKeys));
    timeouts.delete(event.key.toUpperCase() as NormalizedKeys);
    if (pressedKeys.has(event.key.toUpperCase() as NormalizedKeys)) {
      pressedKeys.delete(event.key.toUpperCase() as NormalizedKeys);
    }
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    window.addEventListener('keyup', handleKeyUp as any);
    onCleanup(() => {
      window.removeEventListener('keydown', handleKeyDown as any);
      window.removeEventListener('keyup', handleKeyUp as any);
    });
  });
};
