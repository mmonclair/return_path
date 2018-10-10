<?php

/**
* Methods for parsing request body
*/

// assembles array of items to be returned
function getResponse($message){
	$response = array();
	$count = 0;
	$keys = array("To","From","Date","Subject","Message-ID");
	// iterate through keys to look for the matching line in the submitted file
	foreach($keys as $key) {
		$line = getLine($message, "$key:");
		if ($line !== 'not found') {
			$count++;
		}
		$response[$key] = $line;
	}
	
	// if more than 0 lines are found, return array. If none found, send a warning
	if ($count > 0) { 
		return $response; 
	} else {
		return array("Warning" => "The file submitted may not be a valid email message");
	}
}

// looks for each item in the return array
function getLine($message, $searchStr) {
	// create an array on each line of the text
	$lines = explode('\n', $message);
	
	// initialize a string with 'not found'
	$line = 'not found';
	
	// check each line of the text. Look for the line that 
	// starts with the $searchString. Avoid using regex matching 
	// due to possible issues with reserved characters in PHP
	foreach($lines as $k => $v) {
		if(strlen($v) > 0 && substr_compare($v, $searchStr, 0, strlen($searchStr), TRUE) === 0) {
			$line = $v;
			break;
		}
	}
	
	// clean up the line
	$line = str_replace($searchStr, '', $line);
	return trim($line);
}