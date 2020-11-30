import { API_ROOT } from '../constants';
import RenderModal from '../components/RenderModal';

export const updateQuery = (query) => {
  return { type: 'UPDATE_QUERY', payload: query }
}

export const getUsers = queryData => {
  return async dispatch => {
    const response = await fetch(`${API_ROOT}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query: queryData })
    })
    .catch(() => {
      RenderModal('error', 'Server error. Please try again.')
    });
    if (!response) {return null}
    
    const data = await response.json();
    if (data.error) {
      RenderModal('error', data.error)
    } else {
      dispatch({ type: 'SEARCH_RESULTS', payload: data })
    }
  }
}

export const getTrails = queryData => {
  return async dispatch => {
    const response = await fetch(`https://www.hikingproject.com/data/get-trails?lat=${queryData.lat}&lon=${queryData.lng}&maxDistance=${queryData.radius}&maxResults=100&key=200850712-41bb2ec1278a205fdc5c9050b10c3ad2`)
    // const response = await fetch(`https://www.doesntwork.com`)
    .catch(() => {
      RenderModal('error', 'Server error. Please try again.')
    });
    if (!response) {return null}
    
    const data = await response.json();
    if (data.error) {
      RenderModal('error', data.error)
    } else {
      dispatch({ type: 'GET_TRAILS', payload: data.trails })
    }
  }
}