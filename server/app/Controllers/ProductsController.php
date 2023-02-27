<?php

namespace App\Controllers;

use App\Services\Database;

class ProductsController
{
   public static function showAll()
   {
      $products = (new Database)->select("products");
      http_response_code(200);
      echo json_encode($products);
   }

   public static function delete($data)
   {
      $status = (new Database)->remove("products", 'sku IN (' . \R::genSlots($data['sku']) . ')', $data['sku']);

      if ($status) {
         http_response_code(200);
         $res = [
            "status" => true,
            "message" => "Products are deleted"
         ];
         echo json_encode($res);
      } else {
         http_response_code(500);
         $res = [
            "status" => false,
            "message" => "Products aren't deleted"
         ];
         echo json_encode($res);
      }
   }

   public static function add($data)
   {
      $validator = (new ProductValidator)->productValidation($data, $data['type']);

      if (!$validator['status']) {
         http_response_code(500);
      } else {
         http_response_code(201);
      }
      echo json_encode($validator);
   }
}
