/**
 * Created by kting_000 on 5/7/2015.
 */
$(document).ready(function () {
    $('#updateEmployeeBtn').click( function(event){
        event.preventDefault();
        var payload = {
            EmployeeID: $('#EmployeeID').val(),
            First_Name: $('#First_Name').val(),
            Last_Name: $('#Last_Name').val(),
            Employee_Num: $('#Employee_Num').val()
        };

        $.ajax({
            url: $("#update_employee_form").attr("action"),
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