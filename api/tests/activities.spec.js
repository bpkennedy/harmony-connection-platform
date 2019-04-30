import { expect } from 'chai'
import {
  apiGet,
  setupTest,
  apiPost,
  apiPut,
  apiDelete,
} from './fixture-helper'

const sampleActivity =   {
  name: 'testactivity',
  display: 'Test Activity',
  is_active: true,
  version: 1,
}

describe('Activities', function () {
  setupTest(this)
  
  it('should get all activities and have version number', async () => {
    const response = await apiGet('activities')
    expect(response.status).to.eql(200)
    expect(response.data[1].version).to.eql(1)
  })
  
  it('should create a new activity with generated id property', async () => {
    const response = await apiPost('activities', sampleActivity)
    expect(response.status).to.eql(201)
    const newActivityId = response.data.id
    
    const response2 = await apiGet('activities/' + newActivityId)
    expect(response2.status).to.eql(200)
    expect(response2.data.name).to.eql(sampleActivity.name)
    expect(response2.data.display).to.eql(sampleActivity.display)
    expect(response2.data.is_active).to.eql(sampleActivity.is_active)
  })
  
  it('should update existing activity', async () => {
    const response = await apiPost('activities', sampleActivity)
    expect(response.status).to.eql(201)
    const newActivityId = response.data.id
    
    const response2 = await apiPut('activities/' + newActivityId, { display: 'Ultra Activity' })
    expect(response2.data.id).to.eql(newActivityId)
    expect(response2.data.display).to.eql('Ultra Activity')
  })
  
  it('should soft delete a activity and only return non-deleted', async () => {
    const response = await apiPost('activities', sampleActivity)
    expect(response.status).to.eql(201)
    const newActivityId = response.data.id
    
    const firstGetResponse = await apiGet('activities')
    const activitiesLength = firstGetResponse.data.length
    
    await apiDelete('activities/' + newActivityId)
    
    const finalGetResponse = await apiGet('activities')
    expect(finalGetResponse.data.length).to.eql(activitiesLength - 1)
  })
  
})
