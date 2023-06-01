import { useState, useEffect } from 'react'
import './App.css'
import './hero.css'
import { BiSearchAlt2 } from 'react-icons/bi';

function App() {
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [search, setSearch] = useState('');
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productImage, setProductImage] = useState('')
    const [productTag, setProductTag] = useState('')
    const [userName, setUsername] = useState('')
    const [userPassword, setUserPassword] = useState('')


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


    // Submit Event for Form
    const handleSubmitProduct = async (event) => {
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



    // ENDPOINT POST USER
    const addUser = async (userName, userPassword) => {
        setErrorMessage('');
        try {
            const response = await fetch(`/api/users`, { //Queryn var felaktig, en ${} var ej nödvändig då vi anropar det vi ber om i bodyn.
                method: 'POST',
                body: JSON.stringify({
                    name: userName,
                    password: userPassword, // 400 då number inte hade rätt typeOf
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                // Product successfully added
                // Perform any necessary actions after adding the product
                getUsers()
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
                throw new Error('An error occurred while adding the user');
            }
        } catch (error) {
            // Handle network or fetch error
            setErrorMessage(error.message);
            console.log('Error in adding user');
        }
    };

    // Submit Event for Form
    const handleSubmitUser = async (event) => {
        event.preventDefault()
        try {
            setUsername('')
            setUserPassword('')
            // adder indikation på att frontend arbetar mot backend loader tex
            await addUser(userName, userPassword)
            // töm input fält efteråt
            console.log('User added');
        } catch (error) {
            console.log(error);
        }
    }


    ///FRONTENDSIDAN


    return (
        <div>
            <header className='header'>
                <div className="hero-text">
                    <h1 className="hero-h1">POWER EXPERTS</h1>
                    <p className="hero-p">BACKEND - PROJEKT</p>
                    <hr className='hero-hr' />
                </div>
                <div className="hero-cat">
                    <p className="cat-p">Produkter</p>
                    <BiSearchAlt2 className='search-logo' />
                </div>
            </header>
            <img src="https://static01.nyt.com/images/2023/01/29/multimedia/26skateboarding-nyc-v-01-with-caption/26skateboarding-nyc-v-01-mzjb-superJumbo.jpg?quality=75&auto=webp" alt="hero-image" className='hero-img' />

            <div className='produkt-div'>

                {/* <button onClick={getProducts}> Give me some products! </button> */}
            </div>
            <div className='product-wrapper'>
                <section className="product-header">
                    <hr className='product-hr' />
                    <h2 className='product-header-h2'>PRODUKTER</h2>
                    <hr className='product-hr' />
                </section>
                <div>
                    <form onSubmit={handleSubmitProduct
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
                    <div className='search-div'>
                        <input
                            type="text"
                            placeholder='Sök efter produkt...'
                            onChange={handleSearch}
                            className='search-bar'
                        />
                    </div>
                    {products
                        ? (
                            <ul className='wrapper'>
                                {filterData.map(product => (
                                    <div className='product' key={product.id}>
                                        <img className='product-image' src={product.image}></img>
                                        <div className="product-text">
                                            <h3>Namn: {product.name}</h3>
                                            <p>Pris: {product.price}</p>
                                            <p>Id: {product.id}</p>
                                            <div className='remove-btn-div'>
                                                <button className='remove-btn' onClick={() => removeProduct(product.id)}>Ta bort produkt</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        )
                        : <p> Inga matchande produkter... </p>
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
                                        <button onClick={() => removeUser(user.id)}>Ta bort användare</button> </div>
                                ))}
                            </ul>
                        )
                        : <p> Inga matchande användare... </p>}
                    {errorMessage !== '' ? <p> Ett fel har inträffat! {errorMessage} </p> : null}
                </div>
                <div>
                    <form onSubmit={handleSubmitUser
                    } action="submit">
                        <label htmlFor="Name">Användarnamn</label>
                        <input type="text" value={userName} onChange={e => setUsername(e.target.value)} />
                        <label htmlFor="Password">Password</label>
                        <input type="text" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                        <button type="submit">Add Product</button>
                    </form>
                </div>
            </div >
        </div>
    )
}

export default App