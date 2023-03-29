
$(function () {
  var saveBtn = $('.time-block button');
  var date = dayjs().format('dddd MMMM DD YYYY');
  $('#currentDay').text(date);
  var timeBlocks = $('.time-block');

  function getSavedNote(parentDivID) {
    var savedNote = JSON.parse(localStorage.getItem(parentDivID));

    $('#' + parentDivID + ' textarea').text(savedNote);

    console.log(savedNote);
  }

  timeBlocks.each(function () {
    var timeBlock = $(this);
    var timeBlockHour = timeBlock.attr('id').split('-')[1];
    var currentHour = dayjs().hour();
    var parentDivID = timeBlock.attr('id');

    getSavedNote(parentDivID);

    if (timeBlockHour == currentHour) {
      timeBlock.addClass('present');
    } else if (timeBlockHour <= currentHour) {
      timeBlock.addClass('past');
    } else if (timeBlockHour >= currentHour) {
      timeBlock.addClass('future');
    }
  })

  function saveNote() {
    var btn = $(this);
    var textArea = btn.prev().val();
    var parentDiv = btn.parent();
    var parentDivID = parentDiv.attr('id');
    console.log(textArea);

    localStorage.setItem(parentDivID, JSON.stringify(textArea));
    getSavedNote(parentDivID);
  }
    
  saveBtn.click(saveNote);
});


