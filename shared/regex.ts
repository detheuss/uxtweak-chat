/* eslint-disable no-control-regex */

export const REGEX_HTML_TAG = /<\/?[a-z][^>]*>/gi;
export const REGEX_DANGEROUS_CONTROL_CHARS =
  /[\x00-\x08\x0B\x0C\x0E-\x1F\u200B-\u200F\u202A-\u202E\u2028\u2029\uFEFF]/g;
export const REGEX_EXCESSIVE_NEWLINES = /\n{3,}/g;
export const REGEX_CONSECUTIVE_SPACES = / {2,}/g;
