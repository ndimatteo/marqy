/**
 * Pads a number with leading zeros to a specified size.
 *
 * @param num - The number to pad.
 * @param size - The desired length of the padded number.
 * @returns The padded number as a string.
 */
export function zeroPad(num: number, size: number): string {
  let padNum = num.toString()
  while (padNum.length < size) padNum = '0' + padNum

  return padNum
}
