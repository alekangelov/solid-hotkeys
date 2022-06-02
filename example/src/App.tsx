import { createSignal, Show } from 'solid-js';
import { createHotkey } from 'solid-hotkeys';

const Child = () => {
  const [singal, setSignal] = createSignal(false);
  createHotkey(['META', 'S'], event => {
    event.preventDefault();
    setSignal(true);
  });
  return (
    <div>
      i'm shown and press cmd+s to show my child
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
      <Show when={modal()}>
        <Child />
      </Show>
    </div>
  );
};

export default App;
