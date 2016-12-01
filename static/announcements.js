var alerts = [];
var aContainer = $(".alerts-container");

$(document).ready(function(){
    getAlerts();
});

function getAlerts(){
    alerts = [];
    $.ajax({
        url : "./alerts.json",
        type: "GET",
        dataType: "json",
        success: function(response){
            var now = new Date().getTime() / 1000;
            response.forEach(function(a){
                if(a.approved && a.expires >= now) {
                    alerts.push({
                        title: a.title,
                        info: a.info
                    });
                }
            });
        },
        complete: function(response){
            alerts.sort(alertSorter);
            displayAlerts();
        },
        error: function(xhr, errmsg, err){
            console.error("Encountered Error: " + errmsg + "\n" + xhr.status + ": " + xhr.responseText);
        }
    });
}

function alertSorter(a, b){
    return b.time - a.time;
}

function displayAlerts(){
    $(".alert").remove();
    alerts.forEach(function(a, idx){
        aContainer.append(
            "<div class='jumbotron alert'>" +
                "<div class='alert-container'>" +
                    "<h1>" + a.title + "</h1>" +
                    "<p>" + a.info + "</p>" +
                "</div>" +
            "</div>"
        );
    });
}
