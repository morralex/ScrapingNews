// Grab the articles as a json


$.getJSON("/articles", (data) => {

  $.each(data, function (key, val) {

    $("#articles").append("<h6 data-id'" + val._id + "'>" + val.title + "\n" + "<a href=" + val.link + ">" + val.link + "</a>" + "</h6>");
    // console.log(val)
  })

})

$(document).click("h6", () => {
  $("#notes").empty();

  // const noteId = $(this).attr("data")

  $.ajax({
    method: "GET",
    url: "/articles/" 
  })

    .then(function (resp) {
      console.log(resp)

      $('#notes').append("<h3>New Note</h3>"
        + "\n<input id='titleinput' name='title' >"
        + "\n<textarea id='bodyinput' name='body'></textarea>"
        + "\n<button data-id='" + data._id + "' id='savenote'>Save Note<button>"
      );

      if (data.note) {

        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    })
})


$(document).click("#savenote", () => {

  var noteId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + noteId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function (data) {
      console.log(data);

      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});
