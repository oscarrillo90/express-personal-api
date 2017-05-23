console.log("Sanity Check: JS is working!");

$(document).ready(function(){

$vacationsList = $('#vacationTarget');
$.ajax({
  method: 'Get',
  url: '/api/vacations',
  success: handleSuccess,
  error: handleError
});

// submit new vacation button
$('#newVacationForm').on('submit', function(e) {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/api/vacations',
    data: $(this).serialize(),
    success: newVacationSuccess,
    error: newVacationError
  });
});

// delete button
  $vacationsList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/vacations/'+$(this).attr('data-id'));
    $.ajax({
        method: 'DELETE',
        url: '/api/vacations/'+$(this).attr('data-id'),
        success: deleteVacationSuccess,
        error: deleteVacationError
    });
  });




});
