const heartRateURL = 'https://pulsepi.azurewebsites.net/api/heartRate/record';
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
  data: null,
  isRunning: false,
  saveData: function () {
    let postData = ExercisePage.data.getBpmDataObj();
    postData['username'] = User.getInstance().UserName;
    $.ajax({
      url: heartRateURL,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(postData),
      success: function (data) {
        console.log('good Job');
        console.log(data);
      },
      error: function (data) {
        console.log('bad job');
        console.log(data);
        console.log(postData);
      },
    });
  },
  stopExercise: function () {
    this.isRunning = false;
    this.data.endTime = Date.now();
    ClientSocket.getInstance().setInputHandler(function (data) {});
    $('#CurrentBpm').text(`0 Bpm`);
    $('#MaxBpm').text(`0 Bpm`);
    $('#MinBpm').text(`0 Bpm`);
  },
  startExercise: function () {
    this.data = new ExerciseData(Date.now(), $('#MySelect').val());
    this.isRunning = true;
    ClientSocket.getInstance().setInputHandler(function (data) {
      var bpm = parseInt(data.toString());
      //Constrain HR between 55 and 120 
      bpm = Math.min(Math.max(bpm, 55), 120);
      //Still need to check - sometimes HRs get sent too fast and the numbers get 
      //combined as something like: "678992", we don't wanna save that 
      if(bpm < 120 && bpm > 55) {
        ExercisePage.data.processNewBpm(parseInt(data.toString()));
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
    this.attachListeners();
  },
};

ExercisePage.init();
