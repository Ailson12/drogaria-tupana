export const sleep = (milliseconds = 2000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
