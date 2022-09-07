import crypto from "crypto";

/**
 * It generates a random 32 digit token
 * @returns A string of 32 digits
 */
export const get32DigitsToken = (): string => {
  return crypto.webcrypto.randomUUID().split("-").join("");
};

interface AbbreviateOptions {
  padding?: boolean;
  symbols?: string[];
}

const defaultSymbols = ["", "k", "M", "G", "T", "P", "E"];

const defaultOptions = {
  padding: true,
  symbols: defaultSymbols,
};

/**
 * Abbreviate number with symbol
 *
 * @param {number} num - The number to abbreviate.
 * @param [digit=1] - The number of decimal places to round to.
 * @param {AbbreviateOptions | AbbreviateOptions["symbols"]} [options] - An object with the following
 * properties:
 * @returns An string with abbreviation number
 */
export function abbreviateNumber(
  num: number,
  digit = 1,
  options?: AbbreviateOptions | AbbreviateOptions["symbols"],
): string {
  // Previous options style
  if (Array.isArray(options)) {
    options = {symbols: options};
  }

  const {symbols, padding} = Object.assign({}, defaultOptions, options);

  // handle negatives
  const sign = Math.sign(num) >= 0;

  num = Math.abs(num);

  // what tier? (determines SI symbol)
  const tier = (Math.log10(num) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return (!sign ? "-" : "") + num.toString();

  // get suffix and determine scale
  const suffix = symbols[tier];

  if (!suffix) throw new RangeError();

  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = num / scale;

  let rounded = scaled.toFixed(digit);

  if (!padding) {
    rounded = String(Number(rounded));
  }

  // format number and add suffix
  return (!sign ? "-" : "") + rounded + suffix;
}
