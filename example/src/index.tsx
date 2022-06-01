/* @refresh reload */
import { render } from 'solid-js/web';
import { ThemeProvider } from 'solid-styled-components';

import App from './App';

render(
  () => (
    <ThemeProvider theme={{}}>
      <App />
    </ThemeProvider>
  ),
  document.getElementById('root') as HTMLElement,
);
