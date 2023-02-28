<?php

namespace App\Products;

use App\Products\Product;

class Book extends Product
{
   function __construct(array $inputs)
   {
      parent::__construct($inputs);
   }

   public function validateAttributes()
   {
      if (is_numeric($this->inputs['weight']) && floatval($this->inputs['weight'] >= 0)) {
         $this->attribute = $this->inputs['weight'] . ' KG';
         return true;
      }

      return false;
   }
}
