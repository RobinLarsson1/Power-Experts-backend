# Power-Experts-backend

## Description
This is an API for our school task to, the task was to create our own API to handle small scale data for a webapp.
And so it does.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Examples](#examples)
Contributing
License


## Installation
<a name="installation"></a>
Dependencies:

    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "lowdb": "^6.0.1",


Provide instructions on how to install and set up your API. Include any prerequisites, such as required software or dependencies. You can also include code snippets or commands to guide developers through the installation process.

## Usage
<a name="usage"></a>
Explain how developers can use your API. Provide code examples and explain the available endpoints, request/response formats, and any authentication mechanisms. Include any special considerations or best practices for using your API effectively.

## API Documentation
<a name="api-documentation"></a>
https://docs.google.com/document/d/1usF0YqcRgRNmjQWBgD4vGfIweJSCL3gZU-dlWhoY0f4/edit
Link to the full API documentation if available. This could be a separate document or a dedicated section within the README.md file. Make sure the documentation is up to date and comprehensive, providing detailed information about each endpoint, parameters, response formats, error handling, etc.

## Examples
<a name="examples"></a>
Get all Products 

    // ENDPOINT GET PRODUCT
    const getProducts = async () => {
        try {
            const response = await fetch('/api/products')
            const data = await response.json()
            setProducts(data)
        } catch (error) {
            console.log('Error in fetching products');
        }
    }
Upload new Product

    // ENDPOINT POST PRODUCT
    const addProduct = async () => {
        try {
            const response = await fetch(`/api/products`, {
                method: 'POST',
                body: JSON.stringify({
                    name: productName,
                    price: Number(productPrice),
                    image: productImage,
                    tags: [productTag]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                // Product successfully added
                // Perform any necessary actions after adding the product
                getProducts()
            } else if (response.status === 400) {
                // Invalid request
                const errorText = await response.text();
            } else if (response.status === 404) {
                // Product not found
                const errorText = await response.text();
            } else {
                // Other error occurred
                throw new Error('An error occurred while adding the product');
            }
        } catch (error) {
            console.log('Error in adding product');
        }
    };

## Contributing
Please Submit any issues found regarding the API, We'd be happy to improve ourselves for future endeavours :)

## License
Specify the license under which you're releasing your API. Choose an appropriate open-source license and include the license text or a link to it.

## Contact Information
https://github.com/Hollgy
https://github.com/RobinLarsson1
https://github.com/Willi4mL


