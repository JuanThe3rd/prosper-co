import React from 'react';

function Product({ product, addToCart, productComponentClasses }){
    return (
        <div className={productComponentClasses}>
            <h1 className='product-page-title'>Prosper Co.</h1>

            <div className='product-page-main-content'>
                <div className='product-images-container'>
                    <img className='product-displayed-image' src={product.picture} alt={`product${product.id}_img`} />
                </div>

                <div className='product-page-details'>
                    <h1>{product.name}</h1>
                    <h2>{product.category}</h2>
                    <h3 className='product-page-price'>${product.price}</h3>

                    <div className='product-page-sizes-container'>
                        {product.sizes.split(',').map(size => (
                            <div className='product-page-size-btn-container'>
                                <button>{size}</button>
                            </div>
                        ))}
                    </div>

                    <button className='product-page-add-to-cart-btn' onClick={() => addToCart(product)}>Add to Cart</button>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Product;