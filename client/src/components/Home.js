import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Navbar from './Navbar';
import Product from './Product';

function Home() {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productsInfo, setProductsInfo] = useState({'categories': [], 'sizes': []});
    const [cart, setCart] = useState({products: [], total: 0});
    const [page, setPage] = useState('home');
    const [currentProduct, setCurrentProduct] = useState(null);
    const all_sizes = ['XS','S','M','L','XL']

    // Try to make it so that the products in the cart fade in rather than just pop up
    const [cartProductsClasses, setCartProductsClasses] = useState('cart-product-container hide');

    console.log(cart);

    useEffect(() => {
        fetch('/products')
            .then(res => res.json())
            .then(products => {
                const temp_products = [...products];
                const temp_categories = ['All'];

                for (let i = 0; i < temp_products.length; i++){
                    temp_products[i]['quantity'] = 0;
                    temp_products[i].selected_size = null;

                    if (!temp_categories.includes(temp_products[i].category)){
                        temp_categories.push(temp_products[i].category)
                    }
                }

                setProductsInfo({'categories': temp_categories, 'sizes': all_sizes});
                setProducts(temp_products);
                setFilteredProducts(temp_products);
            })
    }, []);

    return (
        <div>
            <div className='page-background'></div>
            <Navbar cart={cart} removeProductFromCart={removeProductFromCart} goHome={goHome}/>
            
            {page ==='home' &&
                <div className='home-page'>
                    <h1 className='home-title'>Prosper Co.</h1>

                    <div className='home-page-main-content'>
                        <div className='filter-section'>
                            <input className='filter-search-bar' placeholder='Search'/>

                            <h3 className='filter-title'>Clothing Type</h3>
                            {productsInfo.categories.map(category => (
                                <p className='filter-category' onClick={() => filterProducts(category)}>{category}</p>
                            ))}

                            <h3 className='filter-title'>Sizes</h3>
                            {productsInfo.sizes.map(size => (
                                <p className='filter-category' onClick={() => filterProducts(size)}>{size.toUpperCase()}</p>
                            ))}
                        </div>
                        
                        <div className='products-container'>
                            {filteredProducts.map((product) => (
                                <div className='product-card' onClick={() => handleProductClick(product)}>
                                    <img className='product-img' src={product.picture} alt={`${product.name} img`} />
                                    <p className='product-title'>{product.name}</p>
                                    <div className='sizes-container'>
                                        {all_sizes.map(size => (
                                            <div>
                                                {product.sizes.split(',').includes(size) &&
                                                    <button className='size-btn'>{size}</button>
                                                }
                                                {!product.sizes.split(',').includes(size) &&
                                                    <div>
                                                        <button className='size-btn'>{size}</button>
                                                        <div className='strikethrough'></div>
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </div>

                                    <h2 className='product-price'>${product.price}</h2>
                                    {product.description &&
                                        <p>{product.description}</p>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {page === 'product' &&
                <div>
                    <Product product={currentProduct} addToCart={addProductToCart}/>
                </div>
            }

            <footer className='home-footer'>
                <p>Placeholder</p>
                <p className='home-footer-copyright'>Copyright 2023 © Prosper Co.</p>
            </footer>
        </div>
    )

    function goHome(){
        setPage('home');
    }

    function handleProductClick(product){
        setCurrentProduct(product);
        setPage('product');
    }

    function filterProducts(filter){
        let temp_filtered_products = [];

        if (['XS','S','M','L','XL'].includes(filter)){
            for (let i = 0; i < products.length; i++){
                if (products[i].sizes.split(',').includes(filter)){
                    temp_filtered_products.push(products[i]);
                }
            }
        } else {
            if (filter === 'All'){
                temp_filtered_products = products;
            } else {
                for (let i = 0; i < products.length; i++){
                    if (products[i].category === filter){
                        temp_filtered_products.push(products[i]);
                    }
                }
            }
        }

        setFilteredProducts(temp_filtered_products);
    }

    function addProductToCart(product, size){
        product.selected_size = size;

        if (cart.products.includes(product)){
            for(let i = 0; i < cart.products.length; i++){
                if (cart.products[i].id === product.id){
                    const temp_cart = {...cart};
                    temp_cart.products[i].quantity++;
                    temp_cart.total += product.price;
                    setCart(temp_cart);
                }
            }
        } else {
            const temp_cart = {...cart};
            const temp_product = product;
            product.quantity++;
            temp_cart.products.push(temp_product);
            temp_cart.total += product.price;
            setCart(temp_cart);
        }
    }

    function removeProductFromCart(product){
        const temp_cart = {...cart};

        for (let i = 0; i < cart.products.length; i++){
            if (cart.products[i].id === product.id){
                if (cart.products[i].quantity > 1){
                    temp_cart.products[i].quantity--;
                    temp_cart.total -= product.price;
                    setCart(temp_cart);
                } else {
                    temp_cart.products[i].quantity--;
                    const temp_products = cart.products.filter(cart_product => cart_product.id !== product.id);
                    temp_cart.products = temp_products;
                    temp_cart.total -= product.price;
                    setCart(temp_cart);
                }
            }
        }
    }
}

export default Home;