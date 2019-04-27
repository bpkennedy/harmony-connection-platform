import { expect } from 'chai'
import {
  apiGet,
  setupTest
} from './fixture-helper'

describe('Users', function () {
  setupTest(this)
  
  it('should get all users', async () => {
    const response = await apiGet('users')
    expect(response.status).to.eql(200)
  })
})
