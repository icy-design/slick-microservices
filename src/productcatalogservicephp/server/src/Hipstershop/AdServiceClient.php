<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Hipstershop;

/**
 * ------------Ad service------------------
 *
 */
class AdServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Hipstershop\AdRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function GetAds(\Hipstershop\AdRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.AdService/GetAds',
        $argument,
        ['\Hipstershop\AdResponse', 'decode'],
        $metadata, $options);
    }

}
