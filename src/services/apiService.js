const getFetchOptions = () => {}

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
      const parsedResponse = await response.json()
      if (!response.ok) {
        throw new Error(parsedResponse.message)
      }
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

      const parsedResponse = await response.json()
      if (!response.ok) {
        throw new Error(parsedResponse.message)
      }
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

      const parsedResponse = await response.json()
      if (!response.ok) {
        throw new Error(parsedResponse.message)
      }
      return
    }

    if (method === 'DELETE' && path === '/todos') {
      response = await fetch(`${baseUrl}${path}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      })

      const parsedResponse = await response.json()
      if (!response.ok) {
        throw new Error(parsedResponse.message)
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

      const parsedResponse = await response.json()
      if (!response.ok) {
        throw new Error(parsedResponse.message)
      }
      return
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export default todosApi
