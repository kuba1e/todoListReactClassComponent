const todosApi = async (method = 'GET', data, path) => {
  try {
    const baseUrl = 'http://localhost:4000'
    const token = localStorage.getItem('token') ?? ''
    let response = null
    if (method === 'GET') {
      response = await fetch(baseUrl + path, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error(response.status)
      }
      const parsedResponse = await response.json()
      return parsedResponse
    }
    if (method === 'POST') {
      response = await fetch(baseUrl + path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(response.status)
      }
      const parsedResponse = await response.json()
      return parsedResponse
    }

    if (method === 'PUT') {
      response = await fetch(`${baseUrl}${path ? `${path}` : ''}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(response.status)
      }
      return
    }
    if (method === 'DELETE') {
      response = await fetch(`${baseUrl}${path}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(response.status)
      }
      return
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export default todosApi
