class NavLinkComponent extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
            <a
                ${this.getAttribute("active") === this.getAttribute("to") ? 'class="active"' : null}
                href="${this.getAttribute("to")}"
            >
                ${this.textContent}
            </a>
        `
    }
}

class NavbarComponent extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
            <header class="navbar">
                <span class="nav-logo">Web Components</span>
                <nav class="nav-links">
                    <nav-link to="/" active="${this.getAttribute("active")}">Home</nav-link>
                    <nav-link to="/about.html" active="${this.getAttribute("active")}">About</nav-link>
                </nav>
            </header>
        `
    }
}

class FooterComponent extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
            <footer class="footer">
                <p>Developed by Ahmed Saber</p>
            </footer>
        `
    }
}

class ProductCard extends HTMLElement {
    constructor() {
        super()
        this.id = this.getAttribute("id")
        this.img = this.getAttribute("img")
        this.title = this.getAttribute("title")
        this.description = this.getAttribute("description")
        this.classList.add("product-card")
        this.render()
    }

    render() {
        const inCart = getProductsFromLocalStorage().includes(this.id)
        this.innerHTML = `
            <img src="${this.img}" alt="${this.title}">
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            ${inCart ? (
                '<button class="btn-remove-from-cart">remove from cart</button>'
            ) : (
                '<button class="btn-add-to-cart">add to cart</button>'
            )}
        `

        this.querySelector(".btn-add-to-cart")?.addEventListener("click", () => this.addToCart())
        this.querySelector(".btn-remove-from-cart")?.addEventListener("click", () => this.removeFromCart())
    }

    addToCart() {
        const storedProducts = getProductsFromLocalStorage()
        storedProducts.push(this.id)
        localStorage.setItem("products", JSON.stringify(storedProducts))
        this.render()
    }

    removeFromCart() {
        const storedProducts = getProductsFromLocalStorage()
        const currentProducts = storedProducts.filter(id => this.id !== id)
        localStorage.setItem("products", JSON.stringify(currentProducts))
        this.render()
    }
}

customElements.define("nav-link", NavLinkComponent)
customElements.define("navbar-component", NavbarComponent)
customElements.define("footer-component", FooterComponent)
customElements.define("product-card", ProductCard)
