/* @refresh reload */
import { useHotkeys } from 'solid-hotkeys';
import { createEffect, createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import { ThemeProvider } from 'solid-styled-components';
import App from './App';
import { useDarkMode } from './hooks/darkMode';
import { createTheme, createGlobalStyles } from './styles/theme';

render(() => {
  useHotkeys({ debug: true });
  const { isDarkMode } = useDarkMode();
  const [currentTheme, setCurrentTheme] = createSignal(createTheme());
  createEffect(() => {
    setCurrentTheme(createTheme(isDarkMode()));
  });
  return (
    <ThemeProvider theme={createTheme(isDarkMode())}>
      {createGlobalStyles(currentTheme())}
      <App />
    </ThemeProvider>
  );
}, document.getElementById('root') as HTMLElement);
