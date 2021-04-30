import React, { useContext, useState, useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../Utils/ProductItem/ProductItem';

const DetailProduct = () => {

    const params = useParams()

    const state = useContext(GlobalState);
    const [products] = state.productAPI.products;
    const addCart = state.userAPI.addCart;
    const [detailProducts, setDetailProducts] = useState([])

    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProducts(product)
            })
        }
    }, [params, products])

    if(detailProducts.length === 0) return null

    return (
        <>
            <div className="detail">
                <img src={detailProducts.images.url} alt=""/>
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProducts.title}</h2>
                        <h6>#: {detailProducts.product_id}</h6>
                    </div>
                    <span>$ {detailProducts.price}</span>
                    <p>{detailProducts.description}</p>
                    <p>{detailProducts.content}</p>
                    <p>Sold: {detailProducts.sold}</p>
                    <Link to="/cart" className="cart" onClick={() => addCart(detailProducts)} >Buy Now</Link>
                </div>
            </div>

            <div className="detail-related">
                <h2 className="related">Related products</h2>
                <div className="products">
                    {
                        products.map((product, key) => {
                            return product.category === detailProducts.category ? <ProductItem key={key} product={product} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
