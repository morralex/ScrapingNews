// Grab the articles as a json


$.getJSON("/articles", (data) => {

  $.each(data, function (key, val) {

    $("#articles").append("<h6 data-id'" + val._id + "'>" + val.title + "\n" + "<a href=" + val.link + ">" + val.link + "</a>" + "</h6>");
    // console.log(val)
  })

})

$(document).click("h6", () => {
  $("#notes").empty();

  const noteId = $(this).attr("data")

  $.ajax({
    method: "GET",
    url: "/articles/" + noteId
  })

    .then(function(key) {
      console.log(key)

      // $('#notes').append("<h3>" + data.title + "</h3>"
      // + "\n<input id='titleinput' name='title' >"
      // + "\n<textarea id='bodyinput' name='body'></textarea>"
      // + "\n<button data-id='" + data._id + "' id='savenote'>Save Note<button>"
      // );
    })
})

