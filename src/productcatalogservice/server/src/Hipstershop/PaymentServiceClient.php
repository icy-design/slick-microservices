<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Hipstershop;

/**
 * -------------Payment service-----------------
 *
 */
class PaymentServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Hipstershop\ChargeRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function Charge(\Hipstershop\ChargeRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.PaymentService/Charge',
        $argument,
        ['\Hipstershop\ChargeResponse', 'decode'],
        $metadata, $options);
    }

}
