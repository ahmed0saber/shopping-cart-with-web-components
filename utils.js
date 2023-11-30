const getProductsFromLocalStorage = () => {
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
        return JSON.parse(storedProducts)
    }

    return []
}
