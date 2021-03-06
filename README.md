# K8S GraphQL/gRPC Microservices Template

This project is a cloud native microservices monorepo project based on [Google Hipster Shop Demo](https://github.com/GoogleCloudPlatform/microservices-demo).
The project can serve as a startup template to utilize a modularized microservices technologies like
Kubernetes/GKE, gRPC, GraphQL and Istio.

This project is managed in a monorepo based on Skaffold/Cloud Code for easy developing and deploying. This application
works on any Kubernetes cluster (such as a local one), as well as Google Kubernetes Engine.

## Service Architecture

The application is a web-based shop demo composed of many microservices 
written in different languages that talk to each other via gRPC. 

[![Architecture of
microservices](./docs/img/architecture-diagram.png)](./docs/img/architecture-diagram.png)

Find **Protocol Buffers Descriptions** at the [`./pb` directory](./pb).

| Service                                              | Language        | Description                                                                                                                       |
| ---------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [frontend](./src/frontend)                           | Go              | Exposes an HTTP server to serve the website. Does not require signup/login and generates session IDs for all users automatically. |
| [gateway](./src/gateway)                             | Node/Typescript | GraphQL gateway to backend microservices.                                                                                         |
| [cartservice](./src/cartservice)                     | C#              | Stores the items in the user's shopping cart in Redis and retrieves it.                                                           |
| [productcatalogservice](./src/productcatalogservice) | PHP             | Provides the list of products from a JSON file and ability to search products and get individual products.                        |
| [currencyservice](./src/currencyservice)             | Node/JS         | Converts one money amount to another currency. Uses real values fetched from European Central Bank. It's the highest QPS service. |
| [paymentservice](./src/paymentservice)               | Node/JS         | Charges the given credit card info (mock) with the given amount and returns a transaction ID.                                     |
| [shippingservice](./src/shippingservice)             | Go              | Gives shipping cost estimates based on the shopping cart. Ships items to the given address (mock)                                 |
| [emailservice](./src/emailservice)                   | Python 3        | Sends users an order confirmation email (mock).                                                                                   |
| [checkoutservice](./src/checkoutservice)             | Go              | Retrieves user cart, prepares order and orchestrates the payment, shipping and the email notification.                            |
| [recommendationservice](./src/recommendationservice) | Python 2        | Recommends other products based on what's given in the cart.                                                                      |
| [adservice](./src/adservice)                         | Java            | Provides text ads based on given context words.                                                                                   |
| [loadgenerator](./src/loadgenerator)                 | Python/Locust   | Continuously sends requests imitating realistic user shopping flows to the frontend.  
