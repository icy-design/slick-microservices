const productQueries = `query ListProducts {
  products {
    ...productFields
  }
}

query GetProduct($id: ID!) {
  product(id: $id) {
    ...productFields
  }
}

query SearchProduct($query: String!) {
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

const cartQueries = `mutation AddItem($productId: ID!, $quantity: Int!) {
  addItem(productId: $productId, quantity: $quantity)
}

mutation EmptyCart {
  emptyCart()
}

query GetCart {
  carts {
    items {
      product {
        id
        name
      }
      quantity
    }
  }
}`;

const exampleQueries = graphqlPath => {
  return [
    {
      endpoint: `${graphqlPath}`,
      name: 'Product',
      query: productQueries,
    },
    {
      endpoint: `${graphqlPath}`,
      name: 'Cart',
      query: cartQueries,
    },
  ];
};

export { exampleQueries };
