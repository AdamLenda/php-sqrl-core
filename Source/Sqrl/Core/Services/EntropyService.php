<?php

namespace Sqrl\Core\Services;

class EntropyService
{
  /**
   * @return string
   */
  public function generateNut()
  {
    // TODO: Generate this using true entropy from openssl
    $length = 12;
    return substr(
      str_shuffle(
        str_repeat(
          $x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
          ceil($length / strlen($x))
        )
      ),
      1,
      $length
    );
  }
}