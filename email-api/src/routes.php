<?php

use Slim\Http\Request;
use Slim\Http\Response;

include __DIR__ . './search_body.php';

// Routes
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->post('/submit', function(Request $request, Response $response) {
	$data = $request->getBody();
	$responseArray = getResponse($data);
	$response
		->getBody()
		->write(json_encode($responseArray));
	
	return $response;
})
?>