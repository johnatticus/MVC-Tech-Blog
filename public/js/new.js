// const { response } = require("express");

const newFormHandler = async function(event) {
  event.preventDefault();
  
  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="post-body"]').value;
  
  const response = await fetch(`/api/post`, {
    // Create the functionality to help create the buttons for your website.
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to post');
  }
};
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);
  