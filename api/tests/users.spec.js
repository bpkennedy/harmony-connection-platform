import { expect } from 'chai'
import {
  apiGet,
  setupTest,
  apiPost,
  apiPut,
  apiDelete,
} from './fixture-helper'

let sampleUser =   {
  first_name: 'Brian',
  last_name: 'Kennedy',
  email: 'bpkennedy@gmail.com',
  role: 'admin',
  profile_image_url: 'https://steamuserimages-a.akamaihd.net/ugc/918053186553065192/F20C63A555E64AAE971975AFA2B3BA3B227CD080/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
  serving: ['1234', '1235', '1236', '1237', '1238', '1239', '12320', '12321', '12322'],
  is_active: true,
  version: 1,
}

describe('Users', function () {
  setupTest(this)
  
  it('should get all users and have version number', async () => {
    const response = await apiGet('users')
    expect(response.status).to.eql(200)
    expect(response.data.length).to.eql(1)
    expect(response.data[0].version).to.eql(1)
  })
  
  it('should create a new user with generated id property', async () => {
    const response = await apiPost('users', sampleUser)
    expect(response.status).to.eql(201)
    const newUserId = response.data.id
    
    const response2 = await apiGet('users/' + newUserId)
    expect(response2.status).to.eql(200)
    expect(response2.data.first_name).to.eql(sampleUser.first_name)
    expect(response2.data.last_name).to.eql(sampleUser.last_name)
    expect(response2.data.is_active).to.eql(sampleUser.is_active)
  })
  
  it('should update existing page', async () => {
    const response = await apiPost('users', sampleUser)
    expect(response.status).to.eql(201)
    const newUserId = response.data.id
    
    const response2 = await apiPut('users/' + newUserId, { first_name: 'Billy' })
    expect(response2.data.id).to.eql(newUserId)
    expect(response2.data.first_name).to.eql('Billy')
  })
  
  it('should soft delete a user and only return non-deleted', async () => {
    const response = await apiPost('users', sampleUser)
    expect(response.status).to.eql(201)
    const newUserId = response.data.id
    
    const firstGetResponse = await apiGet('users')
    const usersLength = firstGetResponse.data.length
    
    await apiDelete('users/' + newUserId)
    
    const finalGetResponse = await apiGet('users')
    expect(finalGetResponse.data.length).to.eql(usersLength - 1)
  })
})
