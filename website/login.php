<!DOCTYPE html public "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/tr/HTML401/loose.dtd">
<?php

$l = 0; #inital state of login success
$uname = trim($_GET["u"]);
$passId = trim($_GET["p"]);
$pwd = trim($_GET["pwd"]);
$attemptDuration = trim($_GET["attemptDuration"]);
$attemptCount = trim($_GET['attemptCount']);
$r = "fail";

$u = "";
$p = "";

#read passwords
$handle = fopen("records.csv", "r");
if ($handle) {
	while (($line = fgets($handle)) !== false && $l==0) {
		$a = explode(',', $line);
		if ($a[1] == $uname && $a[5] == "success") {
			$u = $a[1];
			if ($a[2] == $passId) {
				$l = 1;				
			}
		}
	}
} else {
  // error opening the file.
} 
fclose($handle);

#record activities 
if ($l == 1) $r = "success";
if($u) {
	$file = fopen("records.csv","a");
	$s =date('Y-m-d H:i:s').",".$uname.",".$passId.",".$attemptDuration.",".$attemptCount.",".$r."\n";
	fwrite($file,$s);
	fclose($file);
} else {
	$u = "null";
}

#HOW TO PASS VALIDATION OUTCOME TO BRAD? $l or $r?
echo $u.",".$r
print 'done';
?>