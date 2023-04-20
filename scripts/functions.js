const getSaveProducts = () => {
    const productsJSON = localStorage.getItem('products')

    try {
        return productsJSON !== null ? JSON.parse(productsJSON) : []
    } catch (e) {
        return [];
    }
}

const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products))
}

const removeProduct = (id) => {
    const productIndex = products.findIndex(item => item.id === id)
    if (productIndex > -1) {
        products.splice(productIndex, 1)
    }
}

const toggleProduct = (id) => {
    const product = products.find((item) => item.id === id)
    if (product !== undefined) {
        product.exist = !product.exist
    }
}

const sortProducts = (products, sortBy) => {
    for (let i = 0; i < products.length; i++) {
        console.log(products[i].updated);
    }
    if (sortBy === "byEdited") {
        return products.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else return 0
        })
    } else if (sortBy === "byCreated") {
        return products.sort((a, b) => {
            if (a.created > b.created) {
                return -1
            } else if (a.created < b.created) {
                return 1
            } else return 0
        })
    } else {
        return products
    }
}

const renderProducts = (products, filters) => {
    products = sortProducts(products, filters.sortBy)
    let filteredProducts = products.filter(item => item.title.toLowerCase().includes(filters.searchItem.toLowerCase()))
    filteredProducts = filteredProducts.filter(item => {
        if (filters.availableProducts) {
            return item.exist
        } else {
            return true
        }
    })
    document.querySelector('#products').innerHTML = ''
    filteredProducts.forEach(function (item) {
        document.querySelector('#products').appendChild(createProductDOM(item))
    })
}

const createProductDOM = (product) => {
    const productContainer = document.createElement('div')
    const productEl = document.createElement('div')
    const divElement = document.createElement('div')
    const pContainer = document.createElement('div')
    const aContainer = document.createElement('div')
    const inputContainer = document.createElement('div')
    const btnContainer = document.createElement('div')
    const checkbox = document.createElement('input')
    const productItem = document.createElement('a')
    const removeButton = document.createElement('button')
    const productPrice = document.createElement('p')

    divElement.setAttribute('class', 'btns-container')
    productEl.setAttribute('class', 'book-container')

    productItem.setAttribute('class', 'book-link')
    productItem.textContent = product.title
    productItem.setAttribute('href', `./edit-product.html#${product.id}`)
    pContainer.appendChild(productItem)
    productEl.appendChild(pContainer)

    productPrice.setAttribute('class', 'book-price')
    productPrice.textContent = product.price
    aContainer.appendChild(productPrice)
    productEl.appendChild(aContainer)

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = !product.exist
    inputContainer.appendChild(checkbox)
    productEl.appendChild(inputContainer)
    checkbox.addEventListener('change', () => {
        toggleProduct(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

    removeButton.setAttribute('class', 'remove-btn')
    removeButton.textContent = 'Remove'
    btnContainer.appendChild(removeButton)
    divElement.appendChild(btnContainer)
    removeButton.addEventListener('click', () => {
        removeProduct(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

    productContainer.setAttribute('class', 'product-container')
    productContainer.appendChild(productEl)
    productContainer.appendChild(divElement);
    return productContainer
}

const lastEdit = (timestamp) => {
    return `last edit ${moment(timestamp).fromNow()}`
}