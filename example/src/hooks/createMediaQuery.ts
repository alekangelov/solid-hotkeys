import { createSignal, onCleanup, onMount } from 'solid-js';

export function createMediaQuery(query: string) {
  const [matches, setMatches] = createSignal(false);

  const getMatches = (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  function handleChange() {
    const newMatches = getMatches();
    setMatches(newMatches);
  }

  onMount(() => {
    const matchMedia = window.matchMedia(query);
    // Listen matchMedia
    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    onCleanup(() => {
      matchMedia.removeListener(handleChange);
      matchMedia.removeEventListener('change', handleChange);
    });
  });
  return matches;
}
