import { Key } from 'ts-key-enum';

type AlphabetKeys =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

type NumberKeys =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9';

export type Keys = `${
  | Key
  | Lowercase<AlphabetKeys>
  | NumberKeys}`;

export type Modifiers = 'ctrl' | 'alt' | 'shift';

export type HotkeyEvent = Omit<KeyboardEvent, 'key'> & {
  key: Keys;
};

export type HotkeyCallback<T extends Array<Keys> | string> =
  T extends string
    ? (keys?: Array<Uppercase<Keys>>) => void
    : (event?: HotkeyEvent) => void;

export type Options = {
  listenerOptions: AddEventListenerOptions;
};
