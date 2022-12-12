
// Display que muestra el tiempo actual
const currentTime = document.querySelector('h1');
const audio = new Audio('assets/alarm-sound.mp3');

audio.loop = true;

let alarmTime = null;
let alarmTimeout = null;

const upcomingAlarmList = document.querySelector('#upcoming-alarms-list');
const addAlarm = document.querySelector('.setAlarm');

const alarmList = []; // Array con todas las alarmas 

// Reproduce el audio en el tiempo correcto
function ring(realTime) {
  audio.play();
}

// muestra el tiempo correcto
function updateTime() {
  var today = new Date();
  const hour = formatTime(today.getHours());
  const minutes = formatTime(today.getMinutes());
  const seconds = formatTime(today.getSeconds());
  const realTime = `${hour}:${minutes}:${seconds}`;

  currentTime.innerText = `${hour}:${minutes}:${seconds}`;

  //     verifica si AlarmList include la variable "realTime"
  //     si la incluye, la funcion es llamada
  if (alarmList.includes(realTime)) {
    ring(realTime);
    //alert(`Son las ${realTime}`);
    Swal.fire({
      title: 'Son las ' + realTime,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }
}

// Si el número es menor a 10 append 0 
function formatTime(time) {
  if (time < 10 && time.length != 2) {
    return '0' + time;
  }
  return time;
}

// Función para parar la alarma que está sonando
function stopAlarm() {
  audio.pause();
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
  }
}

// Funcion para remover la alarma cuando se le da click al botón de borrar
upcomingAlarmList.addEventListener('click', e => {
  if (e.target.classList.contains("deleteAlarm")) {
    e.target.parentElement.remove();
  }
});

// Función para borrar la alarma del ArrayList
remove = (value) => {
  let newList = alarmList.filter((time) => time != value);
  alarmList.length = 0; // Clear contents
  alarmList.push.apply(alarmList, newList);
}


// Añade un nuevo item de lista a newAlarm
function addNewAlarm(newAlarm) {
  const html =
    `<li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlarm}>Borrar alarma</button>       
    </li>`
  upcomingAlarmList.innerHTML += html
};


// Evento que crea una nueva alarma cuando el formulario es subido
addAlarm.addEventListener('submit', event => {

  event.preventDefault(); // evita el comportamiento por default de la página

  let hour = formatTime(addAlarm.hr.value);
  if (hour === '0') {
    hour = '00'
  }
  let minute = formatTime(addAlarm.min.value);
  if (minute === '0') {
    minute = '00'
  }
  let second = formatTime(addAlarm.sec.value);
  if (second === '0') {
    second = '00'
  }

  const newAlarm = `${hour}:${minute}:${second}`

  // Añade newAlarm a el array alarmList
  if (isNaN(newAlarm)) {
    if (!alarmList.includes(newAlarm)) {
      alarmList.push(newAlarm);
      addNewAlarm(newAlarm);
      addAlarm.reset();
    } else {
      alert(`Alarm for ${newAlarm} already set.`);
    }
  } else {
    alert("Invalid Time Entered")
  }
})

// llama updateTime() cada segundo
setInterval(updateTime, 1000);