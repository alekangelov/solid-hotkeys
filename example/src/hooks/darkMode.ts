import { createSignal, createEffect } from 'solid-js';
import { createMediaQuery } from './createMediaQuery';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

interface UseDarkModeOutput {
  isDarkMode: () => boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

const opposite = (e: boolean) => !e;

export const useDarkMode = (initialValue?: boolean): UseDarkModeOutput => {
  const isDarkOS = createMediaQuery(COLOR_SCHEME_QUERY);

  const [isDarkMode, setIsDarkMode] = createSignal(
    initialValue ?? isDarkOS() ?? false,
  );

  const toggle = () => setIsDarkMode(opposite);

  const enable = () => setIsDarkMode(true);

  const disable = () => setIsDarkMode(false);

  createEffect(() => {
    console.log(isDarkOS());
    setIsDarkMode(isDarkOS());
  });

  return {
    isDarkMode,
    toggle,
    enable,
    disable,
  };
};
