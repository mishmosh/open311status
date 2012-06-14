// INTERFACE
$(document).ready(function() {
  $("[rel=tooltip]").tooltip();

  // Services Modal
  $("#endpoints").on("click", "a[data-toggle=modal]", function() {
    var target = $(this).attr('data-target') || $(this).attr('href');
    if (target === "#servicesModal") {
   	  var city = $(this).attr('data-city');

      $.ajax({
        url: "/services/" + city,
      }).done(function ( content ) {
        $("#servicesAjax").html(content);
      });
    }
  });
  // replace with the "loading" prompt after close
  $('#servicesModal').on('hidden', function () {
    $("#servicesAjax").html('<div class="modal-body">loading . . .</div>');
  });
})


// SOCKET.IO
$(document).ready(function() {
  var socket = io.connect('/');
  socket.on('info', function (data) {
    console.log(data);
  });
  socket.on('serviceRequest', function (serviceRequest) {
    var row  = "<tr>"
               + "<td>" + serviceRequest.endpoint + "</td>"
               + "<td>" + serviceRequest.service_name + "</td>"
               + "<td>" + serviceRequest.description + "</td>";
    if (serviceRequest.media_url) {
        console.log( serviceRequest.media_url);
        row +=  '<td><img src="' + serviceRequest.media_url + '" /></td>';
    }
    else {
        row += '<td></td>';
    }
    row += "<td>" + serviceRequest.requested_datetime + "</td>";
    row += '</tr>';

    $("table#service-requests tbody").prepend(row);
  });
});