/*THESE ARE REAL VALUES DON'T EDIT*/
// var hackingStarts = new Date("Dec 03 2016 09:00:00 GMT-0500");
// var hsCountdown = $(".countdown[data-cdNum='1']");
// var devpostEnds = new Date("Dec 03 2016 20:00:00 GMT-0500");
// var deCountdown = $(".countdown[data-cdNum='2']");
// var hackingEnds = new Date("Dec 03 2016 21:00:00 GMT-0500");
// var heCountdown = $(".countdown[data-cdNum='3']");


/*THESE ARE FOR TESTING -- COMMENT FOR PROD*/
var hackingStarts = new Date("Nov 28 2016 21:25:00 GMT-0500");
var hsCountdown = $(".countdown[data-cdNum='1']");
var devpostEnds = new Date("Nov 28 2016 21:30:00 GMT-0500");
var deCountdown = $(".countdown[data-cdNum='2']");
var hackingEnds = new Date("Nov 28 2016 21:35:00 GMT-0500");
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
