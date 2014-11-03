<html>
	<head>
		<link rel="stylesheet" type="text/css" href="./main.css">
		<title>Demo - Sharing View</title>
	</head>
	<body>

	<?php
				if(isset($_GET['token']))
				{

					$file = fopen(getcwd()."/temp/".$_GET['token'], "r");

					$str = fgets($file);

					if($str != '') 
					{
						$arr = json_decode($str);
						$size = count($arr);
					}
					else 
					{
						echo "Sharing have errors. !!!!";
						die;
					}
				} else
				{
					echo "Sharing have errors. !!!!";
					die;
				}
	?>

		<div class='container' id="container" data-col="<?php echo $arr[$size-3]->col+1; ?>" data-row="<?php echo $arr[$size-3]->row; ?>" data-height="<?php echo $arr[$size-2]->containerHeight; ?>" data-token="<?php echo $_GET['token']; ?>">
			<div class="control">
				Time to refresh <input type="text" value="" id="time"/> seconds <input type="button" id="btnChange" value="Changes" onclick="clickFunc()" />
			</div>
			<?php 
				if(isset($arr))
					foreach($arr as $item){
						if(isset($item->data)) {
			?>
				<div class="item" style="height: 70px; width: 90px; top: <?php echo $item->to; ?>px; display: block; left: <?php echo intval($item->col)*97; ?>px;" data-col="<?php echo $item->col;?>" data-row="<?php echo $item->row;?>">
					<img src="<?php echo "http://static.chotot.com.vn/listing_thumbs". $item->data; ?>"/>
				</div>

			<?php }}
			?>

			
		</div>
		<input type="hidden" id="lastItem" value="<?php echo $arr[$size-1]->maxValue; ?>" />

	</body>
	<script type="text/javascript" src="./main.js"></script>
</html>