import { Modifiers } from "./types";

export const arrayEquality = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

export function whatModifierIsPressed(event: KeyboardEvent): Modifiers[] {
  const { ctrlKey, altKey, shiftKey } = event;
  return onlyTruthy([ctrlKey && "ctrl", altKey && "alt", shiftKey && "shift"]);
}

type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T; // from lodash

export function onlyTruthy<T>(arr: T[]): Truthy<T>[] {
  return arr.filter(Boolean) as Truthy<T>[];
}

export const arrToUpperCase = <T extends string>(arr: T[]): Uppercase<T>[] => {
  return arr.map((item) => item.toUpperCase()) as Uppercase<T>[];
};
