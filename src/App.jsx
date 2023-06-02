import { useState, useEffect } from 'react'
import './App.css'
import './hero.css'
import './products.css'
import './users.css'
import './addproducts.css'
import './addusers.css'
import { FaUserAlt } from 'react-icons/fa';
// import { addProduct } from './endpoints/POST'


function App() {
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [search, setSearch] = useState('');
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productImage, setProductImage] = useState('')
    const [userName, setUsername] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [productId, setProductId] = useState('');
    const [userId, setUserId] = useState('')
    const [editUserName, setEditUserName] = useState('')
    const [editUserPassword, setEditUserPassword] = useState('')
    const [editProductName, setEditProductName] = useState('')
    const [editProductPrice, setEditProductPrice] = useState('')
    const [editProductImage, setEditProductImage] = useState('')
    const [editProductTag, setEditProductTag] = useState('')
    const [content, setContent] = useState('products')
    const [originalContent, setOriginalContent] = useState('products');
    const [showAddProduct, setShowAddProduct] = useState('false')

    const [visibleTagButton, setVisibleTagButton] = useState(true)
    const [visibleTag, setVisibleTag] = useState(false)
    const [productTag, setProductTag] = useState('')
    const [displayTag, setDisplayTag] = useState('')


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

    const handleContentChange = (newContent) => {
        if (newContent !== content) {
            setContent(newContent);
            setDisplayTag('')
            setVisibleTag(false)
            setVisibleTagButton(!visibleTagButton)
        } else {
            setContent(originalContent);
        }
    };



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

    // Tags
    const handletag = (event) => {
        const selectedTag = event.target.textContent
        setDisplayTag(selectedTag)
    }
    const handleCategory = () => {
        setVisibleTag(!visibleTag)
    }

    const allProducts = () => {
        setDisplayTag(false)
    }


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



    const handleSubmitProducts = async (event) => {
        event.preventDefault()
        try {
            setProductName('')
            setProductPrice('')
            setProductImage('')
            setProductTag('')
            // adder indikation på att frontend arbetar mot backend loader tex
            await addProduct(productName, productPrice, productImage, productTag)
            // töm input fält efteråt
            setShowAddProduct(false)
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
                // user successfully added
                // Perform any necessary actions after adding the product
                getUsers()
            } else if (response.status === 400) {
                // Invalid request
                const errorText = await response.text();
                setErrorMessage(errorText);
            } else if (response.status === 404) {
                // user not found
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
                    <p className="cat-p" onClick={() => handleContentChange('products')}>Produkter</p>
                    <FaUserAlt className='search-logo' onClick={() => handleContentChange('users')} />
                </div>
            </header>
            <img src="https://static01.nyt.com/images/2023/01/29/multimedia/26skateboarding-nyc-v-01-with-caption/26skateboarding-nyc-v-01-mzjb-superJumbo.jpg?quality=75&auto=webp" alt="hero-image" className='hero-img' />

            <div className='produkt-div'>

            </div>
            <div className='product-wrapper'>
                <section className="product-header">
                    <hr className='product-hr' />
                    <h2 className='product-header-h2'>{content === 'products' ? 'PRODUKTER' : content === 'users' ? 'ANVÄNDARE' : ''}</h2>
                    <hr className='product-hr' />
                </section>
                {content === 'products' && (
                <div className="add-product-div">
                    <h3 className='add-text' onClick={() => setShowAddProduct(true)}>Lägg till produkt +</h3>
                </div>
                )}
                 {content === 'users' && (
                <div className="add-product-div">
                    <h3 className='add-text' onClick={() => setShowAddProduct(true)}>Lägg till användare +</h3>
                </div>
                )}
                <div >
                    <div className='search-div'>
                        {content === 'products' && (
                            <input
                                type="text"
                                placeholder='Sök efter produkt...'
                                onChange={handleSearch}
                                className='search-bar'
                            />
                        )}
                    </div>

                    <div>
                        {showAddProduct === true ? (
                            <section className='add-products-section'>
                                <form action="submit" className='add-product-form'>
                                    <input className='add-product-input' type="text" placeholder='Namn på produkt' value={productName} onChange={e => setProductName(e.target.value)} />
                                    <input className='add-product-input' type="number" placeholder='Pris' value={productPrice} onChange={e => setProductPrice(e.target.value)} />
                                    <input className='add-product-input' type="text" placeholder='URL till bild' value={productImage} onChange={e => setProductImage(e.target.value)} />
                                    <input className='add-product-input' type="text" placeholder='Tags' value={productTag} onChange={e => setProductTag(e.target.value)} />
                                    <button type="submit" className='add-product-btn' onClick={handleSubmitProducts}>Add Product</button>
                                </form>
                            </section>
                        ) : null}
                    </div>

                    {/* Handle tags */}
                    <nav className='category-container'>
                        {visibleTagButton && <button className='category-button' onClick={handleCategory}>
                            Kategori
                        </button>}
                        <ul className='category-ul'>
                            {visibleTag && <li className={'category-tags'} onClick={allProducts}>Alla produkter</li>}
                            {visibleTag &&
                                products.reduce((uniqueTags, product) => {
                                    product.tags.forEach((productTag) => {
                                        if (!uniqueTags.includes(productTag)) {
                                            uniqueTags.push(productTag);
                                        }
                                    });
                                    return uniqueTags;
                                }, []).map((uniqueTag) => (
                                    <li
                                        className={`category-tags ${uniqueTag === displayTag}`}
                                        key={uniqueTag}
                                        onClick={handletag}
                                    >
                                        {uniqueTag}
                                    </li>
                                ))}

                        </ul>
                    </nav>
                    {/* Display selected tags */}
                    {displayTag ? (
                        <div className='selected-tags'>
                            <ul className='wrapper'>
                                {products.map((product) =>
                                    product.tags.includes(displayTag) ? (
                                        <div className='product' key={product.id}>
                                            <img className='product-image' src={product.image}></img>
                                            <div className='product-text'>
                                                <h3>Namn: {product.name}</h3>
                                                <p>Pris: {product.price}</p>
                                                <p>Id: {product.id}</p>
                                                <div className='remove-btn-div'>
                                                    <button
                                                        className='remove-btn'
                                                        onClick={() => removeProduct(product.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                )}
                            </ul>
                        </div>
                    ) :
                        content === 'products'
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
                                                    <button className='remove-btn' onClick={() => removeProduct(product.id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </ul>

                            ) : content === 'users' ? (
                                // User content
                                <ul className="user-wrapper">
                                    {users.map(user => (
                                        <div className='user-card' key={user.id}>
                                            <FaUserAlt className='user-icon' />
                                            <div className="user text">
                                                <p className='username'>{user.name}</p>
                                                <p className='user-id'>ID: {user.id}</p>
                                            </div>
                                            <button onClick={() => removeUser(user.id)} className='remove-user'>Remove user</button>
                                        </div>
                                    ))}
                                    <form className='add-product-form' action="submit">
                                        <input className='add-user-input' placeholder='Ange ett nytt användarnamn' type="text" value={userName} onChange={e => setUsername(e.target.value)} />
                                        <input className='add-user-input'
                                            placeholder='Ange ett nytt lösennord' type="text" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                                        <button className='add-user-btn' type="submit" onClick={handleSubmitUser}>Lägg till ny Användare</button>
                                    </form>
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