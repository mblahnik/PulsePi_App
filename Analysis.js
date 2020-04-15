const analysisPage = {
    exIntensitiesURL: 'https://pulsepi.azurewebsites.net/api/biometric/getIntensities',
    updateChart: function (data) {
        var ctx = $('#testChart');
        var times = data.dates;
        var intensities = data.percentages;
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: times,
                datasets: [{
                    label: 'Percentage of maximum heart rate',
                    data: intensities,
                    fill: false,
                    spanGaps:false
                }]
            },
            options: {
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
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    },
    getIntensityData: function (url) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ username: User.getInstance().UserName }),
            success: function (data) {
                analysisPage.updateChart(data);
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
          if(name === 'exPercentage') this.getIntensityData(analysisPage.exIntensitiesURL);
        });
    }
};

 