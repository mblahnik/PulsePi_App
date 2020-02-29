User.getInstance().addObserver(() => {
  //User just logged in
  if (User.getInstance().isLoggedIn()) {
    setLinksLoggedIn();
  }
  //User just logged out
  else {
    setLinksLoggedOut();
    setComponentToDashBoard();
  }
});

//Reset the Component locations on resize.
$(window).on('resize', setWindowSizes);

//Set startup view to Dashboard
$(document).ready(function() {
  setLinksLoggedOut();
  setComponentToDashBoard();
  setWindowSizes();
});

function setLinksLoggedIn() {
  $('#loginNav').remove();
  addHistoryLink();
  addProfileLink();
}

function setLinksLoggedOut() {
  $('#profileNav').remove();
  $('#historyNav').remove();
  addLoginLink();
}

function addProfileLink() {
  $('#accordionSidebar')
    .append(`<li class="nav-item" role="presentation" id='profileNav'>
             <a class="nav-link" id="profileLink">
             <i class="fas fa-user"></i><span>Profile</span></a>
             </li>`);
  $('#profileLink').click(function() {
    $.get('./Component/ProfileComponent.html', function(data) {
      $('#root').html(data);
      setNavLinkActive('profileLink');
    });
  });
}

function addLoginLink() {
  $('#profileNav').remove();
  $('#accordionSidebar')
    .append(`<li class="nav-item" role="presentation" id='loginNav'>
             <a class="nav-link"  data-toggle="modal" data-target="#loginModal">
             <i class="far fa-user-circle"></i><span>Login</span></a>
             </li>`);
}

function addHistoryLink() {
  $('#accordionSidebar')
    .append(`<li class="nav-item" role="presentation" id="historyNav">
             <a class="nav-link" id="historyLink">
             <i class="fas fa-table"></i><span>History</span></a>
             </li>`);

  $('#historyLink').click(function() {
    $.get('./Component/HistoryComponent.html', function(data) {
      $('#root').html(data);
      setNavLinkActive('historyLink');
    });
  });
}

//Force the Contents and nav bars into the correct positions.
function setWindowSizes() {
  $('#content').height($(window).height() - 50); //50 is the height of the Top nav.
  $('#root').css({
    'margin-left': $('#side').width() + 'px'
  });
  $('#content').css({
    'margin-top': $('#top').height() + 20 + 'px' //An arbitrary number. Increace it to move the contents down.
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

function setComponentToDashBoard() {
  $.get('./Component/DashBoardComponent.html', function(data) {
    $('#root').html(data);
  });
}
