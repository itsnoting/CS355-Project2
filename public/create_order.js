/**
 * Created by kting_000 on 5/4/2015.
 */

$(document).ready(function () {
    $('#createStudentBtn').click( function(event){
        event.preventDefault();
        var payload = {
           EmployeeID: $('#EmployeeID').val(),
           StoreID: $('#StoreID').val()
        };

        $.ajax({
            url: $("#create_order").attr("action"),
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            complete: function(data) {
                console.log(data.responseText);
                $('#output').html(data.responseText);
                $('#output').show();
            }
        });
    });
});