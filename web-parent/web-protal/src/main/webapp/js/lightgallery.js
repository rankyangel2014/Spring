// Avoid `console` errors in browsers that lack a console.
(function() {
  $(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
  $.ajax({
    type: "GET",
    url: "getImages/" + location.search.substring(1),
    dataType: "json",
    contentType: "application/json",
    success: function(data) {

      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var image = {};
        var curPage = i + 1;
        image["src"] = data[i]["imageUrl"];
        image["thumb"] = data[i]["imageUrl"];
        image["subHtml"] = 'Photo  ' + curPage;
        arr.push(image);
      }
      $("#lightgallery").lightGallery({
        download: true,
        dynamic: true,
        dynamicEl: arr,
        index: 0,
        closable: false
      }).on("onAfterOpen.lg", function(event) {
        $('span.lg-close.lg-icon').hide();
      });

    }
  });
}());
