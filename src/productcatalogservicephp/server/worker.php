<?php
/**
 * Sample GRPC PHP server.
 */

use Spiral\Goridge;
use Spiral\RoadRunner;

ini_set('display_errors', 'stderr');
require "vendor/autoload.php";

$server = new \Spiral\GRPC\Server();
$server->registerService(\Service\EchoInterface::class, new EchoService());
$server->registerService(\Hipstershop\ProductCatalogServiceInterface::class , new ProductCatalogService());

$w = new RoadRunner\Worker(new Goridge\StreamRelay(STDIN, STDOUT));
$server->serve($w);
