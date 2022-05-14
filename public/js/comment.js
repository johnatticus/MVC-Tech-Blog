const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const postId = document.querySelector('input[name="post-id"]').value;
    const comment = document.querySelector('textarea[name="comment-body"]').value;
  
    // Create the functionality to help create the buttons for your website.
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to create comment');
  };
};

  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);