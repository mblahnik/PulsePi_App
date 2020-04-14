const analysisPage = {
    init: function () {
        var ctx = $('#testChart');
        var time_Array = ["2018-12-07 16:00:17", "2018-12-07 15:45:17", "2018-12-07 15:30:17", "2018-12-07 15:15:16", "2018-12-07 15:00:17", "2018-12-07 14:45:16", "2018-12-07 14:30:17", "2018-12-07 14:15:17", "2018-12-07 14:00:17", "2018-12-07 13:45:17", "2018-12-07 13:30:16", "2018-12-07 13:15:17"];
        var meas_value_Array = [67, 90, 100, 98, 86, 80, 82, 65, 67, 70, 71, 73];
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: time_Array,
                datasets: [{
                    label: 'Heart Rate',
                    data: meas_value_Array,
                    fill: false,
                    spanGaps:false
                }]
            },
            options: {
                scales: {
                    xAxes: [{
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
                            minRotation: 45
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
    }
};

 