const analysisPage = {
    exIntensitiesURL: 'https://pulsepi.azurewebsites.net/api/biometric/getIntensities',
    restRatesURL: 'https://pulsepi.azurewebsites.net/api/heartRate/restingRates',
    targetHRURL: 'https://pulsepi.azurewebsites.net/api/biometric/getHRBounds',
    zonesURL: 'https://pulsepi.azurewebsites.net/api/biometric/getRanges',
    updateChart: function (data, title, xlabel, ylabel) {
        var ctx = $('#testChart');
        var times = data.dates;
        var intensities = data.percentages ?? data.rates;
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: times,
                datasets: [{
                    data: intensities,
                    fill: false,
                    spanGaps:false
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: title
                },
                scales: {
                    xAxes: [{
                        distribution: 'series',
                        type: 'time',
                        time: {
                            parser: 'YYYY-MM-DD HH:mm:ss',
                            unit: 'minute',
                            displayFormats: {
                                'minute': 'YYYY-MM-DD HH:mm:ss',
                                'hour': 'YYYY-MM-DD HH:mm:ss'
                            }            
                        },
                        ticks: {
                            source: 'data',
                            maxRotation: 45,
                            minRotation: 45,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: xlabel
                          }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: ylabel
                          }
                    }]
                }
            }
        });
    },
    getIntensityData: function (url, title, xlabel, ylabel) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ username: User.getInstance().UserName }),
            success: function (data) {
                console.log(data);
                analysisPage.updateChart(data, title, xlabel, ylabel);
            },
            error: function (data) {
                console.log('error');
                console.log(data);
            },
        });
    },
    init: function() {
        this.attachListeners();
    },
    attachListeners: function () {
        $('#loadChart').click(() => {
          let name = $('#type').val()
          if(name === 'exPercentage') this.getIntensityData(analysisPage.exIntensitiesURL, 'Exercise Efficiency', 'Date and Time of Exercise', 'Efficiency Percentage');
          if(name === 'restRates') this.getIntensityData(analysisPage.restRatesURL, 'Resting Rate Trends', 'Date and Time recorded', 'Heart Rate');
        });
    },
    getTargetHR(){
        $.ajax({
            url: this.targetHRURL,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ username: User.getInstance().UserName }),
            success: function (data) {
                analysisPage.assignValues(data);
            },
            error: function (data) {
                console.log('error');
                console.log(data);
            },
        });
    },
    assignValues(data) {
        document.getElementById('TargetHR').innerHTML = data.targetHR;
        document.getElementById('MaxHR').innerHTML = data.maxHR;
        document.getElementById('HRR').innerHTML = data.heartRateReserve;
    },
    getDataForTable: function(){
        $.ajax({
            url: this.zonesURL,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ username: User.getInstance().UserName }),
            success: function (data) {
                console.log(data);
                analysisPage.putDataInTable(data);
            },
            error: function (data) {
                console.log('error');
                console.log(data);
            },
        });
    },
    putDataInTable: function (data) {
        $('#zonesBody').empty();
        $('#zonesBody').append(`<tr>
                            <td>50%</td>
                            <td>${data.fiftyPerc}</td>
                            </tr>`);
        $('#zonesBody').append(`<tr>
                            <td>60%</td>
                            <td>${data.sixtyPerc}</td>
                            </tr>`);                        
        $('#zonesBody').append(`<tr>
                            <td>70%</td>
                            <td>${data.seventyPerc}</td>
                            </tr>`);      
        $('#zonesBody').append(`<tr>
                            <td>80%</td>
                            <td>${data.eightyPerc}</td>
                            </tr>`);
        $('#zonesBody').append(`<tr>
                            <td>90%</td>
                            <td>${data.ninetyPerc}</td>
                            </tr>`);
        $('#zonesBody').append(`<tr>
                            <td>100%</td>
                            <td>${data.hundPerc}</td>
                            </tr>`);                      
    },
    bioInit: function(){
        this.getTargetHR();
        this.getDataForTable();
    }
};

 