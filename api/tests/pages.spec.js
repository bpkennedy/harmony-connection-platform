import { expect } from 'chai'
import {
  apiGet,
  setupTest
} from './fixture-helper'

describe('Pages', function () {
  setupTest(this)
  
  it('should get all pages and have version number', async () => {
    const response = await apiGet('pages')
    expect(response.status).to.eql(200)
    expect(response.data.length).to.eql(1)
    expect(response.data[0].version).to.eql(1)
  })
})
