import {mapKeycodeToCharacterStream} from './macro-api.common';

type Command = (args: string) => [string] | [null, string];

let keycodes: {[key: string]: [string, boolean?, boolean?] | undefined} = {
  CTRL: ['KC_LCTL', false, true],
  CONTROL: ['KC_LCTL', false, true],
  SHIFT: ['KC_LSFT', false, true],
  ALT: ['KC_LALT', false, true],
  GUI: ['KC_LGUI', false, true],
  WINDOWS: ['KC_LGUI', false, true],
  COMMAND: ['KC_LGUI', false, true],
  ENTER: ['KC_ENT'],
  ESC: ['KC_ESC'],
  ESCAPE: ['KC_ESC'],
  BACKSPACE: ['KC_BSPC'],
  TAB: ['KC_TAB'],
  SPACE: ['KC_SPC'],
  CAPSLOCK: ['KC_CAPS'],
  F1: ['KC_F1'],
  F2: ['KC_F2'],
  F3: ['KC_F3'],
  F4: ['KC_F4'],
  F5: ['KC_F5'],
  F6: ['KC_F6'],
  F7: ['KC_F7'],
  F8: ['KC_F8'],
  F9: ['KC_F9'],
  F10: ['KC_F10'],
  F11: ['KC_F11'],
  F12: ['KC_F12'],
  PRINTSCREEN: ['KC_PSCR'],
  SCROLLLOCK: ['KC_SLCK'],
  PAUSE: ['KC_PAUS'],
  BREAK: ['KC_PAUS'],
  INSERT: ['KC_INS'],
  HOME: ['KC_HOME'],
  PAGEUP: ['KC_PGUP'],
  DELETE: ['KC_DEL'],
  DEL: ['KC_DEL'],
  END: ['KC_END'],
  PAGEDOWN: ['KC_PGDN'],
  RIGHTARROW: ['KC_RGHT'],
  RIGHT: ['KC_RGHT'],
  LEFTARROW: ['KC_LEFT'],
  LEFT: ['KC_LEFT'],
  DOWNARROW: ['KC_DOWN'],
  DOWN: ['KC_DOWN'],
  UPARROW: ['KC_UP'],
  UP: ['KC_UP'],
  NUMLOCK: ['KC_NLCK'],
  MENU: ['KC_MENU'],
  APP: ['KC_MENU'],
};

for (const [keycode, characters] of Object.entries(
  mapKeycodeToCharacterStream,
)) {
  keycodes[characters[0]] = [keycode];
  keycodes[characters[1]] = [keycode, true];
}

const delay: Command = (args) => {
  args = args.trim();

  if (!args) {
    return ['A delay value must be specified'];
  }

  let delay = parseInt(args);

  if (isNaN(delay) || delay < 1 || delay.toString() !== args) {
    return [`Delay value '${args}' is not a positive integer`];
  }

  let converted = '';

  while (delay) {
    const chunk = Math.min(delay, 9999);
    converted += `{${chunk}}`;
    delay -= chunk;
  }

  return [null, converted];
};

const setState = (prefix: string, args: string): [string] | [null, string] => {
  args = args.trim();

  if (!args) {
    return ['A key must be specified'];
  }

  const [keycode, shifted] = keycodes[args] || [];

  if (!keycode) {
    return [`Key '${args}' not found`];
  }

  if (shifted) {
    return [`Key '${args}' requires a modifier`];
  }

  return [null, `{${prefix + keycode}}`];
};

const injectMod: Command = (args) => {
  args = args.trim();

  if (!args) {
    return ['A key must be specified'];
  }

  const [keycode, , modifier] = keycodes[args] || [];

  if (!keycode) {
    return [`Key '${args}' not found`];
  }

  if (!modifier) {
    return [`Key '${args}' is not a modifier key`];
  }

  return [null, `{${keycode}}`];
};

const string: Command = (args) => {
  if (!args) {
    return ['A string must be specified'];
  }

  for (const key of args) {
    if (keycodes[key] === undefined) {
      return [`Key '${key}' not found`];
    }
  }

  return [null, args.replaceAll('{', '\\{')];
};

const commands: {[key: string]: Command | undefined} = {
  DELAY: delay,
  HOLD: setState.bind(null, '+'),
  INJECT_MOD: injectMod,
  RELEASE: setState.bind(null, '-'),
  REM: () => [null, ''],
  STRING: string,
};

export function convertDuckyScript(script: string): [string] | [null, string] {
  let result = '';
  let previous = '';

  for (let [index, line] of script.split(/\r?\n/).entries()) {
    function formatError(message: string) {
      return `Error on line ${index + 1}: ${message}!`;
    }

    if (!line.trim()) {
      continue;
    }

    line = line.replace(/^\s+/, '');
    let [name, args] = line.split(/\s(.*)/);
    args = args || '';
    const command = commands[name];

    if (command) {
      const [error, converted] = command(args);

      if (error !== null) {
        return [formatError(error)];
      }

      result += previous = converted;
      continue;
    }

    if (name === 'REPEAT') {
      args = args.trim();

      if (!args) {
        return [formatError('A repeat count must be specified')];
      }

      let count = parseInt(args);

      if (isNaN(count) || count < 1 || count.toString() !== args) {
        return [
          formatError(`Repeat count '${args}' is not a positive integer`),
        ];
      }

      let converted = '';

      while (count) {
        converted += previous;
        count--;
      }

      result += previous = converted;
      continue;
    }

    const keys = name
      .split('-')
      .concat(args.split(/\s/))
      .filter((key) => key);

    let chord = '{';

    for (const key of keys) {
      const [keycode, shifted, modifier] = keycodes[key] || [];

      if (!keycode) {
        return [formatError(`Key '${key}' not found`)];
      }

      if (keys.length === 1 && modifier) {
        return [
          formatError(
            'Modifier-only injection requires calling INJECT_MOD before use',
          ),
        ];
      }

      if (shifted) {
        return [formatError(`Key '${key}' requires a modifier`)];
      }

      chord += `${keycode}, `;
    }

    result += previous = `${chord.slice(0, -2)}}`;
  }

  return [null, result];
}
