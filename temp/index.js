import { onCleanup, onMount } from "solid-js";
import { arrayEquality, arrToUpperCase } from "./helpers";
const ESCAPE_HATCH = "*";
export const useHotkeys = (keys, callback, options) => {
    const hotkeys = typeof keys != "string" ? arrToUpperCase(keys) : "*";
    const pressedKeys = new Set();
    const handleKeyDown = (event) => {
        if (event.defaultPrevented)
            return;
        if (hotkeys == "*") {
            return callback([...pressedKeys]);
        }
        const key = event.key.toUpperCase();
        if (!hotkeys.includes(key))
            return;
        pressedKeys.add(key);
        if (arrayEquality([...hotkeys], [...pressedKeys])) {
            event.preventDefault();
            callback(event);
            pressedKeys.clear();
        }
    };
    const handleKeyUp = (event) => {
        pressedKeys.delete(event.key.toUpperCase());
    };
    onMount(() => {
        window.addEventListener("keydown", handleKeyDown, options?.listenerOptions || undefined);
        window.addEventListener("keyup", handleKeyUp, options?.listenerOptions || undefined);
        onCleanup(() => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        });
    });
};
