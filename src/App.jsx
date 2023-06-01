import { useState, useEffect } from 'react'
import './App.css'
import './hero.css'
import './products.css'
import './users.css'
import './addproducts.css'
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';

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

    // ENDPOINT PUT Product
    const editProduct = async (productId, editProductName, editProductPrice, editProductImage, editProductTag) => {
        setErrorMessage('');
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: editProductName,
                    price: Number(editProductPrice),
                    image: editProductImage,
                    tags: [editProductTag],
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Product successfully edited
                // Perform any necessary actions after editing the product
                getProducts();
                console.log('Product edit successful');
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
                throw new Error('An error occurred while editing the product');
            }
        } catch (error) {
            // Handle network or fetch error
            setErrorMessage(error.message);
            console.log('Error editing product:', error);
        }
    };

    const handleSubmitEditProduct = async (event) => {
        event.preventDefault();
        try {
            // Clear input fields
            setEditProductName('');
            setEditProductPrice('');
            setEditProductImage('');
            setEditProductTag('');

            // Call the editProduct function with the appropriate parameters
            await editProduct(productId, editProductName, editProductPrice, editProductImage, editProductTag);

            console.log('Product edit done');
        } catch (error) {
            console.log(error);
        }
    };



    // ENDPOINT PUT user
    const editUser = async (userId, editUserName, editUserPassword) => {
        setErrorMessage('');
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: editUserName,
                    password: editUserPassword, // 400 då number inte hade rätt typeOf
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // user successfully edited
                // Perform any necessary actions after editing the user
                getUsers();
                console.log('user edit successful');
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
                throw new Error('An error occurred while editing the user');
            }
        } catch (error) {
            // Handle network or fetch error
            setErrorMessage(error.message);
            console.log('Error editing user:', error);
        }
    };

    const handleSubmitEditUser = async (event) => {
        event.preventDefault();
        try {
            // Clear input fields
            setUsername('');
            setUserPassword('')


            // Call the editProduct function with the appropriate parameters
            await editUser(userId, editUserName, editUserPassword);

            console.log('User edit done');
        } catch (error) {
            console.log(error);
        }
    };
    ///FRONTENDSIDAN


    return (
        <>
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

                <div className='product-wrapper'>
                    <section className="product-header">
                        <hr className='product-hr' />
                        <h2 className='product-header-h2'>{content === 'products' ? 'PRODUKTER' : content === 'users' ? 'ANVÄNDARE' : ''}</h2>
                        <hr className='product-hr' />
                    </section>
                    <div className="add-product-div">
                        <h3 className='add-text' onClick={() => setShowAddProduct(true)}>Lägg till produkt +</h3>
                    </div>
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
                                    <form onSubmit={handleSubmitProduct
                                    } action="submit" className='add-product-form'>
                                        <label htmlFor="Name">Produktnamn</label>
                                        <input className='add-product-input' type="text" value={productName} onChange={e => setProductName(e.target.value)} />
                                        <label htmlFor="Price">Pris</label>
                                        <input className='add-product-input' type="number" value={productPrice} onChange={e => setProductPrice(e.target.value)} />

                                        <label htmlFor="image">Url till bild</label>
                                        <input className='add-product-input' type="text" value={productImage} onChange={e => setProductImage(e.target.value)} />

                                        <label htmlFor="tags">Tags</label>
                                        <input className='add-product-input' type="text" value={productTag} onChange={e => setProductTag(e.target.value)} />
                                        <button className='add-product-btn' type="submit">Add Product</button>
                                    </form>
                                </section>
                            ) : null}
                        </div>

                        {/* Handle tags */}
                        <nav className='category-container'>
                            <button className='category-button' onClick={handleCategory}>
                                Kategori
                            </button>
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
                        ) : (
                            <ul className='wrapper'>
                                {filterData.map((product) => (
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
                                ))}
                            </ul>
                        )}

                        {products.length === 0 && <p>No products yet...</p>}
                        {errorMessage !== '' && (
                            <p>Ett fel har inträffat! {errorMessage}</p>
                        )}
                        <div>
                            <form onSubmit={handleSubmitUser
                            } action="submit">
                                <label htmlFor="Name">Användarnamn</label>
                                <input type="text" value={userName} onChange={e => setUsername(e.target.value)} />
                                <label htmlFor="Password">Password</label>
                                <input type="text" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                                <button type="submit">Addera Användare</button>
                            </form>
                        </div>
                        <div>
                            <form onSubmit={handleSubmitEditProduct} action="submit">
                                <label htmlFor="productID">Produkt ID</label>
                                <input type="text" value={productId} onChange={e => setProductId(e.target.value)} />
                                <label htmlFor="Name">Nytt Produktnamn</label>
                                <input type="text" value={editProductName} onChange={e => setEditProductName(e.target.value)} />
                                <label htmlFor="Price">Nytt Pris</label>
                                <input type="number" value={editProductPrice} onChange={e => setEditProductPrice(e.target.value)} />

                                <label htmlFor="image">Ny Url till bild</label>
                                <input type="text" value={editProductImage} onChange={e => setEditProductImage(e.target.value)} />

                                <label htmlFor="tags">Ny Tag</label>
                                <input type="text" value={editProductTag} onChange={e => setEditProductTag(e.target.value)} />
                                <button type="submit">Ändra Product</button>
                            </form>
                        </div>
                        <div>
                            <form onSubmit={handleSubmitEditUser} action="submit">
                                <label htmlFor="userID">Användar ID</label>
                                <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
                                <label htmlFor="Name">Nytt Användarnamn</label>
                                <input type="text" value={editUserName} onChange={e => setEditUserName(e.target.value)} />
                                <label htmlFor="Price">Nytt Lösenord</label>
                                <input type="text" value={editUserPassword} onChange={e => setEditUserPassword(e.target.value)} />

                                <button type="submit">Ändra Användare</button>
                            </form>
                        </div>
                    </div >
                </div >
            </div>

        </>
    )
}
export default App