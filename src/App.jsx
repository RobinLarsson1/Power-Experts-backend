import { useState, useEffect } from 'react'
import './App.css'
import './hero.css'
import { BiSearchAlt2 } from 'react-icons/bi';

function App() {
    const [products, setProducts] = useState(null)
    const [users, setUsers] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const getProducts = async () => {
        // Ta bort eventuellt felmeddelande
        setErrorMessage('')

        // Hur skriver man URL?
        // "/api/movies"
        try {
            const response = await fetch('/api/products')
            const data = await response.json()
            setProducts(data)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const getUsers = async () => {
        setErrorMessage('')

        try {
            const response = await fetch('/api/users')
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        getProducts()
        getUsers()
    }, [])

    const removeProduct = async (product) => {
        setErrorMessage('');

        try {
            const response = await fetch(`/api/products/${product}`, { method: 'DELETE' });
            if (response.status === 200) {
                // Product successfully deleted
                // Perform any necessary actions after deletion
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
        }
    };
    const removeUser = async (user) => {
        setErrorMessage('');

        try {
            const response = await fetch(`/api/users/${user}`, { method: 'DELETE' });
            if (response.status === 200) {
                // Product successfully deleted
                // Perform any necessary actions after deletion
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
        }
    };



    ///FRONTENDSIDAN

    return (
        <div>
            <header className='header'>
                <div className="hero-text">
                <h1 className="hero-h1">POWER EXPERTS</h1>
                <p className="hero-p">BACKEND - PROJEKT</p>
                <hr className='hero-hr'/>
                </div>
                <div className="hero-cat">
                    <p className="cat-p">Produkter</p>
                    <BiSearchAlt2 />
                </div>
            </header>
            <img src="https://static01.nyt.com/images/2023/01/29/multimedia/26skateboarding-nyc-v-01-with-caption/26skateboarding-nyc-v-01-mzjb-superJumbo.jpg?quality=75&auto=webp" alt="hero-image" className='hero-img' />

            <div className='produkt-div'>
                
                <button onClick={getProducts}> Give me some products! </button>
            </div>
            <div className='product-wrapper'>
            <div >
                {products
                    ? (
                        <ul className='wrapper'>
                            {products.map(product => (
                                
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
</div>
    )
}

export default App