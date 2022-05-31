import { onCleanup, onMount } from "solid-js";
import { arrayEquality, arrToUpperCase } from "./helpers";
import { HotkeyCallback, HotkeyEvent, Keys, Options } from "./helpers/types";

const ESCAPE_HATCH = "*";

export const useHotkeys = <T extends Keys[] | "*">(
  keys: T,
  callback: HotkeyCallback<T>,
  options?: Options
) => {
  const hotkeys = typeof keys != "string" ? arrToUpperCase(keys) : "*";
  const pressedKeys = new Set<Uppercase<Keys>>();
  const handleKeyDown = (event: HotkeyEvent) => {
    if (event.defaultPrevented) return;
    if (hotkeys == "*") {
      return (callback as HotkeyCallback<"*">)([...pressedKeys]);
    }
    const key = event.key.toUpperCase() as Uppercase<Keys>;
    if (!hotkeys.includes(key)) return;
    pressedKeys.add(key);
    if (arrayEquality([...hotkeys], [...pressedKeys])) {
      event.preventDefault();
      (callback as HotkeyCallback<Array<Keys>>)(event);
      pressedKeys.clear();
    }
  };

  const handleKeyUp = (event: HotkeyEvent) => {
    pressedKeys.delete(event.key.toUpperCase() as Uppercase<Keys>);
  };

  onMount(() => {
    window.addEventListener(
      "keydown",
      handleKeyDown as any,
      options?.listenerOptions || undefined
    );
    window.addEventListener(
      "keyup",
      handleKeyUp as any,
      options?.listenerOptions || undefined
    );
    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown as any);
      window.removeEventListener("keyup", handleKeyUp as any);
    });
  });
};
