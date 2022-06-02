import { Key as TSKEYS } from 'ts-key-enum';

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

type NumberKeys = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type Keys = `${TSKEYS | Lowercase<AlphabetKeys> | NumberKeys | '*'}`;

export type Modifiers = 'ctrl' | 'alt' | 'shift';

export type HotkeyEvent = Omit<KeyboardEvent, 'key'> & {
  key: Keys;
};

export type NormalizedKeys = Uppercase<Keys>;
export type HotkeyArray = NormalizedKeys[];

export type HotkeyCallback = (pressed: Set<NormalizedKeys>) => void;
export type HotkeyCallbackOptions = {
  preventDefault?: boolean;
  stopPropagation?: boolean;
};
export type InternalCallback = HotkeyCallback & {
  options: HotkeyCallbackOptions;
};

export type Options = {
  /**
   * The listener options for the addEventListener function
   */
  listenerOptions?: AddEventListenerOptions;
  /**
   * The timeout in ms for the key to be considered pressed
   * If after 500 ms, the key is no longer pressed.
   * Even if the user has his finger on the key,
   * the key will be considered released
   *
   * @default 1000
   * @type number
   * @memberof Options
   * @since 0.1.0
   * @example 500
   * @example 1000
   * @example 0
   * @example 20
   */
  timeout?: number;
  /**
   * DEVELOPMENT VARIABLE, WILL PRODUCE LOGS IN CONSOLE
   */
  debug?: boolean;
};
