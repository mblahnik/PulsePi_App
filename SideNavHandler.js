//Jquery is declared elsewhere.

//Reset the Component locations on resize.
$(window).on('resize', setWindowSizes);

//Set default view to Dashboard
$(document).ready(function() {
  $.get('./Component/DashBoardComponent.html', function(data) {
    $('#root').html(data);
  });
  setWindowSizes();
});

//Force the Contents and nav bars into the correct positions.
function setWindowSizes() {
  $('#content').height($(window).height() - 50); //50 is the height of the Top nav.
  $('#root').css({
    'margin-left': $('#side').width() + 'px'
  });
  $('#content').css({
    'margin-top': $('#top').height() + 17 + 'px' //17 is an arbitrary number. Increace it to move the contents down.
  });
  $('#page-top').css({
    'margin-top': $('#titlebar').height() + 'px'
  });
}

/**
 * @description Removes the 'active' class from all nav-links and then adds 'active' to elements with the input id.
 * @param {*} id the id of the nav link tag.
 */
function setNavLinkActive(id) {
  $('.nav-link.active').removeClass('active');
  $('#' + id).addClass('active');
}

//Add Listener to DashBoard Link
$('#dashboardLink').click(function() {
  $.get('./Component/DashBoardComponent.html', function(data) {
    $('#root').html(data);
    setNavLinkActive('dashboardLink');
  });
});

//Add listener to Profile Link
$('#profileLink').click(function() {
  $.get('./Component/ProfileComponent.html', function(data) {
    $('#root').html(data);
    setNavLinkActive('profileLink');
  });
});

//Add Listener to History link
$('#historyLink').click(function() {
  $.get('./Component/HistoryComponent.html', function(data) {
    $('#root').html(data);
    setNavLinkActive('historyLink');
  });
});
