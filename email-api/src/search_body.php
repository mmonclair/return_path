<?php

/**
* Methods for parsing request body
*/

// assembles array of items to be returned
function getResponse($message){
	$response = array(
		"To" => getLine($message, 'To:'),
		"From" => getLine($message, 'From:'),
		"Date" => getLine($message, 'Date:'),
		"Subject" => getLine($message, 'Subject:'),
		"Message-ID" => getLine($message, 'Message-ID:')
	);
	
	return $response;
}

// looks for each item in the return array
function getLine($message, $searchStr) {
	// create an array on each line of the text
	$lines = explode('\n', $message);
	
	// initialize a blank string
	$line = '';
	
	// check each line of the text. Look for the line that 
	// starts with the $searchString. Avoid using regex matching 
	// due to possible issues with reserved characters in PHP
	foreach($lines as $k => $v) {
		if(substr_compare($v, $searchStr, 0, strlen($searchStr), TRUE) === 0) {
			$line = $v;
			break;
		}
	}
	
	// clean up the line
	$line = str_replace($searchStr, '', $line);
	return trim($line);
}