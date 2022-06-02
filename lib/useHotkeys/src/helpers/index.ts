import { NormalizedKeys, NormalizedModifiers } from './types';

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

export const arrEquals = <T>(a: T[], b: T[]) => {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
};
