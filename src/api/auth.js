import client from './client'

export const register = (data) =>
  client.post('/auth/register', data).then((r) => r.data.data)

export const login = (data) =>
  client.post('/auth/login', data).then((r) => r.data.data)

export const getMe = () =>
  client.get('/auth/me').then((r) => r.data.data)

export const createApiKey = (name) =>
  client.post('/auth/api-keys', { name }).then((r) => r.data.data)

export const listApiKeys = () =>
  client.get('/auth/api-keys').then((r) => r.data.data.keys)

export const revokeApiKey = (keyId) =>
  client.delete(`/auth/api-keys/${keyId}`).then((r) => r.data.data)
