const signupFormHandler = async function(event) {
  event.preventDefault();
  
  const usernameEl = document.querySelector('#username-input-signup');
  const passwordEl = document.querySelector('#password-input-signup');
  
  // if (username && password) {
    const response = await fetch('/api/user', {
      // Create the functionality to help create the buttons for your website.
      method: 'POST',
      body: JSON.stringify({ username:usernameEl.value, password:passwordEl.value }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
      alert('You are signed up and logged in. Remember your password, please.')
    } else {
      alert('Failed to sign up');
    }
  };


document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);