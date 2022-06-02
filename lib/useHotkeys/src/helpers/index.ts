import { hotkeyCallbacks } from '../common';
import {
  HotkeyEvent,
  InternalCallback,
  NormalizedKeys,
  NormalizedModifiers,
} from './types';

type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;

export const modifierArr: NormalizedKeys[] = [
  'CONTROL',
  'ALT',
  'SHIFT',
  'META',
];

export function onlyTruthy<T>(arr: T[]): Truthy<T>[] {
  return arr.filter(Boolean) as Truthy<T>[];
}
export function whatModifierIsPressed(
  event: KeyboardEvent,
): NormalizedModifiers[] {
  const { ctrlKey, altKey, shiftKey, metaKey } = event;
  return onlyTruthy([
    ctrlKey && 'CONTROL',
    altKey && 'ALT',
    shiftKey && 'SHIFT',
    metaKey && 'META',
  ]);
}

export function extractModifiers(keys: NormalizedKeys[]) {
  const modifiersInKeys = keys.filter(key =>
    modifierArr.includes(key),
  ) as NormalizedModifiers[];
  return {
    modifiers: modifiersInKeys,
    keys: keys.filter(key => !modifierArr.includes(key)),
  };
}

// shallow-ish equals, we don't care about where they are
export const arrEquals = <T>(a: T[], b: T[]) => {
  if (a.length !== b.length) return false;
  if (a.length === 0 && b.length === 0) return true;
  const bUnique = [...new Set(b)];
  const aUnique = [...new Set(a)];
  if (aUnique.length !== bUnique.length) return false;
  return aUnique.every(item => bUnique.includes(item));
};

// we cant know for sure which one is the one we want
// we have to make a rough guesstimate
const getHasPotential = (
  comboInput: string,
  pressedModifiers: NormalizedModifiers[],
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [combo, callbacks] of hotkeyCallbacks) {
    // eslint-disable-next-line no-continue
    if (!combo.includes(comboInput)) continue;
    // eslint-disable-next-line no-restricted-syntax
    for (const clalback of callbacks) {
      const { options } = clalback;
      if (options.modifiers.every(m => pressedModifiers.includes(m))) {
        return true;
      }
    }
  }
  return false;
};

function findExact(combo: string, pressedModifiers: NormalizedModifiers[]) {
  const exactMatchCallbacks = hotkeyCallbacks.get(combo);
  if (exactMatchCallbacks) {
    const exactMatch = exactMatchCallbacks.filter(e =>
      e.options.modifiers.every(m => pressedModifiers.includes(m)),
    );
    if (exactMatch.length) return exactMatch.at(-1);
  }
  return undefined;
}

export const findMatch = (
  event: HotkeyEvent,
  pressedKeys: NormalizedKeys[],
): { hasPotential?: boolean; exact?: InternalCallback } => {
  const pressedModifiers = whatModifierIsPressed(event);
  const combo = pressedKeys.join('+');
  const exact = findExact(combo, pressedModifiers);
  if (exact) return { exact };
  const potential = getHasPotential(combo, pressedModifiers);
  if (potential) return { hasPotential: true, exact: undefined };
  return {};
};
