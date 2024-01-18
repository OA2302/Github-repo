const fetch = require('node-fetch'); 

const BASE_URL = 'https://api.github.com';

async function fetchRepositories(username, page = 1, perPage = 10) {
  const url = `${BASE_URL}/users/${username}/repos?page=${page}&per_page=${perPage}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  fetchRepositories,
};
