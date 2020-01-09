<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Hipstershop;

/**
 * -------------Email service-----------------
 *
 */
class EmailServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Hipstershop\SendOrderConfirmationRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function SendOrderConfirmation(\Hipstershop\SendOrderConfirmationRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.EmailService/SendOrderConfirmation',
        $argument,
        ['\Hipstershop\PBEmpty', 'decode'],
        $metadata, $options);
    }

}
