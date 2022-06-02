/* @refresh reload */
import { useHotkeys } from 'solid-hotkeys';
import { render } from 'solid-js/web';
import { ThemeProvider } from 'solid-styled-components';

import App from './App';

render(() => {
  useHotkeys({ debug: true });
  return (
    <ThemeProvider theme={{}}>
      <App />
    </ThemeProvider>
  );
}, document.getElementById('root') as HTMLElement);
