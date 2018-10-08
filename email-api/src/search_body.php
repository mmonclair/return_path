<?php

function getResponse($message){
	$response = array(
		"To" => getLine($message, 'To:'),
		"From" => getLine($message, 'From:'),
		"Date" => getLine($message, 'Date:'),
		"Subject" => getLine($message, 'Subject:'),
		"Message-ID" => getLine($message, 'Message-ID:')
	);
	
	//$responseJson = json_encode[$response];
	return $response;
}

function getLine($message, $searchStr) {
	$lines = explode(PHP_EOL, $message);
	$line = '';
	foreach($lines as $k => $v) {
		if(substr_compare($v, $searchStr, 0, strlen($searchStr), TRUE) === 0) {
			$line = $v;
			break;
		}
	}
	$line = str_replace($searchStr, '', $line);
	return trim($line);
}