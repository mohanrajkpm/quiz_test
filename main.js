
// load data via ajax call
function load_data() {

    $.ajax({
        method: "GET",
        url: "https://aimtell.com/files/sites.json",
        success: function (data) {
            handleData(data);
        },
        error: OnError 
    });

}

// error handling
function OnError(xhr, errorType, exception) {
    var responseText;
    $("#dialog").html("");
    try {
        responseText = jQuery.parseJSON(xhr.responseText);
        $("#dialog").append("<div><b>" + errorType + " " + exception + "</b></div>");
        $("#dialog").append("<div><u>Exception</u>:<br /><br />" + responseText.ExceptionType + "</div>");
        $("#dialog").append("<div><u>StackTrace</u>:<br /><br />" + responseText.StackTrace + "</div>");
        $("#dialog").append("<div><u>Message</u>:<br /><br />" + responseText.Message + "</div>");
    } catch (e) {
        responseText = xhr.responseText;
        $("#dialog").html(responseText);
    }
    $("#dialog").dialog({
        title: "jQuery Exception Details",
        width: 700,
        buttons: {
            Close: function () {
                $(this).dialog('close');
            }
        }
    });
}

function handleData(data) {
    // initialize the template
    var siteTemplateScript = $("#site-listing-template").html();

    // compile the template
    var siteTemplate = Handlebars.compile(siteTemplateScript);

    // passing data to template
    var siteCompiledHtml = siteTemplate(data);

    // appending to html
    $('#table-data').html(siteCompiledHtml);
}

