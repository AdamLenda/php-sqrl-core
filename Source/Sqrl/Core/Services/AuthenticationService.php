<?php

namespace Sqrl\Core\Services;

use Sqrl\Core\Configuration\ServerSettings;

class AuthenticationService
{
  protected $sqrlDataAccess;
  /**
   * @var ServerSettings
   */
  private $settings;
  /**
   * @var EntropyService
   */
  private $entropyService;

  public function __construct(
    ServerSettings $settings,
    EntropyService $entropyService
  ) {
    $this->settings = $settings;
    $this->entropyService = $entropyService;
  }

  public function nut(&$nut, &$cancelUri)
  {
    $nut = $this->entropyService->generateNut();
    $cancelUri = $this->settings->getCancelAuthenticationUri();
  }
}
