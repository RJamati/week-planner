// Ready function to wait till DOM loaded
document.addEventListener('DOMContentLoaded', function () {
  // Open and switch between tabs next + prev button function
  function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("container");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // Pad number to two places eg 01
  function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  // Add Calender Event on click
  function addCalEvent(target, currentText) {
    var eventTitle = prompt("Event Title:", currentText);
    if (eventTitle != null) {
      var parentElement = target.parentNode;

      parentElement.innerHTML = `<input type='button' class="createEvents active" value="${eventTitle}"/>`;
      parentElement.querySelector('.createEvents').addEventListener('click', event => {
        updateCalEvent(event.target);
      });
    }
  }

  // Update Calender Event on click + Delete Event if required
  function updateCalEvent(target) {
    var result = confirm("Do you want to update the data?");
    if (result == true) {
      addCalEvent(target, target.value);
    }
    else {
      var res = confirm("Do you want to delete the data?");
      if (res == true) {
        var parentElement = target.parentNode;

        parentElement.innerHTML = `<input type='button' class="createEvents" value=""/>`;
        parentElement.querySelector('.createEvents').addEventListener('click', event => {
          addCalEvent(event.target);
        });
      }
    }
  }

  // Generate grid
  var hour = 0;
  var hourtime = 0;
  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 24; y++) {
      if (hour == y) {
        var unit = `<div class="unit">${pad(hourtime) + ':00'}</div>`;
        hour = hour + 8;
        hourtime++;
      }
      else {
        var unit = `<div class="unit"><input type='button' class="createEvents" value=""/></div>`;
      }

      document.querySelectorAll('.container').forEach(item => {
        item.innerHTML += unit;
      });
    }
    hour = 0;
  }

  // Create Event listeners for all buttons
  document.querySelectorAll('.createEvents').forEach(item => {
    item.addEventListener('click', event => {
      addCalEvent(event.target);
    })
  });

  // Create Event listeners for next + prev buttons
  document.querySelector('.prev').addEventListener('click', event => {
    openTab(event, 'week1');
  });

  document.querySelector('.next').addEventListener('click', event => {
    openTab(event, 'week2');
  });

}, false);
