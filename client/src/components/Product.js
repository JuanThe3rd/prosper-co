import React, { useState } from 'react';

function Product({ product, addToCart }){
    const [currentSize, setCurrentSize] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [displayedImage, setDisplayedImage] = useState(product.picture.split(' ')[0]);

    return (
        <div className='product-page'>
            <h1 className='product-page-title'>Prosper Co.</h1>

            <div className='product-page-main-content'>
                <div className='product-images-container'>
                    <div className='product-side-images-container'>
                        {product.picture.split(' ').map((picture, index) => (
                            <img className='product-side-img' src={picture} onClick={() => setDisplayedImage(picture)} alt={product.id} key={`${product.name}_image_${index}`} />
                        ))}
                    </div>
                    <img className='product-displayed-image' src={displayedImage} alt={`product${product.id}_img`} />
                </div>
                
                <div className='product-page-details'>
                    <h1>{product.name}</h1>
                    <h2>{product.category}</h2>
                    {errorMsg &&
                        <p>{errorMsg}</p>
                    }
                    <div className='product-page-price-sizes'>
                        <h3 className='product-page-price'>${product.price}</h3>

                        <div className='product-page-sizes-container'>
                            {product.sizes.split(',').map(size => (
                                <div className='product-page-size-btn-container'>
                                    <button onClick={() => setCurrentSize(size)}>{size}</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className='product-page-add-to-cart-btn' onClick={() => handleAddToCartBtn(product, currentSize)}>Add to Cart</button>
                    {product.description &&
                        <p>{product.description}</p>
                    }
                </div>
            </div>
        </div>
    )

    function handleAddToCartBtn(product, size){
        if (size !== null){
            addToCart(product, size);
            setCurrentSize(null);
        } else {
            setErrorMsg('Select a Size');

            setTimeout(() => {
                setErrorMsg(null);
            }, 2000);
        }
    }
}

export default Product;