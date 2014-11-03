<?php
	
	if(isset($_GET['last']))
	{
		$last = $_GET['last'];
		$str = file_get_contents('http://www.chotot.vn/tp_ho_chi_minh/#');

		if($last == '0')
		{
			
			preg_match_all("/\/[0-9]{2,3}\/[0-9]{10,14}\.jpg/", $str,$matches);

			echo json_encode($matches[0]);	
		}
		else
		{
			preg_match("/\/[0-9]{2,3}\/[0-9]{10,14}\.jpg/", $str,$matches);

			
			if($matches[0] != $last)
			{
				preg_match_all("/\/[0-9]{2,3}\/[0-9]{10,14}\.jpg/", $str,$matches);
				$rs = array();

				foreach($matches[0] as $item)
				{
					if($item == $last)
					{
						break;
					}
					$rs[]=$item;
				}

				echo json_encode($rs);
			}
		}
		
	}
	else if(isset($_GET['data']))
	{
		$filename = md5(time());
		$file = fopen(getcwd()."/temp/".$filename, "w");
		fwrite($file, $_GET['data']);
		fclose($file);
		echo $filename;
	}
	else if(isset($_GET['sharing']))
	{
		$file = null;
		$filename = getcwd()."/temp/".$_GET['token'].'_';
		if(file_exists($filename))
			$file = fopen($filename, "a");
		else 
			$file = fopen($filename, "w");
		fwrite($file, $_GET['sharing']."\n");
		fclose($file);
		echo 'adsfs';
	}
?>