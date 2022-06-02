import { onCleanup, onMount } from 'solid-js';
import { hotkeyCallbacks } from './common';
import { extractModifiers } from './helpers';
import {
  HotkeyCallback,
  HotkeyCallbackOptions,
  InternalCallback,
  NormalizedKeys,
} from './helpers/types';

export const createHotkey = (
  hotkeys: NormalizedKeys[],
  callbackFn: HotkeyCallback,
  options: HotkeyCallbackOptions = {},
) => {
  onMount(() => {
    const { keys, modifiers } = extractModifiers(hotkeys);
    const combo = keys.join('+');
    // eslint-disable-next-line no-param-reassign
    (callbackFn as InternalCallback).options = { ...options, modifiers };
    const callback: InternalCallback = callbackFn as InternalCallback;
    if (hotkeyCallbacks.has(combo)) {
      hotkeyCallbacks.set(combo, [
        ...(hotkeyCallbacks.get(combo) || []),
        callback,
      ]);
    }
    hotkeyCallbacks.set(combo, [callback]);
    onCleanup(() => {
      // console.log('im unmounting');
      const callbacksForString = hotkeyCallbacks.get(combo);
      if (!callbacksForString?.length) return;
      const newcallbacks = callbacksForString.filter(
        (cb: InternalCallback) => cb !== callback,
      );
      // console.log(`SETTING NEW CALLBACKS FOR: ${combo}:`, { newcallbacks });
      hotkeyCallbacks.set(combo, newcallbacks);
    });
  });
};
