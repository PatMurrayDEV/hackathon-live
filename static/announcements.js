var announcements = [];
var aContainer = $(".announcements-container");
var refresh = $("#refreshAnnouncements");

$(document).ready(function(){
    getAnnouncements();
});

function getAnnouncements(){
    $.ajax({
        url : "/announcements",
        type: "GET",
        dataType: "json",
        success: function(response){
            refresh.toggleClass(".fa-spin");
            var now = new Date().getTime() / 1000;
            response.results.forEach(function(a){
                if(a.approved && a.broadcast_at <= now) {
                    announcements.push({
                        title: a.title,
                        info: a.info,
                        time: new Date(a.broadcast_at * 1000),
                    });
                }
            });
        },
        complete: function(response){
            announcements.sort(announcementSorter);
            displayAnnouncements();
            refresh.toggleClass(".fa-spin");
        },
        error: function(xhr, errmsg, err){
            console.error("Encountered Error: " + errmsg + "\n" + xhr.status + ": " + xhr.responseText);
            refresh.toggleClass(".fa-spin");
        }
    });
}

function announcementSorter(a, b){
    return b.time - a.time;
}

function formatDate(d){
    return (d.getHours() % 12) + ":" + ("0" + d.getMinutes()).slice(-2) + (d.getHours() >= 12 ? "pm" : "am");
}

function displayAnnouncements(){
    announcements.forEach(function(a, idx){
        aContainer.append(
            "<div class='announcement'>" +
                "<div class='announcement-details'>" +
                    "<h4>" + a.title + "</h4>" +
                    "<h6>" + formatDate(a.time) + "</h6>" +
                    "<p>" + a.info + "</p>" +
                "</div>" +
            "</div>"
        );
    });
}

refresh.click(function(){
    $(".announcement").remove();
    announcements = [];
    getAnnouncements();
});
