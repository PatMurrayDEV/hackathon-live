function CheckSchedule() {
  var now = new Date();

  $('#scheduleTable > tbody  > tr').each(function() {

    var div = $(this);
    var startTime = new Date(div.attr("data-time-start"));
    var endTime = new Date(div.attr("data-time-end"));

    if (startTime < now && endTime > now) {
      div.addClass('table-info');
    } else {
      div.removeClass('table-info');
    }

  });
}

var interval = self.setInterval(function(){CheckSchedule()},10000);
