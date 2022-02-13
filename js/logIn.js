// login variable
const logInForm = document.querySelector('#logIn');
const getUsername = document.querySelector('#inputUser');
const logInBtn = document.querySelector('#logInBtn');

// key
const USERNAME_KEY = 'username';
// username 저장
const saveUsername = function (event) {
  event.preventDefault();
  const username = getUsername.value;
  localStorage.setItem(USERNAME_KEY, username);
  getUsername.value = '';
  window.location.href = '../toDos.html';
};

logInForm.addEventListener('submit', saveUsername);

if (localStorage.getItem(USERNAME_KEY) !== null) {
  window.location.href = '../toDos.html';
}
