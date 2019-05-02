import axios from 'axios'

export function apiUrl() {
  const env = process.env.NODE_ENV
  if (env === 'development') {
    return `http://localhost:3000/api/v1/`
  } else if (env === 'ci') {
    return `https://harmony-platform-dev.herokuapp.com/api/v1/`
  } else if (env === 'production') {
    return `https://harmony-platform-prod.herokuapp.com/api/v1/`
  }
}

export const api = axios.create({
    baseURL: apiUrl()
})
