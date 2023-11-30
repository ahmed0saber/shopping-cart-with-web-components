const getProducts = async () => {
    const res = await fetch("https://dummyjson.com/products")
    const data = await res.json()

    return data.products
}

const displayProducts = (products) => {
    const productsHtmlContent = products.map(product => (
        `
            <product-card
                id="${product.id}"
                img="${product.thumbnail}"
                title="${product.title}"
                description="${product.description}"
            ></product-card>
        `
    )).join("")

    document.querySelector(".products-container").innerHTML = productsHtmlContent
}

const initHomePage = async () => {
    const products = await getProducts()
    displayProducts(products)

    document.querySelector(".btn-remove-all-from-cart").addEventListener("click", () => {
        const storedProducts = getProductsFromLocalStorage()
        storedProducts.forEach(id => {
            document.querySelector(`.product-card[id="${id}"]`).removeFromCart()
        })
    })
}
initHomePage()
