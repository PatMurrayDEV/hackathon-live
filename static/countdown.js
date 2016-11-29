/*THESE ARE REAL VALUES DON'T EDIT*/
// var hackingStarts = new Date("2016-12-03T13:00:00.000Z");
// var hsCountdown = $(".countdown[data-cdNum='1']");
// var devpostEnds = new Date("2016-12-03T23:30:00.000Z");
// var deCountdown = $(".countdown[data-cdNum='2']");
// var hackingEnds = new Date("2016-12-04T01:00:00.000Z");
// var heCountdown = $(".countdown[data-cdNum='3']");


/*THESE ARE FOR TESTING -- COMMENT FOR PROD*/
var hackingStarts = new Date("2016-12-03T14:00:00.000Z");
var hsCountdown = $(".countdown[data-cdNum='1']");
var devpostEnds = new Date("2016-12-04T01:00:00.000Z");
var deCountdown = $(".countdown[data-cdNum='2']");
var hackingEnds = new Date("2016-12-04T02:00:00.000Z");
var heCountdown = $(".countdown[data-cdNum='3']");

hsCountdown.countdown(hackingStarts.getTime(), {elapse: false, defer: true})
    .on('update.countdown', function(event){
        $(this).html(event.strftime(
            '<h3>Hacking Begins In</h3>' +
            '<div>%I:%M:%S</div>'
        ));
    })
    .on('finish.countdown', function(event){
        deCountdown.removeClass('hideCountdown');
        heCountdown.removeClass('hideCountdown');
        hsCountdown.addClass('hideCountdown');
        deCountdown.addClass('devOpen');
        heCountdown.addClass('devOpen');
    })
    .countdown('resume');

deCountdown.countdown(devpostEnds.getTime(), {elapse: false, defer: true})
    .on('update.countdown', function(event){
        $(this).html(event.strftime(
            '<h3>Submissions Close In</h3>' +
            '<div>%I:%M:%S</div>'
        ));
    })
    .on('finish.countdown', function(event){
        $(this).html('<h5>Devpost Submissions are Closed!</h5>');
        deCountdown.removeClass('devOpen');
        heCountdown.removeClass('devOpen');
        deCountdown.addClass('devClosed');
        heCountdown.addClass('devClosed');
    })
    .countdown('resume');

heCountdown.countdown(hackingEnds.getTime(), {elapse: false, defer: true})
    .on('update.countdown', function(event){
        $(this).html(event.strftime(
            '<h3>Hacking Ends In</h3>' +
            '<div>%I:%M:%S</div>'
        ));
    })
    .on('finish.countdown', function(event){
        deCountdown.remove();
        $(this).html('<h1>Hacking Is Over!</h1>');
    })
    .countdown('resume');
