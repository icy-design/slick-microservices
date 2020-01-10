<?php

use Hipstershop\PBEmpty;
use Spiral\GRPC;

use Hipstershop\ProductCatalogServiceInterface;
use Hipstershop\Product;
use Hipstershop\ListProductsResponse;

class ProductCatalogService implements ProductCatalogServiceInterface
{
	public static $products = [];
	
	/**
	 * @param GRPC\ContextInterface $ctx
	 * @param \Hipstershop\PBEmpty $in
	 * @return \Hipstershop\ListProductsResponse
	 *p
	 * @throws GRPC\Exception\InvokeException
	 */
	public function ListProducts(
		GRPC\ContextInterface $ctx ,
		\Hipstershop\PBEmpty $in
	): Hipstershop\ListProductsResponse
	{
		$products = $this->_getProducts();
		$out = new ListProductsResponse();
		$insertProducts = [];
		foreach( $products as $product )
		{
			$productModel = new Product();
			$productModel->setId( $product['id'] );
			$productModel->setName( $product['name'] );
			$productModel->setDescription( $product['description'] );
			$productModel->setPicture( $product['picture'] );
			$productModel->setCategories( $product['categories'] );
			if( !empty( $product['priceUsd'] ) )
			{
				$money = new \Hipstershop\Money();
				$money->setCurrencyCode( $product['priceUsd']['currencyCode'] );
				if( !empty( $product['priceUsd']['nanos'] ) )
				{
					$money->setNanos( (int)$product['priceUsd']['nanos'] );
				}
				if( !empty( $product['priceUsd']['units'] ) )
				{
					$money->setUnits( (int)$product['priceUsd']['units'] );
				}
				$productModel->setPriceUsd( $money );
			}
			$insertProducts[] = $productModel;
		}
		$out->setProducts( $insertProducts );
		return $out;
	}
	
	/**
	 * @param GRPC\ContextInterface $ctx
	 * @param Hipstershop\GetProductRequest $in
	 * @return Product
	 *
	 * @throws GRPC\Exception\InvokeException
	 */
	public function GetProduct( GRPC\ContextInterface $ctx , Hipstershop\GetProductRequest $in ): Product
	{
		$products = $this->_getProducts();
		$productId = $in->getId();
		$productResponse = new Product;
		foreach( $products as $product )
		{
			if( $product['id'] == $productId )
			{
				$productResponse->setId( $productId );
				$productResponse->setName( $product['name'] );
				$productResponse->setDescription( $product['description'] );
				$productResponse->setPicture( $product['picture'] );
				$productResponse->setCategories( $product['categories'] );
				if( !empty( $product['priceUsd'] ) )
				{
					$money = new \Hipstershop\Money();
					$money->setCurrencyCode( $product['priceUsd']['currencyCode'] );
					if( !empty( $product['priceUsd']['nanos'] ) )
					{
						$money->setNanos( (int)$product['priceUsd']['nanos'] );
					}
					if( !empty( $product['priceUsd']['units'] ) )
					{
						$money->setUnits( (int)$product['priceUsd']['units'] );
					}
					$productResponse->setPriceUsd( $money );
				}
			}
		}
		return $productResponse;
	}
	
	/**
	 * @param GRPC\ContextInterface $ctx
	 * @param Hipstershop\SearchProductsRequest $in
	 * @return Hipstershop\SearchProductsResponse
	 *
	 * @throws GRPC\Exception\InvokeException
	 */
	public function SearchProducts(
		GRPC\ContextInterface $ctx ,
		Hipstershop\SearchProductsRequest $in
	): Hipstershop\SearchProductsResponse
	{
		$products = $this->_getProducts();
		$insertProducts = [];
		foreach( $products as $product )
		{
			if( stripos( $product['name'] , $in->getQuery() ) === false &&
				stripos( $product['description'] , $in->getQuery() ) === false )
			{
				continue;
			}
			
			$productModel = new Product();
			$productModel->setId( $product['id'] );
			$productModel->setName( $product['name'] );
			$productModel->setDescription( $product['description'] );
			$productModel->setPicture( $product['picture'] );
			$productModel->setCategories( $product['categories'] );
			if( !empty( $product['priceUsd'] ) )
			{
				$money = new \Hipstershop\Money();
				$money->setCurrencyCode( $product['priceUsd']['currencyCode'] );
				if( !empty( $product['priceUsd']['nanos'] ) )
				{
					$money->setNanos( (int)$product['priceUsd']['nanos'] );
				}
				if( !empty( $product['priceUsd']['units'] ) )
				{
					$money->setUnits( (int)$product['priceUsd']['units'] );
				}
				$productModel->setPriceUsd( $money );
			}
			$insertProducts[] = $productModel;
		}
		$response = new  Hipstershop\SearchProductsResponse();
		$response->setResults( $insertProducts );
		return $response;
	}
	
	private function _getProducts()
	{
		if( empty( self::$products ) )
		{
			$path = __DIR__ . '/products.json';
			$contents = file_get_contents( $path );
			self::$products = json_decode( $contents , true )['products'];
		}
		
		return self::$products;
	}
}
