import { createSignal, Show } from 'solid-js';
import { createHotkey } from 'solid-hotkeys';

const Child = () => {
  const [singal, setSignal] = createSignal(false);
  createHotkey(['META', 'S', 'D'], event => {
    event.preventDefault();
    setSignal(true);
  });
  return (
    <div>
      i'm shown and press cmd+s+d to show my child
      <Show when={singal()}>
        <div>and the hotkey was called</div>
      </Show>
    </div>
  );
};

const opposite = (e: any) => !e;

const App = () => {
  const [modal, setModal] = createSignal(false);
  const toggle = () => setModal(opposite);
  createHotkey(['META', 'P'], event => {
    event.preventDefault();
    toggle();
  });
  return (
    <div>
      <hgroup>
        <h1>This is still in development, it's going to be sweet. I swear.</h1>
        <h2>Currently there's this handly little demo</h2>
      </hgroup>
      press cmd+p to show the bottom thing
      <Show when={modal()}>
        <Child />
      </Show>
    </div>
  );
};

export default App;
