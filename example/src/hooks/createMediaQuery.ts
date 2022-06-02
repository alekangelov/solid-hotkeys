import { createSignal, onCleanup, onMount } from 'solid-js';

export function createMediaQuery(query: string) {
  const getMatches = (): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };
  const [matches, setMatches] = createSignal(false);

  onMount(() => {
    const matchMedia = window.matchMedia(query);
    function handleChange() {
      setMatches(getMatches());
    }
    // Listen matchMedia

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else matchMedia.addEventListener('change', handleChange);

    onCleanup(() => {
      matchMedia.removeListener(handleChange);
      matchMedia.removeEventListener('change', handleChange);
    });
  });

  return matches;
}
