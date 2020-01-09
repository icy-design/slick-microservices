<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Hipstershop;

/**
 * ---------------Product Catalog----------------
 *
 */
class ProductCatalogServiceClient extends \Grpc\BaseStub {

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
    public function ListProducts(\Hipstershop\PBEmpty $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.ProductCatalogService/ListProducts',
        $argument,
        ['\Hipstershop\ListProductsResponse', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Hipstershop\GetProductRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function GetProduct(\Hipstershop\GetProductRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.ProductCatalogService/GetProduct',
        $argument,
        ['\Hipstershop\Product', 'decode'],
        $metadata, $options);
    }

    /**
     * @param \Hipstershop\SearchProductsRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function SearchProducts(\Hipstershop\SearchProductsRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/hipstershop.ProductCatalogService/SearchProducts',
        $argument,
        ['\Hipstershop\SearchProductsResponse', 'decode'],
        $metadata, $options);
    }

}
