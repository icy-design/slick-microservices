<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Hipstershop;

/**
 * -----------------Currency service-----------------
 *
 */
class CurrencyServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Hipstershop\PBEmpty $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function GetSupportedCurrencies(\Hipstershop\PBEmpty $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.CurrencyService/GetSupportedCurrencies',
        $argument,
        ['\Hipstershop\GetSupportedCurrenciesResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Hipstershop\CurrencyConversionRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function Convert(\Hipstershop\CurrencyConversionRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.CurrencyService/Convert',
        $argument,
        ['\Hipstershop\Money', 'decode'],
        $metadata, $options);
    }

}
