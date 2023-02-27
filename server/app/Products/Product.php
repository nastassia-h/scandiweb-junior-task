<?php

namespace App\Products;

use App\Services\Database;

abstract class Product extends Database
{
   private $table_name = "products";

   protected $inputs;

   protected $sku;
   protected $name;
   protected $price;
   protected $type;
   protected $attribute;

   function __construct()
   {
      parent::__construct();
   }

   public function getArray(): array
   {
      return array("sku" => $this->sku, "name" => $this->name, "price" => $this->price, "attribute" => $this->attribute);
   }

   public function validateSKU()
   {
      return (!preg_match('/\s/', $this->sku) && !(new Database)->select($this->table_name, 'sku = ?', [$this->sku]) && (strlen($this->sku) > 0));
   }

   public function validateName()
   {
      return (strlen($this->name) > 0);
   }

   public function validatePrice()
   {
      return !(filter_var($this->price, FILTER_VALIDATE_FLOAT) && (strlen($this->price) > 0) && floatval($this->price >= 0));
   }

   abstract public function validateAttributes();
}
