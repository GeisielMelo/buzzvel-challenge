export default (rawData: Date) => {
  return new Date(rawData).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
