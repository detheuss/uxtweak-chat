import { MAX_MESSAGE_LENGTH } from './const';
import {
  REGEX_HTML_TAG,
  REGEX_DANGEROUS_CONTROL_CHARS,
  REGEX_EXCESSIVE_NEWLINES,
  REGEX_CONSECUTIVE_SPACES,
} from './regex';

export const sanitizeChatMessageText = (text: string): string =>
  text
    .replace(REGEX_HTML_TAG, '')
    .replace(REGEX_DANGEROUS_CONTROL_CHARS, '')
    .replace(REGEX_EXCESSIVE_NEWLINES, '\n\n')
    .replace(REGEX_CONSECUTIVE_SPACES, ' ')
    .trim();

export const validateMaxLength = (text: string): boolean => text.length <= MAX_MESSAGE_LENGTH;
