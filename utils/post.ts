export default async function post(url: string, data: {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    // body data type must match "Content-Type" header
    body: JSON.stringify(data),
  })
  // parses JSON response into native JavaScript objects
  return response.json()
}
