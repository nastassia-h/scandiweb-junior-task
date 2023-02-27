<?php

namespace App\Services;

class Router
{
   private static $list = [];

   public static function action($uri, $controller, $method = 'GET')
   {
      self::$list[] = [
         "method" => $method,
         "uri" => $uri,
         "controller" => $controller
      ];
   }

   public static function enable()
   {
      $query = isset($_GET['q']) ? $_GET['q'] : '';

      foreach (self::$list as $route) {
         if ($route["uri"] === '/' . $query && $_SERVER['REQUEST_METHOD'] === $route['method']) {
            if ($route['method'] === "POST") {
               call_user_func($route['controller'], $_POST);
            } elseif ($route['method'] === "GET" || $route['method'] === "DELETE") {
               call_user_func($route['controller'], $_GET);
            }
         }
      }
   }
}
