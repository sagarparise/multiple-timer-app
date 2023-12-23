const allTimer = document.querySelector(".list-of-timer");
const activeTimers = document.getElementById('activeTimers');

const startTimerButton = document.getElementById('startTimer');

displayNoTimersText();
let isTimerActive = false;
startTimerButton.addEventListener("click",()=>{
  
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);

    //total time in second
    const totalSeconds = hours*3600 + minutes*60 + seconds;

    if(totalSeconds > 0)
    {
        createTimer(totalSeconds);
        isTimerActive = true;
        removeNoTimersText();
    }
    else
    {
        alert("Please enter a valid time");
    }
});


//here receive total seconds

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')} `;
}

// Function to create a new timer with the specified total seconds
function createTimer(totalSeconds)
{
    let timerContainer = document.createElement("div");
    timerContainer.classList.add("timer-container");


    const timeLeftElement = document.createElement('div');
    timeLeftElement.classList.add('time-left');
    timeLeftElement.textContent = 'Time Left:';

     // Create an element to display the timer value
     const timerElement = document.createElement('div');
     timerElement.classList.add('timer');

    // Create a container for timer control buttons
    const timerControls = document.createElement('div');
    timerControls.classList.add('timer-controls');

     // Create the 'Stop Timer' button
     const stopButton = document.createElement('button');
     stopButton.classList.add('control-button', 'stop-button');
     stopButton.textContent = 'Stop Timer';

     
    // Create the 'Delete' button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('control-button', 'delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.display = 'none'; 

    let timerInterval;

    function updateTimerDisplay() {
        totalSeconds--;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerElement.classList.add('timer-ended');
            timerElement.textContent = "Time is up!";
            stopButton.style.display = 'none'; // Hide the Stop Timer button
            deleteButton.style.display = 'inline'; // Show the delete button
            timeLeftElement.style.display = 'none';
            timerContainer.style.cssText = "width:40% ; color:#1d1d23; background-color:#f0f757; "

            // Play an audio alert when Time is up!
            playAudioAlert();
        } 
        
        else {
            timerElement.textContent = formatTime(totalSeconds);
        }
    }

    stopButton.addEventListener('click', () => {
        // Stop the timer and remove the timer container
        clearInterval(timerInterval);
        timerContainer.remove();
        isTimerActive = false; // Reset the active timer flag
        // Check if there are no timers, then display "You have no timers currently!" text

        if (allTimer.children.length === 0) {
            displayNoTimersText();
        }
    });


     // Add a click event listener to the 'Delete' button
     deleteButton.addEventListener('click', () => {
        // Remove the timer container
        timerContainer.remove();
        // Check if there are no timers, then display "You have no timers currently!" text
        if (allTimer.children.length === 0) {
            displayNoTimersText();
        }
    });

      // Start the timer interval
      timerInterval = setInterval(updateTimerDisplay, 1000);

      // Append timer control elements to the timer container
    timerControls.appendChild(stopButton);
    timerControls.appendChild(deleteButton);

      // Append timer elements to the timer container
      timerContainer.appendChild(timeLeftElement);
      timerContainer.appendChild(timerElement);
      timerContainer.appendChild(timerControls);

      allTimer.appendChild(timerContainer)
}

function displayNoTimersText() {
    const noTimersText = document.createElement('p');
    noTimersText.classList.add('no-timers-text');
    noTimersText.textContent = 'You have no timers currently!';
    noTimersText.style.fontSize = "14px";
    noTimersText.style.color = "#fff";
    allTimer.appendChild(noTimersText);
}

function removeNoTimersText() {
    // Find and remove the "You have no timers currently!" text
    const noTimersText = allTimer.querySelector('.no-timers-text');

    if (noTimersText) {
     noTimersText.remove();
        
    }
}


// Function to play an audio alert
function playAudioAlert() {
    const audio = new Audio('./alert.mp3'); // Replace with the path to your audio file
    audio.play();
}