//id = "tableBody"
const historyPage = {
  historyURL: 'https://pulsepi.azurewebsites.net/api/heartRate/getAllData',
  putDataInTable: function (data) {
    console.log(data);
    data.forEach((element) => {
      $('#tableBody').append(`<tr>
                                <td>${element.type}</td>
                                <td>${element.startTime}</td>
                                <td>${element.endTime}</td>
                                <td>${element.bpmLow}</td>
                                <td>${element.bpmHigh}</td>
                                <td>${element.bpmAvg}</td>
                                </tr>`);
    });
  },
  getHistoryData: function () {
    $.ajax({
      url: historyPage.historyURL,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ username: 'Elizabeth1' }),
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
    this.getHistoryData();
  },
};

historyPage.init();
