export const errorCallback = (error: unknown) => {
  console.error(error)
  return Promise.reject(error)
}
