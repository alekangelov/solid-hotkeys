/* @refresh reload */
import { useHotkeys } from 'solid-hotkeys';
import { render } from 'solid-js/web';
import { ThemeProvider } from 'solid-styled-components';
import App from './App';
import { useDarkMode } from './hooks/darkMode';
import { theme, createGlobalStyles } from './styles/theme';

render(() => {
  useHotkeys({ debug: true });
  const { isDarkMode } = useDarkMode();
  const currentTheme = theme(isDarkMode());
  const GlobalStyles = createGlobalStyles(currentTheme);
  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  );
}, document.getElementById('root') as HTMLElement);
