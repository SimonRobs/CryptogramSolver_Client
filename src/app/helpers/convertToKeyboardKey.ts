import { KeyboardKeys } from '../enums/KeyboardKeys.enum';
import { isAlphabetical } from './isAlphabetical';

export const convertToKeyboardKey = (key: string): KeyboardKeys | null => {
    if (isAlphabetical(key)) return <KeyboardKeys>key;
    switch (key) {
        case ' ':
        case 'space':
            return KeyboardKeys.SPACE;
        case "'":
            return KeyboardKeys.APOSTROPHE;
        case 'backspace':
            return KeyboardKeys.BACKSPACE;
        case 'enter':
            return KeyboardKeys.ENTER;
        case 'shift':
        case 'lock':
            return KeyboardKeys.LOCK;
        default:
            return null;
    }
};
