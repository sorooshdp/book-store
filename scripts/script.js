let products = getSaveProducts()
let isSearchbarClose = true;
const searchIcon = document.querySelector('#search-icon');
const searchBox = document.querySelector('.search-box');
const searchInput = document.querySelector('#search-products');

searchIcon.addEventListener('click', () => {
    if (isSearchbarClose) {
        searchInput.style.display = 'inherit'
        searchBox.style.width = '20rem'
        searchInput.style.width = '17rem'
        isSearchbarClose = false;
    } else {
        searchBox.style.width = '3rem'
        searchInput.style.display = 'none'
        isSearchbarClose = true
    }
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

