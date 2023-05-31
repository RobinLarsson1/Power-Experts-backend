import { useState } from 'react'
import './App.css'
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

    ///FRONTENDSIDAN

    return (
        <div>
            <header className='header'>
                <div className="hero-text">
                <h1 className="hero-h1">POWER EXPERTS</h1>
                <p className="hero-p">Backend - Projekt</p>
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
                {products
                    ? (
                        <ul>
                            {products.map(product => (
                                <li key={product.id}> {product.name} {product.price}  </li>
                            ))}
                        </ul>
                    )
                    : <p> No products yet... </p>}

                {errorMessage !== '' ? <p> Ett fel har inträffat! {errorMessage} </p> : null}
            </div>
            <div className='user-wrapper'>
                <div>
                    <button onClick={getUsers}> Show me the users! </button>
                </div>
                {users
                    ? (
                        <ul>
                            {users.map(user => (
                                <li key={user.id}> {user.name} {user.id}  </li>
                            ))}
                        </ul>
                    )
                    : <p> No users yet... </p>}

                {errorMessage !== '' ? <p> Ett fel har inträffat! {errorMessage} </p> : null}
            </div>
        </div>

    )
}

export default App