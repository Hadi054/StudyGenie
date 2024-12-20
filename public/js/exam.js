// this is real timer that will heat submit button after exactly 25 minutes
  // Function to submit the form
  function submitForm() {
    document.getElementById('quizForm').submit();
  }

  // Function to start the timer
  function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      display.textContent = minutes + ':' + seconds;

      if (--timer < 0) {
        submitForm(); // Automatically submit the form when the timer reaches 0
      }
    }, 1000);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Set the timer duration in seconds (25 minutes = 25 * 60 seconds)
    const duration = 25 * 60;

    // Get the element that displays the countdown
    const display = document.getElementById('countdown');

    // Start the timer
    startTimer(duration, display);
  });