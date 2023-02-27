<?php

namespace App\Controllers;

use App\Products\Disk;
use App\Products\Book;
use App\Products\Furniture;
use App\Products\Product;
use App\Services\Database;

class ProductValidator
{
   private array $prodTypes = ['DVD', 'Book', 'Furniture'];
   private $message = null;

   public function productValidation(array $data, string $prodType)
   {
      if (!in_array($prodType, $this->prodTypes)) {
         $this->message = 'Invalid Product Type';
         return ["status" => false, "message" => $this->message];
      }

      $validatorMethod = 'validate' . $prodType;
      return $this->$validatorMethod($data);
   }

   public function validateDVD($data)
   {
      return $this->validate(new Disk($data));
   }

   public function validateBook($data)
   {
      return $this->validate(new Book($data));
   }

   public function validateFurniture($data)
   {
      return $this->validate(new Furniture($data));
   }

   public function insertProduct(Product $product)
   {
      return (new Database)->insert("products", $product->getArray());
   }

   public function validate(Product $product)
   {
      if (!$product->validateSKU())
         $this->message .= 'Invalid SKU or already exists';
      if (!$product->validateName())
         $this->message .= 'Invalid name';
      if ($product->validatePrice())
         $this->message .= 'Invalid price';
      if (!$product->validateAttributes())
         $this->message .= 'Invalid attributes';

      if (!$this->message) {
         $this->message = $this->insertProduct($product);
         return ["status" => true, "message" => $this->message];
      } else
         return ["status" => false, "message" => $this->message];
   }
}
