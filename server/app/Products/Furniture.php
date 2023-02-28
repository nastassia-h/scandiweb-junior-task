<?php

namespace App\Products;

use App\Products\Product;

class Furniture extends Product
{
   function __construct(array $inputs)
   {
      parent::__construct($inputs);
   }

   public function validateAttributes()
   {
      if (is_numeric($this->inputs['height']) && is_numeric($this->inputs['width']) && is_numeric($this->inputs['length']) && floatval($this->inputs['height'] >= 0) && floatval($this->inputs['width'] >= 0) && floatval($this->inputs['length'] >= 0)) {
         $this->attribute = $this->inputs['height'] . 'x' . $this->inputs['width'] . 'x' . $this->inputs['length'];
         return true;
      }

      return false;
   }
};
