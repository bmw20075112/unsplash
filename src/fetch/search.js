import axios from 'axios';
import accessKeys from './access-key';
export function searchPhotos (term, params = {}) {
  return axios({
    method: 'get',
    url: 'https://api.unsplash.com/search/photos/',
    params: {
      client_id: accessKeys.client_id,
      query: term,
      page: 1,
      per_page: 20,
      ...params
    }
  })
}

export function getRandom (params = {}) {
  return axios({
    method: 'get',
    url: 'https://api.unsplash.com/photos/random',
    params: {
      client_id: accessKeys.client_id,
      count: 30
    }
  })
}

export function getAuthorList (username, params = {}) {
  return axios({
    method: 'get',
    url: `https://api.unsplash.com/users/${username}/photos`,
    params: {
      client_id: accessKeys.client_id,
      ...params
    }
  })
}

export function blobDecode (link) {
  return axios({
    method: 'get',
    url: `${link}`,
    params: {
      client_id: accessKeys.client_id
    }
  })
}
