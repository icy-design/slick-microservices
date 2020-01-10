<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Hipstershop;

/**
 * ---------------Shipping Service----------
 *
 */
class ShippingServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Hipstershop\GetQuoteRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function GetQuote(\Hipstershop\GetQuoteRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.ShippingService/GetQuote',
        $argument,
        ['\Hipstershop\GetQuoteResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Hipstershop\ShipOrderRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function ShipOrder(\Hipstershop\ShipOrderRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.ShippingService/ShipOrder',
        $argument,
        ['\Hipstershop\ShipOrderResponse', 'decode'],
        $metadata, $options);
    }

}
