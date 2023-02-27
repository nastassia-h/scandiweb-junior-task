<?php

namespace App\Products;

use App\Products\Product;

class Disk extends Product
{
   function __construct(array $inputs)
   {
      parent::__construct($inputs);
   }

   public function validateAttributes()
   {
      if (is_numeric($this->inputs['size']) && floatval($this->inputs['size'] >= 0)) {
         $this->attribute = $this->inputs['size'] . ' MB';
         return true;
      }

      return false;
   }
};
