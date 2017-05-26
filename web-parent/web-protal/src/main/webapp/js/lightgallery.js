// Avoid `console` errors in browsers that lack a console.
(function() {
  $(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
  $(".showimage")
          .on(
                  'click',
                  function() {
                    $
                            .ajax({
                              type: "GET",
                              url: "getImages/7",
                              dataType: "json",
                              contentType: "application/json",
                              success: function(data) {

                                var arr = [];
                                for (var i = 0; i < data.length; i++) {
                                  var image = {};
                                  var curPage = i + 1;
                                  image["src"] = data[i]["imageUrl"];
                                  image["thumb"] = data[i]["imageUrl"];
                                  image["subHtml"] = 'Photo  '
                                          + curPage
                                          + '  by <a href="http://www.example.com" target="_blank">Photographer Name</a><br />More caption text.<br />Even more caption text.';
                                  arr.push(image);
                                }
                                $("#lightgallery").lightGallery({
                                  download: true,
                                  dynamic: true,
                                  dynamicEl: arr,
                                  index: 0
                                });

                              }
                            });
                  });

}());
