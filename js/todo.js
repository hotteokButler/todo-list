// toDoList -----------------------------

// todo값 받아오기
const inputToDoForm = document.querySelector('.cont1 form');
const inputToDo = document.querySelector('#input-toDos');

// 중요도 선택박스
const isImportantSelect = document.querySelector('#is-important');

// 잔여 할일 노출 박스
const countBox = document.querySelector('.count-box');
const howManyImpor = document.querySelector('.imp > span');
const howManyHaveTo = document.querySelector('.todoC > span');
const howManyCompl = document.querySelector('.completeC > span');

//list 추가할 parentNode
const toDoList = document.querySelector('.toDo-list ul');
const toDoListLi = document.querySelector('.toDo-list ul li');
// btn
const completeBtn = document.querySelector('.complete');
const delBtn = document.querySelector('.del');

// toDos리스트
let toDos = [];
let countStat = false;
let countImportant = 0;
let countComplete = 0;

// KEYS
const TO_DOS = 'toDoList';
const HIDDEN_CLASS = 'hidden';
const WHITE_CLASS = 'white';
const GREEN_CLASS = 'green';
const COMP_CLASS = 'complete';
const DEL_CLASS = 'del';
const TODO_CLASS = 'toDo';
const TODO_BTN_CLASS = 'toDo-btn';
const TODOLIST_KEY = 'toDoList';

// usergreeting
const owner = document.querySelector('.menu h2 span');
const ownerName = localStorage.getItem('username');

if (ownerName !== null) {
  owner.innerText = `${ownerName}'s `;
}
//logout
const logOut = document.querySelector('.go-to-main');
const handleLogOut = function () {
  localStorage.clear();
  countImportant = 0;
  countComplete = 0;
  window.location.href = '../index.html';
};

logOut.addEventListener('click', () => {
  handleLogOut();
});

// event
inputToDoForm.addEventListener('submit', (event) => {
  getListFromUser(event);
});

// todo내용 받아서 객체에 저장
function getListFromUser(event) {
  event.preventDefault();
  const newToDo = inputToDo.value;
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
    level: isImportantSelect.selectedIndex,
  };
  toDos.push(newToDoObj);
  inputToDo.value = '';
  //localstrage에 정보 저장
  saveToDos();
  //todolist ul에 추가
  printToDos(newToDoObj);
  inputToDo.focus();
}

// locaStorage에 정보 저장
function saveToDos() {
  localStorage.setItem(TO_DOS, JSON.stringify(toDos));
}
//ul에 할일 목록 추가
function printToDos(newToDoObj) {
  const li = document.createElement('li');
  const p = document.createElement('p');
  const div = document.createElement('div');
  const button1 = document.createElement('button');
  const button2 = document.createElement('button');
  // li에 id값 => 추후 삭제 이벤트 위해서
  li.id = newToDoObj.id;
  // 리스트 내용
  p.innerText = newToDoObj.text;
  // button
  button1.innerText = '완료';
  button2.innerText = '삭제';
  // button2.addEventListener('click', handleDelBtn);
  // 요소 추가
  div.appendChild(button1);
  button1.addEventListener('click', handleCompBtn);
  div.appendChild(button2);
  button2.addEventListener('click', handleDelBtn);
  li.appendChild(p);
  li.appendChild(div);
  // class 추가
  div.classList.add(TODO_BTN_CLASS);
  button1.classList.add(COMP_CLASS);
  button2.classList.add(DEL_CLASS);
  if (newToDoObj.level === 1) {
    li.classList.add(GREEN_CLASS);
    countI();
  } else {
    li.classList.add(WHITE_CLASS);
  }
  // 출력
  toDoList.appendChild(li);
  todayHaveTo();
}

function handleDelBtn(event) {
  const target = event.target.parentElement;
  const targetList = target.parentElement;
  targetList.remove();
  toDos = toDos.filter((toDos) => toDos.id !== parseInt(targetList.id));
  saveToDos();
  if (countImportant > 0) {
    countImportant -= 2;
    countI();
  } else if (toDos.length === countComplete) {
    howManyImpor.innerText = '0';
    howManyCompl.innerText = '0';
  }
}

function handleCompBtn(event) {
  countComplete++;
  printCountImp();
  handleDelBtn(event);
}
function countI() {
  countImportant++;
  howManyImpor.innerText = String(countImportant);
}
function printCountImp() {
  localStorage.setItem('complete', countComplete);
  console.log = countComplete;
  howManyCompl.innerText = String(countComplete);
}
function todayHaveTo() {
  const count = toDos.length;
  howManyHaveTo.innerText = String(count);
}
const savedToDos = localStorage.getItem(TODOLIST_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  toDos.forEach(printToDos);
  printCountImp();
} else {
}
