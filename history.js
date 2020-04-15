//id = "tableBody"
const historyPage = {
  allHistoryURL: 'https://pulsepi.azurewebsites.net/api/heartRate/getAllData',
  exerciseHistoryURL: 'https://pulsepi.azurewebsites.net/api/heartRate/exerciseHistory',
  restingHistoryURL: 'https://pulsepi.azurewebsites.net/api/heartRate/restingHistory',
  putDataInTable: function (data) {
    $('#tableBody').empty();
    data.forEach((element) => {
      $('#tableBody').append(`<tr>
                                <td>${element.type}</td>
                                <td>${this.convertTime(element.startTime)}</td>
                                <td>${this.convertTime(element.endTime)}</td>
                                <td>${element.bpmLow}</td>
                                <td>${element.bpmHigh}</td>
                                <td>${element.bpmAvg}</td>
                                </tr>`);
    });
  },
  convertTime: function(date) {
    let exDate = new Date(Date.parse(date));
    return exDate.toLocaleDateString() + " " + exDate.toLocaleTimeString();
  },
  getHistoryData: function (url) {
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ username: User.getInstance().UserName }),
      success: function (data) {
        historyPage.putDataInTable(data);
      },
      error: function (data) {
        console.log('error');
        console.log(data);
      },
    });
  },
  init: function () {
    this.attachListeners();
  },
  attachListeners: function () {
    $('#loadExHistory').click(() => {
      let name = $('#type').val()
      if(name === 'All') this.getHistoryData(historyPage.allHistoryURL);
      else if(name === 'exercise') this.getHistoryData(historyPage.exerciseHistoryURL);
      else this.getHistoryData(historyPage.restingHistoryURL);
    });
  }
};
