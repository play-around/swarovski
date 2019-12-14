const API_URL = 'https://latency-dsn.algolia.net/1/indexes/*/queries?x-algolia-api-key=6be0576ff61c053d5f9a3225e2a90f76&x-algolia-application-id=latency'

export const searchProducts = (query = '', perPage = 10, page = 1) => {
    const xhr = new XMLHttpRequest()
    const data = {
        requests: [
            {
                indexName: `ikea`,
                params: `query=${encodeURIComponent(query)}&hitsPerPage=${perPage}&page=${page}`,
            }
        ]
    }
    const promise = new Promise((resolve, reject) => {
        xhr.open('POST', API_URL)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
        xhr.responseType = 'json'
        xhr.send(JSON.stringify(data))
        xhr.onload = () => {
            const { response } = xhr
            const products = response.results[0].hits.map(({ description, image, name, objectID, price, type }) => ({
                description,
                id: objectID,
                imageUrl: image,
                name,
                price,
                type,
            }))
            resolve(products)
        }
        xhr.onerror = reject
    })

    const abortCb = () => xhr.abort() | console.log('request aborted')
    return [promise, abortCb]
}