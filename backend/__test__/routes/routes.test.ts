import { IVacation } from '../../src/database/models/Vacation'
import App from '../../src/app'
import request from 'supertest'

describe('API RESPONSE', () => {
  let server: App
  let tempData: IVacation & { _id: string }

  beforeAll(() => {
    server = new App()
    server.listen(3000)
  })

  // Create
  test('Create: Should return 400 when the request has missing data.', async () => {
    const response = await request(server.app).post('/api/vacation').send({
      // title: 'Teste',
      description: 'Vacation to spent with my friends.',
      location: 'Some Place',
    })
    expect(response.status).toBe(400)
  })

  test('Create: Should return 201 on successfully create a data.', async () => {
    const response = await request(server.app).post('/api/vacation').send({
      title: 'Teste',
      description: 'Vacation to spent with my friends.',
      location: 'Some Place',
    })
    tempData = response.body
    expect(response.status).toBe(201)
  })

  // Show
  test('Show: Should return 404 on try to get a single data with invalid id.', async () => {
    const response = await request(server.app).get('/api/vacation/123').send()
    expect(response.status).toBe(404)
  })

  test('Show: Should return 200 on successfully find the a data.', async () => {
    const response = await request(server.app).get(`/api/vacation/${tempData._id}`).send()
    expect(response.status).toBe(200)
  })

  // Update
  test('Update: Should return 404 on try to update a single data with invalid id.', async () => {
    const response = await request(server.app).put('/api/vacation/123').send()
    expect(response.status).toBe(404)
  })

  test('Update: Should return 400 when the request has missing data.', async () => {
    const response = await request(server.app).put(`/api/vacation/${tempData._id}`).send({
      // title: 'Teste II',
      description: 'Vacation to spent with my friends.',
      location: 'Some Place',
    })
    expect(response.status).toBe(400)
  })

  test('Update: Should return 200 on successfully update a data.', async () => {
    const response = await request(server.app).put(`/api/vacation/${tempData._id}`).send({
      title: 'Teste II',
      description: 'Vacation to spent with my friends.',
      location: 'Some Place',
    })
    expect(response.status).toBe(200)
  })

  // Delete
  test('Delete: Should return 404 on try to delete a single data with invalid id.', async () => {
    const response = await request(server.app).delete('/api/vacation/123').send()
    expect(response.status).toBe(404)
  })

  test('Delete: Should return 200 on successfully delete a data.', async () => {
    const response = await request(server.app).delete(`/api/vacation/${tempData._id}`).send()
    expect(response.status).toBe(200)
  })

  // Index
  test('Index: Should return 200 on try to get all documents.', async () => {
    const response = await request(server.app).get('/api/vacation').send()
    expect(response.status).toBe(200)
  })
})
