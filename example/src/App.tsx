import type { Component } from 'solid-js';
import { createHotkey } from 'solid-hotkeys';
import { GlobalStyles } from './styles/theme';

const App: Component = () => {
  createHotkey(
    ['META', 'S'],
    pressed => {
      console.log({ pressed, main: true });
    },
    { preventDefault: false },
  );

  return (
    <div>
      <GlobalStyles />
      <input />S
    </div>
  );
};

export default App;
