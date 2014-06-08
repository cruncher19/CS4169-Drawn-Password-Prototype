<!DOCTYPE html public "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/tr/HTML401/loose.dtd">
<?php

	$uname = trim($_POST["u"]);
	$passId = trim($_POST["p"]);
	$pwd = trim($_POST["pwd"]);
	$attemptDuration = trim($_POST["attemptDuration"]);
	$r = "success";

	#read passwords
	$handle = fopen("records.csv", "r");
	if ($handle) {
		while (($line = fgets($handle)) !== false) {
			$a = array_map('trim', explode(',', $line));
			if ($a[1] === $uname && $a[6] === $pwd) {
				$r = "fail";
			}
		}
	} else {
	  // error opening the file.
	} 
	fclose($handle);

	
	if($r === "success") {
		$file = fopen("records.csv","a");
		$s = date('Y-m-d H:i:s').",".$uname.",".$passId.",".$attemptDuration.","."-1".",".$r.",".$pwd."\n";
		fwrite($file,$s);
		fclose($file);
	}

	echo $uname.",".$r;
?>