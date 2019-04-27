import { expect } from 'chai'
import {
  apiGet,
  setupTest
} from './fixture-helper'

describe('Pages', function () {
  setupTest(this)
  
  it('should get all pages', async () => {
    const response = await apiGet('pages')
    expect(response.status).to.eql(200)
  })
  
  it('should get all ships', async () => {
    const response = await apiGet('pages')
    expect(response.status).to.eql(200)
  })
})
