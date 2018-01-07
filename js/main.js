$(document).ready(function() {

  var pomodoroTime = 25, breakTime = 5;
  var counter = pomodoroTime * 60;
  var isOn = false; // if podomoro clock has started or not
  var time;
  var bool = true;
  var clock;

  function counterCalc(clock) {
    $('#time').text(clock);
    counter = clock * 60;
  };
  // add 1 minute to podomoro time
  $("#addSession").click(function() {
    if (!isOn) {
      $("#timer").text(++pomodoroTime);
      counterCalc(pomodoroTime);
    }
  });
  // subtract 1 minute to podomoro time
  $("#subtractSession").click(function() {
    if (pomodoroTime > 1) {
      if (!isOn) {
        $("#timer").text(--pomodoroTime);
        counterCalc(pomodoroTime);
      }
    }
  });
  // add 1 minute to break time
  $("#addBreak").click(function() {
    if (!isOn) {
      clearInterval(time);
      $("#breakTime").text(++breakTime);
    }
  });
  // subtract 1 minute to break time
  $("#subtractBreak").click(function() {
    if (!isOn) {
      clearInterval(time);
      if (breakTime > 1) {
        $("#breakTime").text(--breakTime);
      }
    }
  });

  function start() {
    if (isOn) {
      timer(pomodoroTime);
    } else {
      clearInterval(time);
    }
  }

  function swap() {
    if (bool == false) {
      clock = pomodoroTime;
    } else {
      clock = breakTime;
    }
  }

  function timer(val) {
    time = setInterval(function() {
      --counter
      $('#time').text(Math.floor(counter / 60) + " : " + (counter % 60));

      if (counter == 0) {
        clearInterval(time);
        swap();
        bool = !bool;
        counterCalc(clock);
        timer(clock);
      }

      fillUp(val, counter, !bool);

    }, 1000);

  }
  // function to auto fill the timer container with a colour
  function fillUp(time, counter, i) {
    $("#break").css("visibility", i ? "visible" : "hidden");
    $(".fill > .after").css({
      "background": i ? "#ff5544" : "#55ff44",
      "top": 100 - ((time * 60 - counter) / (time * 60) * 100) + "%"
    });
  }

  $("#start").click(function() {
    $(".glyphicon-play").toggle();
    $(".glyphicon-pause").toggle();
    isOn = !isOn;
    start();
  });

  $("#reset").click(function() {
    isOn = false;
    $(".glyphicon-play").show();
    $(".glyphicon-pause").hide();
    clearInterval(time);
    pomodoroTime = 25;
    breakTime = 5;
    counter = pomodoroTime * 60;
    $("#timer").text(pomodoroTime);
    $("#breakTime").text(breakTime);
    $("#time").text(pomodoroTime);
    $(".fill > .after").css("top", "100%");
  });

  $(".glyphicon-pause").hide();

});