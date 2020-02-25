//Set default view to Dashboard

$(window).on('resize', function() {
  $('#content').height($(window).height() - 50);
});

$(document).ready(function() {
  $('#content').height($(window).height() - 50);
  $.get('./Component/DashBoardComponent.html', function(data) {
    $('#root').html(data);
  });
  //Since the side nav is fixed the content needs to be shifted over a distance equal to the sidnav width
  $('#root').css({
    'margin-left': $('#side').width() + 'px'
  });
  $('#content').css({
    'margin-top': $('#top').height() + 15 + 'px'
  });
  $('#page-top').css({
    'margin-top': $('#titlebar').height() + 'px'
  });
});

//Add Listener to DashBoard Link
$('#dashboardLink').click(function() {
  $.get('./Component/DashBoardComponent.html', function(data) {
    $('#root').html(data);
    $('.nav-link.active')
      .removeClass()
      .addClass('nav-link');
    $('#dashboardLink')
      .removeClass()
      .addClass('nav-link active');
  });
});

//Add listener to Profile Link
$('#profileLink').click(function() {
  $.get('./Component/ProfileComponent.html', function(data) {
    $('#root').html(data);
    $('.nav-link.active')
      .removeClass()
      .addClass('nav-link');
    $('#profileLink')
      .removeClass()
      .addClass('nav-link active');
  });
});

//Add Listener to History link
$('#historyLink').click(function() {
  $.get('./Component/HistoryComponent.html', function(data) {
    $('#root').html(data);
    $('.nav-link.active')
      .removeClass()
      .addClass('nav-link');
    $('#historyLink')
      .removeClass()
      .addClass('nav-link active');
  });
});
