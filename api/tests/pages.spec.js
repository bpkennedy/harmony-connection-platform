import { expect } from 'chai'
import {
  apiGet,
  setupTest,
  apiPost,
  apiPut,
  apiDelete,
} from './fixture-helper'

let samplePage = {
  title: 'New Thing',
  content: 'some content goes here.',
  created_by: '1234',
  created_at: new Date().toISOString(),
  modified_by: '1234',
  modified_at: new Date().toISOString(),
  is_active: true,
  version: 1,
}

describe('Pages', function () {
  setupTest(this)
  
  it('should get all pages and have version number', async () => {
    const response = await apiGet('pages')
    expect(response.status).to.eql(200)
    expect(response.data.length).to.eql(1)
    expect(response.data[0].version).to.eql(1)
  })
  
  it('should create a new page with new id from generated id', async () => {
    const response = await apiPost('pages', samplePage)
    expect(response.status).to.eql(201)
    const newPageId = response.data.id
    
    const response2 = await apiGet('pages/' + newPageId)
    expect(response2.status).to.eql(200)
    expect(response2.data.title).to.eql(samplePage.title)
    expect(response2.data.content).to.eql(samplePage.content)
    expect(response2.data.is_active).to.eql(samplePage.is_active)
  })
  
  it('should update existing page', async () => {
    const response = await apiPost('pages', samplePage)
    expect(response.status).to.eql(201)
    
    const response2 = await apiPut('pages/2345', { title: 'updated content' })
    expect(response2.data.id).to.eql('2345')
    expect(response2.data.title).to.eql('updated content')
  })
  
  it('should soft delete a page and only return non-deleted', async () => {
    const response = await apiPost('pages', samplePage)
    expect(response.status).to.eql(201)
    const newPageId = response.data.id
    
    const firstGetResponse = await apiGet('pages')
    const pagesLength = firstGetResponse.data.length
    
    await apiDelete('pages/' + newPageId)
    
    const finalGetResponse = await apiGet('pages')
    expect(finalGetResponse.data.length).to.eql(pagesLength - 1)
  })
  
})
