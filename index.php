<html>
	<head>
		<link rel="stylesheet" type="text/css" href="./main.css">
		<title>Demo</title>
	</head>
	<body>
		<div class='container' id="container" data-col="0" data-row="0" data-height="0" data-token=''>
			<div class="control">
				Time to refresh <input type="text" value="" id="time"/> seconds <input type="button" id="btnChange" value="Changes" onclick="clickFunc()" />
				<div><input type="button" value="Share View" id="btnShare" onclick="shareFunc()" /><span id="link"></span></div>
			</div>
			
		</div>
		<input type="hidden" value="0" id="lastItem" />
	</body>
	<script type="text/javascript" src="./main.js"></script>
</html>