<?php

use App\Services\Router;

Router::action('/addproduct', 'App\Controllers\ProductsController::add', 'POST');
Router::action('/', 'App\Controllers\ProductsController::showAll');
Router::action('/', 'App\Controllers\ProductsController::delete', 'POST');

Router::enable();
