// Avoid `console` errors in browsers that lack a console.
(function() {
  $(".showimage")
          .on(
                  'click',
                  function() {
                    $("#lightgallery")
                            .lightGallery(
                                    {
                                      download: true,
                                      dynamic: true,
                                      dynamicEl: [
                                          {
                                            "src": 'img/thumb-1.jpg',
                                            'thumb': 'img/thumb-1.jpg',
                                            'subHtml': 'Photo 1 by <a href="http://www.example.com" target="_blank">Photographer Name</a><br />More caption text.<br />Even more caption text.'
                                          },
                                          {
                                            "src": 'img/thumb-2.jpg',
                                            'thumb': 'img/thumb-2.jpg',
                                            'subHtml': 'Photo 2 by <a href="http://www.example.com" target="_blank">Photographer Name</a><br />More caption text.<br />Even more caption text.'
                                          },
                                          {
                                            "src": 'img/thumb-4.jpg',
                                            'thumb': 'img/thumb-4.jpg',
                                            'subHtml': 'Photo 3 by <a href="http://www.example.com" target="_blank">Photographer Name</a><br />More caption text.<br />Even more caption text.'
                                          }],
                                      index: 0
                                    });
                  });
}());
