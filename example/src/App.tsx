import type { Component } from 'solid-js';
import { useHotkeys } from 'solid-hotkeys';
import { GlobalStyles } from './styles/theme';

const App: Component = () => {
  useHotkeys(['j'], () => console.log("it's pressed!"), {
    listenerOptions: { passive: true },
  });
  return (
    <div>
      <GlobalStyles />
      <input />
    </div>
  );
};

export default App;
