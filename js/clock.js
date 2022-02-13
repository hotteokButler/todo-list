const clock = document.querySelector('.clock');
const today = document.querySelector('.day');
const getClock = function () {
  const date = new Date();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  const todayDate = date.getDate();
  const day = date.getDay();
  let todayDay = 'Mon';
  switch (day) {
    case 0:
      todayDay = 'Sun';
      break;
    case 1:
      todayDay = 'Mon';
      break;
    case 2:
      todayDay = 'THU';
      break;
    case 3:
      todayDay = 'WED';
      break;
    case 4:
      todayDay = 'THR';
      break;
    case 5:
      todayDay = 'FRI';
      break;
    case 6:
      todayDay = 'SAT';
      break;
  } //현재 요일

  clock.innerText = `${hour}:${minute}`; //현재시간요일 날짜
  today.innerHTML = `${todayDate} | ${todayDay}`;
};

getClock();
setInterval(getClock, 1000);
