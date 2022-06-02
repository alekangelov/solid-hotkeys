import { onCleanup } from 'solid-js';
import { hotkeyCallbacks } from './common';
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
  const hkString = hotkeys.join('+');

  // eslint-disable-next-line no-param-reassign
  (callbackFn as InternalCallback).options = options;

  const callback: InternalCallback = callbackFn as InternalCallback;
  if (hotkeyCallbacks.has(hkString)) {
    hotkeyCallbacks.set(hkString, [
      ...(hotkeyCallbacks.get(hkString) || []),
      callback,
    ]);
    return;
  }
  hotkeyCallbacks.set(hkString, [callback]);
  onCleanup(() => {
    const callbacksForString = hotkeyCallbacks.get(hkString);
    if (!callbacksForString?.length) return;
    hotkeyCallbacks.set(
      hkString,
      callbacksForString.filter((cb: InternalCallback) => cb !== callback),
    );
  });
};
