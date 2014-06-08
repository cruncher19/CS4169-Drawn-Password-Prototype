<!DOCTYPE html public "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/tr/HTML401/loose.dtd">
<?php
$file = fopen("test.log","a");
fwrite($file, "Attempt logged");
fclose($file);

$l = 0; #inital state of login success
$uname = trim($_POST["u"]);
$passId = trim($_POST["p"]);
$pwd = trim($_POST["pwd"]);
$attemptDuration = trim($_POST["attemptDuration"]);
$attemptCount = trim($_POST['attemptCount']);
$r = "fail";


$u = "";
$p = "";
$wat = "";

#read passwords
$handle = fopen("records.csv", "r");
if ($handle) {
	while (($line = fgets($handle)) !== false && $l==0) {
		$a = array_map('trim', explode(',', $line));
		if ($a[1] == $uname && $a[5] == "success") {
			$u = $a[1];
			$wat = $a[6];
			if ($a[2] == $passId && $a[6] == $pwd) {
				$l = 1;
				$p = $a[2];		
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
	$s =date('Y-m-d H:i:s').",".$uname.",".$passId.",".$attemptDuration.",".$attemptCount.",".$r.",".$pwd."\n";
	fwrite($file,$s);
	fclose($file);
} else {
	$u = "null";
}

// echo $u.",".$r.",".$p.",".$passId.",".$wat.",".$pwd;
echo $u.",".$r.";
?>