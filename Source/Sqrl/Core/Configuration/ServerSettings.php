<?php

namespace Sqrl\Core\Configuration;

class ServerSettings
{
  //region WebSiteBaseUri Property
  /**
   * @internal This value is managed by setWebSiteBaseUri and getWebSiteBaseUri.
   * Direct access is discouraged.
   *
   * @var string|null A string or null for no value.
   */
  private $webSiteBaseUri = null;
  /**
   * @internal This value is managed by setCancelAuthenticationUri and getCancelAuthenticationUri.
   * Direct access is discouraged.
   *
   * @var string|null A string or null for no value.
   */
  private $cancelAuthenticationUri = null;

  /**
   * Accessor method to get the WebSiteBaseUri value.
   *
   * Example: HTTPS://www.example.com should returned by this function as the string "www.example.com"
   *
   * @return string|null A string or null for no value.
   */
  public function getWebSiteBaseUri()
  {
    return $this->webSiteBaseUri;
  }
  //endregion WebSiteBaseUri Property

  //region CancelAuthenticationUri Property

  /**
   * Fluent accessor method to set the WebSiteBaseUri value.
   *
   * Example: HTTPS://www.example.com should be passed into this function as the string "www.example.com"
   *
   * @param string|null $webSiteBaseUri A string or null for no value.
   * @return $this
   */
  public function setWebSiteBaseUri($webSiteBaseUri)
  {
    $this->webSiteBaseUri = $webSiteBaseUri;
    return $this;
  }

  /**
   * Accessor method to get the CancelAuthenticationUri value.
   *
   * @return string|null A string or null for no value.
   */
  public function getCancelAuthenticationUri()
  {
    return $this->cancelAuthenticationUri;
  }

  /**
   * Fluent accessor method to set the CancelAuthenticationUri value.
   *
   * @param string|null $cancelAuthenticationUri A string or null for no value.
   * @return $this
   */
  public function setCancelAuthenticationUri($cancelAuthenticationUri)
  {
    $this->cancelAuthenticationUri = $cancelAuthenticationUri;
    return $this;
  }
  //endregion CancelAuthenticationUri Property

}