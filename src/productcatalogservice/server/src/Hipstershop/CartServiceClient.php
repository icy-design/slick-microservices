<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Hipstershop;

/**
 * -----------------Cart service-----------------
 *
 */
class CartServiceClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Hipstershop\AddItemRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function AddItem(\Hipstershop\AddItemRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.CartService/AddItem',
        $argument,
        ['\Hipstershop\PBEmpty', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Hipstershop\GetCartRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function GetCart(\Hipstershop\GetCartRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.CartService/GetCart',
        $argument,
        ['\Hipstershop\Cart', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Hipstershop\EmptyCartRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function EmptyCart(\Hipstershop\EmptyCartRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.CartService/EmptyCart',
        $argument,
        ['\Hipstershop\PBEmpty', 'decode'],
        $metadata, $options);
    }

}
