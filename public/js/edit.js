const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  await fetch(`/api/post/${postId}`, {
       // Create the functionality to help create the buttons for your website.

  });

  document.location.replace('/dashboard');
};

const deleteClickHandler = async function(event) {
  // THE TWO BELOW LINES...DON'T NEED? FROM MINI PROJ PROFILE.JS
  // if (event.target.hasAttribute('data-id')) {
  //   const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api//post/${postId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  // }
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
