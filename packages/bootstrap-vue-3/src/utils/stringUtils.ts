import {isArray, isPlainObject, isString, isUndefinedOrNull} from '.'
import {
  RX_FIRST_START_SPACE_WORD,
  RX_LOWER_UPPER,
  RX_START_SPACE_WORD,
  RX_UNDERSCORE,
} from '../constants/regex'

/**
 * Convert a value to a string that can be rendered `undefined`/`null` will be converted to `''` Plain objects and arrays will be JSON stringified
 *
 * @param val
 * @param spaces
 * @returns
 */
export const toString = (val: any, spaces = 2): string =>
  isUndefinedOrNull(val)
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
    ? JSON.stringify(val, null, spaces)
    : String(val)

/**
 * @param str
 * @returns
 */
export const startCase: (str: string) => string = (str) =>
  str
    .replace(RX_UNDERSCORE, ' ')
    .replace(RX_LOWER_UPPER, (str, $1, $2) => `${$1} ${$2}`)
    .replace(RX_FIRST_START_SPACE_WORD, (str, $1, $2) => $1 + $2.toUpperCase())

/**
 * @param str
 * @returns
 */
export const titleCase: (str: string) => string = (str) =>
  str
    .replace(RX_UNDERSCORE, ' ')
    .replace(RX_LOWER_UPPER, (str, $1, $2) => `${$1} ${$2}`)
    .replace(RX_START_SPACE_WORD, (str, $1, $2) => $1 + $2.toUpperCase())

/**
 * Uppercases the first letter of a string and returns a new string
 *
 * @param str
 * @returns
 */
export const upperFirst = (str: any): string => {
  str = isString(str) ? str.trim() : String(str)
  return str.charAt(0).toUpperCase() + str.slice(1)
}
