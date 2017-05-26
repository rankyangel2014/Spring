<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>mmGrid document</title>
<meta name="description" content="">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
</head>
<body>
	<h2>Hello World!</h2>
	<hr>
	<div id="div1">
		<h2>使用 jQuery AJAX 修改文本内容</h2>
	</div>
	<button>获取外部内容</button>
	<script src="js/jquery/jquery-1.9.1.min.js"></script>
	<script>
		$(document).ready(function() {
			$("button").click(function() {

    /* 				var saveDataAry = [];
         saveDataAry.push({
         id : 1,
         value : '中文'
         });
         saveDataAry.push({
         id : 1,
         value : '1'
         }); */
        $.ajax({
          type: "GET",
          url: "getImages/7",
          dataType: "json",
          contentType: "application/json",
          success: function(data) {
            console.log(data);
          }
        });
      });
    });
  </script>
</body>
</html>
