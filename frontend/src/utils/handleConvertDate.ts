/** Date conversion handler
 *  @param {Date} rawData - Date string
 *  @example handleConvertDate('2024-03-09T21:16:11.902+00:00')
 *  @returns Formatted Date: '9 March 2024'
 */
export default (rawData: Date) => {
  return new Date(rawData).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
