/**
 * @param  {string} url
 * @param  {{}|any} data
 * @param  {string} method?
 */
export default async function post(url: string, data: {}|any, method?: string) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method || 'POST', //* GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    // body data type must match "Content-Type" header
    body: JSON.stringify(data),
  })
  // parses JSON response into native JavaScript objects
  return response.json()
}
