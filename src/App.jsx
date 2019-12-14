import React, { Component } from 'react'
import Product from './components/Product'
import { searchProducts } from './services/product'
import deferred from './utils/deferred'

export default class ProductSearch extends Component {
    constructor() {
        super()

        this.state = {
            perPage: 10,
            page: 1,
            products: [],
            query: '',
        }

        this.getProducts = deferred(
            this.getProducts,
            200,
            this,
            () => this.abort && this.abort()
        )
    }

    getProducts(query) {
        if (!query) return this.setState({ products: [], query })
        const [promise, abort] = searchProducts(query)
        this.abort = abort
        promise.then(products => this.setState({ products, query }))
    }

    render() {
        const { products, query } = this.state
        return (
            <div style={styles.container}>
                <h3 style={styles.noMargin}>Search Products:</h3>
                <div>
                    <input
                        onChange={e => this.getProducts(e.target.value)}
                        placeholder='Enter keywords. Eg: cheese'
                        style={styles.input}
                        type='text'
                    />
                </div>
                <div>
                    {products.map(product => <Product key={product.id} {...product} />)}
                    {query && products.length === 0 && 'Your search yielded no results'}
                </div>
            </div>
        )
    }
}

const styles = {
    container: { margin: '50px auto', width: 400 },
    input: { padding: 5, width: 200 },
    noMargin: { margin: 0 },
}