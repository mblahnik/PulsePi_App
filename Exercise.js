class ExerciseData {
  constructor(startTime, exerciseType) {
    this.startTime = startTime;
    this.type = exerciseType;
    this.endTime = null;
    this.bpmLow = 0;
    this.bpmHigh = 0;
    this.bpmAvg = 0;
    this.count = 0;
    this.bpmSum = 0;
  }
  processNewBpm(newBpm) {
    this.count++;
    this.bpmSum += newBpm;
    this.bpmAvg = this.bpmSum / this.count;
    if (!this.bpmLow || this.bpmLow > newBpm) this.bpmLow = newBpm;
    if (newBpm > this.bpmHigh) this.bpmHigh = newBpm;
  }

  getBpmDataObj() {
    return {
      startTime: this.startTime,
      endTime: this.endTime,
      type: this.type,
      bpmLow: this.bpmLow,
      bpmHigh: this.bpmHigh,
      bpmAvg: this.bpmAvg,
    };
  }
}

const ExercisePage = {
  heartRateURL: 'https://pulsepi.azurewebsites.net/api/heartRate/record',
  data: null,
  isRunning: false,
  seconds: 0,
  minutes: 0,
  hours: 0,
  t: null,
  add: function () {
    ExercisePage.seconds++;
    if (ExercisePage.seconds >= 60) {
      ExercisePage.seconds = 0;
      ExercisePage.minutes++;
      if (ExercisePage.minutes >= 60) {
        ExercisePage.minutes = 0;
        ExercisePage.hours++;
      }
    }

    document.getElementById('timer').textContent =
      (ExercisePage.hours
        ? ExercisePage.hours > 9
          ? ExercisePage.hours
          : '0' + ExercisePage.hours
        : '00') +
      ':' +
      (ExercisePage.minutes
        ? ExercisePage.minutes > 9
          ? ExercisePage.minutes
          : '0' + ExercisePage.minutes
        : '00') +
      ':' +
      (ExercisePage.seconds > 9
        ? ExercisePage.seconds
        : '0' + ExercisePage.seconds);

    ExercisePage.timer();
  },
  timer: function () {
    ExercisePage.t = setTimeout(ExercisePage.add, 1000);
  },
  stopTimer: function () {
    clearTimeout(ExercisePage.t);
  },
  zeroTimer: function () {
    document.getElementById('timer').textContent = '00:00:00';
    ExercisePage.seconds = 0;
    ExercisePage.minutes = 0;
    ExercisePage.hours = 0;
  },
  saveData: function () {
    let postData = ExercisePage.data.getBpmDataObj();
    postData['username'] = User.getInstance().UserName;
    $.ajax({
      url: ExercisePage.heartRateURL,
      type: 'POST',
      dataType: 'text',
      contentType: 'application/json',
      data: JSON.stringify(postData),
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.log(data);
      },
    });
  },
  stopExercise: function () {
    ExercisePage.stopTimer();
    this.isRunning = false;
    this.data.endTime = Date.now();
    ClientSocket.getInstance().setInputHandler(function (data) {});
    $('#CurrentBpm').text(`0 Bpm`);
    $('#MaxBpm').text(`0 Bpm`);
    $('#MinBpm').text(`0 Bpm`);
  },
  startExercise: function () {
    ExercisePage.zeroTimer();
    ExercisePage.timer();
    this.data = new ExerciseData(Date.now(), $('#MySelect').val());
    this.isRunning = true;
    ClientSocket.getInstance().setInputHandler(function (data) {
      var bpm = parseInt(data.toString());
      //Constrain HR between 55 and 120
      bpm = Math.min(Math.max(bpm, 55), 120);
      //Still need to check - sometimes HRs get sent too fast and the numbers get
      //combined as something like: "678992", we don't wanna save that
      if (bpm < 120) {
        ExercisePage.data.processNewBpm(bpm);
        $('#CurrentBpm').text(`${data.toString()} Bpm`);
        $('#MaxBpm').text(`${ExercisePage.data.bpmHigh} Bpm`);
        $('#MinBpm').text(`${ExercisePage.data.bpmLow} Bpm`);
      }
    });
  },
  attachListeners: function () {
    $('#StartExerciseBtn').click(() => {
      if (!ExercisePage.isRunning) ExercisePage.startExercise();
    });
    $('#StopExerciseBtn').click(() => {
      if (ExercisePage.isRunning) ExercisePage.stopExercise();
    });
    $('#SaveButton').click(() => {
      if (ExercisePage.data && !ExercisePage.isRunning) ExercisePage.saveData();
    });
  },
  init: function () {
    ExercisePage.zeroTimer();
    this.attachListeners();
  },
};

//show loading image when you click the start button
function showPicture() {
  var img = document.getElementById('pic');
  img.style.display = 'block';
  img.style = 'text-align:center';
}

//hide loading image when you click the stop button
function hidePicture() {
  var img = document.getElementById('pic');
  img.style.display = 'none';
}
