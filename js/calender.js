document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
  });
  calendar.render();
  // Esc(escape)키를 눌렀을 경우 캘린더 닫힘
  // if(event.keycode === 27) 은 더이상 권장되지 않음
  const calenderIcon = document.querySelector('.calendar-icon');
  const calenderBox = document.querySelector('.calendar-box');
  window.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.key === 'Escape') {
      calenderBox.classList.add('hidden');
      calenderIcon.classList.remove('icon-w');
    }
  });

  const handleCalenderBox = function () {
    calenderBox.classList.toggle('hidden');
    calenderIcon.classList.toggle('icon-w');
  };
  calenderIcon.addEventListener('click', handleCalenderBox);
});
