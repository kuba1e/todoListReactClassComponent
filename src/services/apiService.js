const todosApi = async (method = 'GET', data, path) => {
  try {
    const baseUrl = 'http://localhost:4000/todos'
    let response = null
    if (method === 'GET') {
      response = await fetch(baseUrl)
      if (!response.ok) {
        throw new Error(response.status)
      }
      const parsedResponse = await response.json()
      return parsedResponse.data
    }
    if (method === 'POST') {
      response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(response.status)
      }
      const parsedResponse = await response.json()
      return parsedResponse.data
    }

    if (method === 'PUT') {
      response = await fetch(`${baseUrl}${path ? `/${path}` : ''}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(response.status)
      }
      return
    }
    if (method === 'DELETE') {
      response = await fetch(`${baseUrl}/${path}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error(response.status)
      }
      return
    }
  } catch (error) {
    throw new Error(error)
  }
}

export default todosApi
