let products = getSaveProducts()
const searchIcon = document.querySelector('.search-icon');
const searchBox = document.querySelector('.search-box');
const searchInput = document.querySelector('#search-products');

searchIcon.addEventListener('mouseover', () => {
    searchInput.style.transition = 'all 0.8s ease'
    searchInput.style.display = 'inherit'
    setTimeout(() => {
        for (let i = 1; i <= 6; i++) {
            searchInput.style.width = `${i}rem`
        }
    }, 200);
}
)

searchIcon.addEventListener('mouseleave', () => {
    setTimeout(() => {
        for (let i = 5; i >= 0; i--) {
            searchInput.style.width = `${i}rem`
        }
    }, 150);
    setTimeout(() => {
        searchInput.style.display = 'none'
    }, 900)
})

const filters = {
    searchItem: '',
    availableProducts: false,
    sortBy: 'byEdited'
}

renderProducts(products, filters)

document.querySelector('#search-products').addEventListener('input', (e) => {
    filters.searchItem = e.target.value
    renderProducts(products, filters)
})

document.querySelector('#add-product-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const timeStamp = moment().valueOf();
    if (e.target.elements.productTitle.value === '' || e.target.elements.productPrice === '') {
        window.alert('please enter name and price for book')
    }
    else {
        products.push({
            id: uuidv4(),
            title: e.target.elements.productTitle.value,
            price: e.target.elements.productPrice.value,
            exist: true,
            created: timeStamp,
            updated: timeStamp
        })
        saveProducts(products)
        renderProducts(products, filters)
        e.target.elements.productTitle.value = ''
        e.target.elements.productPrice.value = ''
    }
})

document.querySelector('#available-products').addEventListener('change', (e) => {
    filters.availableProducts = e.target.checked
    renderProducts(products, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === "products") {
        products = JSON.parse(e.newValue);
        renderProducts(products, filters);
    }
})

document.querySelector('#sort').addEventListener('change', (e) => {
    filters.sortBy = e.target.value;
    renderProducts(products, filters);
})

