"use strict"

async function fetchData() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Network error or invalid response');
      }
  
      const data = await response.json();
      console.table(data.slice(0, 10));
    //   console.table(data);  // No need to fetch all data so i but it as a comment ^_^

    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  fetchData();
  