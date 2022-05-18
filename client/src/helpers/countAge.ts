export const countAge = (dateOfBirth: string) => {
  const dateValue = new Date(dateOfBirth)
  return Math.abs(
    new Date(
      Date.now() - +dateValue
    ).getUTCFullYear() - 1970
  )
}
