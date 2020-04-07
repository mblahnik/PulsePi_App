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
  stopExercise: function () {
    this.isRunning = false;
    this.data.endTime = Date.now();
    ClientSocket.getInstance().setInputHandler(function (data) {});
    $('#CurrentBpm').text(`0 Bpm`);
    $('#MaxBpm').text(`0 Bpm`);
    $('#MinBpm').text(`0 Bpm`);
    console.log(this.data.getBpmDataObj());
  },
  startExercise: function () {
    this.data = new ExerciseData(Date.now(), $('#MySelect').val());
    this.isRunning = true;
    ClientSocket.getInstance().setInputHandler(function (data) {
      ExercisePage.data.processNewBpm(parseInt(data.toString()));
      $('#CurrentBpm').text(`${data.toString()} Bpm`);
      $('#MaxBpm').text(`${ExercisePage.data.bpmHigh} Bpm`);
      $('#MinBpm').text(`${ExercisePage.data.bpmLow} Bpm`);
    });
  },
  attachListeners: function () {
    $('#StartExerciseBtn').click(() => {
      if (!ExercisePage.isRunning) ExercisePage.startExercise();
    });
    $('#StopExerciseBtn').click(() => {
      if (ExercisePage.isRunning) ExercisePage.stopExercise();
    });
  },
  init: function () {
    this.attachListeners();
  },
};

ExercisePage.init();
