const productQueries = `query listProducts {
  products {
    ...productFields
  }
}

query getProduct($id: ID!) {
  product(id: $id) {
    ...productFields
  }
}

query searchProduct($query: String!) {
  searchProduct(query: $query) {
    ...productFields
  }
}

fragment productFields on Product {
  id
  name
  description
  picture
  priceUsd {
    currencyCode
    units
    nanos
  }
  categories
}`;

const orderQueries = `mutation CreateOrder {
  createOrder(
    input: {
      orderDetails: {
        productId: "the_odyssey",
        price: "105.99",
        quantity: 123
      }
    }
  ) {
    id
    orderDetails {
      id
      product {
        id
        title
        passengerCapacity
        maximumSpeed
        inStock
      }
      price
      quantity
    }
  }
}

query GetOrder {
  order(id: 1) {
    id
    orderDetails {
      id
      product {
        id
        title
        passengerCapacity
        maximumSpeed
        inStock
      }
      price
      quantity
    }
  }
}
`;

const exampleQueries = graphqlPath => {
  return [
    {
      endpoint: `${graphqlPath}`,
      name: 'Products',
      query: productQueries,
    },
    {
      endpoint: `${graphqlPath}`,
      name: 'Orders',
      query: orderQueries,
    },
  ];
};

export { exampleQueries };
