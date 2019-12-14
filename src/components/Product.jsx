import React from 'react'
import PropTypes from 'prop-types'

export default function Product({ description, imageUrl, name, price, type }) {
    return (
        <div>
            <div>
                <img alt={name} src={imageUrl} style={{ maxHeight: 100, maxWidth: 100 }} />
            </div>
            <div>
                <h3 style={styles.noMargin}>{name}</h3>
                <h4 style={styles.noMargin}>${price}</h4>
                <h4 style={styles.noMargin}>{type}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}

Product.propTypes = {
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
}

const styles = {
    noMargin: { margin: 0 },
}