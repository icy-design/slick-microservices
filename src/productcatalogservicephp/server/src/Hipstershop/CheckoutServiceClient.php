<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Hipstershop;

/**
 * -------------Checkout service-----------------
 *
 */
class CheckoutServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Hipstershop\PlaceOrderRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function PlaceOrder(\Hipstershop\PlaceOrderRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.CheckoutService/PlaceOrder',
        $argument,
        ['\Hipstershop\PlaceOrderResponse', 'decode'],
        $metadata, $options);
    }

}
