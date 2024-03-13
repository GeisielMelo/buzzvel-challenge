/** Receive an array of strings and return a string with the first letter of each string capitalized. */
export default (participants: string[]) => {
  const newArr: string[] = []

  participants.forEach((element) => {
    const firstLetter = element.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = element.slice(1)
    newArr.push(firstLetterCap + remainingLetters)
  })

  return newArr.join(' ')
}
