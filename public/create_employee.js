/**
 * Created by kting_000 on 5/6/2015.
 */
$(document).ready(function () {
    $('#createEmployeeBtn').click( function(event){
        event.preventDefault();
        var payload = {
            First_Name: $('#First_Name').val(),
            Last_Name: $('#Last_Name').val(),
            Employee_Num: $('#Employee_Num').val()
        };

        $.ajax({
            url: $("#create_employee_form").attr("action"),
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