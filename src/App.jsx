import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [search, setSearch] = useState('');
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productImage, setProductImage] = useState('')
    const [productTag, setProductTag] = useState('')


    // ENDPOINT GET PRODUCT
    const getProducts = async () => {
        // Ta bort eventuellt felmeddelande
        setErrorMessage('')
        try {
            const response = await fetch('/api/products')
            const data = await response.json()
            setProducts(data)
        } catch (error) {
            setErrorMessage(error.message)
            console.log('Error in fetching products');

        }
    }

    // ENDPOINT GET USER
    const getUsers = async () => {
        setErrorMessage('')
        try {
            const response = await fetch('/api/users')
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            setErrorMessage(error.message)
            console.log('Error in fetching user');

        }
    }

    // useEffect för att hämta data efter events
    useEffect(() => {
        getProducts()
        getUsers()
    }, [])


    // ENDPOINT DELETE PRODUCT
    const removeProduct = async (product) => {
        setErrorMessage('');
        try {
            const response = await fetch(`/api/products/${product}`, { method: 'DELETE' });
            if (response.status === 200) {
                // Product successfully deleted
                // Perform any necessary actions after deletion
                getProducts()
            } else if (response.status === 400) {
                // Invalid ID
                const errorText = await response.text();
                setErrorMessage(errorText);
            } else if (response.status === 404) {
                // Product not found
                const errorText = await response.text();
                setErrorMessage(errorText);
            } else {
                // Other error occurred
                throw new Error('An error occurred while deleting the product');
            }
        } catch (error) {
            // Handle network or fetch error
            setErrorMessage(error.message);
            console.log('Error in removing product');

        }
    };

    // ENDPOINT DELETE USER
    const removeUser = async (user) => {
        setErrorMessage('');
        try {
            const response = await fetch(`/api/users/${user}`, { method: 'DELETE' });
            if (response.status === 200) {
                // Product successfully deleted
                // Perform any necessary actions after deletion
                getUsers()
            } else if (response.status === 400) {
                // Invalid ID
                const errorText = await response.text();
                setErrorMessage(errorText);
            } else if (response.status === 404) {
                // Product not found
                const errorText = await response.text();
                setErrorMessage(errorText);
            } else {
                // Other error occurred
                throw new Error('An error occurred while deleting the user');
            }
        } catch (error) {
            // Handle network or fetch error
            setErrorMessage(error.message);
            console.log('Error in removing user');

        }
    };

    // Search
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    const filterData = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()))


    // ENDPOINT POST PRODUCT
    const addProduct = async (productName, productPrice, productImage, productTag) => {
        setErrorMessage('');
        try {
            const response = await fetch(`/api/products`, { //Queryn var felaktig, en ${} var ej nödvändig då vi anropar det vi ber om i bodyn.
                method: 'POST',
                body: JSON.stringify({
                    name: productName,
                    price: Number(productPrice), // 400 då number inte hade rätt typeOf
                    image: productImage,
                    tags: [productTag] // 400 då array fattades, går bara addera en tag, mne är ok enligt david.
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
                setErrorMessage(errorText);
            } else if (response.status === 404) {
                // Product not found
                const errorText = await response.text();
                setErrorMessage(errorText);
            } else {
                // Other error occurred
                throw new Error('An error occurred while adding the product');
            }
        } catch (error) {
            // Handle network or fetch error
            setErrorMessage(error.message);
            console.log('Error in adding product');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setProductName('')
            setProductPrice('')
            setProductImage('')
            setProductTag('')
            // adder indikation på att frontend arbetar mot backend loader tex
            await addProduct(productName, productPrice, productImage, productTag)
            // töm input fält efteråt
            console.log('product added');
        } catch (error) {
            console.log(error);
        }
    }
    ///FRONTENDSIDAN

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit
                } action="submit">
                    <label htmlFor="Name">Produktnamn</label>
                    <input type="text" value={productName} onChange={e => setProductName(e.target.value)} />
                    <label htmlFor="Price">Pris</label>
                    <input type="number" value={productPrice} onChange={e => setProductPrice(e.target.value)} />

                    <label htmlFor="image">Url till bild</label>
                    <input type="text" value={productImage} onChange={e => setProductImage(e.target.value)} />

                    <label htmlFor="tags">Tags</label>
                    <input type="text" value={productTag} onChange={e => setProductTag(e.target.value)} />
                    <button type="submit">Add Product</button>
                </form>
            </div>
            <div >
                <input
                    type="text"
                    onChange={handleSearch}
                />
                {products
                    ? (
                        <ul className='wrapper'>
                            {filterData.map(product => (
                                <div className='product' key={product.id}>
                                    <span>
                                        Namn: {product.name}<br></br>
                                        Pris: {product.price} <br></br>
                                        Id: {product.id}
                                        <img className='product-image' src={product.image}></img>
                                    </span>
                                    <button onClick={() => removeProduct(product.id)}>Remove</button> </div>
                            ))}
                        </ul>
                    )
                    : <p> No products yet... </p>
                }
                {errorMessage !== '' ? <p> Ett fel har inträffat! {errorMessage} </p> : null}
            </div >
            <div >
                <div>
                    {/* <button onClick={getUsers}> Show me the users! </button> */}
                </div>
                {users
                    ? (
                        <ul className='wrapper'>
                            {users.map(user => (
                                <div className='user' key={user.id}> <span>
                                    Användarnamn: {user.name}
                                    Användar ID: {user.id}
                                </span>
                                    <button onClick={() => removeUser(user.id)}>Remove</button> </div>
                            ))}
                        </ul>
                    )
                    : <p> No users yet... </p>}
                {errorMessage !== '' ? <p> Ett fel har inträffat! {errorMessage} </p> : null}
            </div>
        </div >

    )
}

export default App