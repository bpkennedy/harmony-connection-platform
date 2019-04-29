import { expect } from 'chai'
import {
  apiGet,
  setupTest
} from './fixture-helper'

describe('Activities', function () {
  setupTest(this)
  
  it('should get all activities', async () => {
    const response = await apiGet('activities')
    expect(response.status).to.eql(200)
  })
})
