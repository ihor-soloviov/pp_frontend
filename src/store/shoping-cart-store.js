import { makeAutoObservable } from 'mobx';

class ShoppingCartStore {
  products = [];
  promocode = false;

  constructor() {
    makeAutoObservable(this);
  }

  addProduct({ preview, name, price, count, weight, id, ingredients, category }) {
    const existingProduct = this.products.find(p => p.id === id);
    if (existingProduct) {
      existingProduct.count += count;
      existingProduct.totalPrice = existingProduct.price * existingProduct.count;
    } else {
      const product = { preview, name, price, count, weight, id, ingredients, category };
      product.totalPrice = price * count;
      this.products.push(product);
    }
    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  }

  removeProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);
    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  }

  updateCount(cartIndex, count) {
    const product = this.products[cartIndex];
    if (product) {
      product.count = count;
      product.totalPrice = product.price * count;
      localStorage.setItem("shoppingCart", JSON.stringify(this.products));
    }
  }

  getFromLocalStorage() {
    const data = localStorage.getItem("shoppingCart");
    if (data) {
      this.products = JSON.parse(data);
    }
  }

  cartPromocode() {
    this.promocode = true;
  }

  clearCart() {
    this.products = [];
    localStorage.removeItem("shoppingCart");
  }
}

const shoppingCartStore = new ShoppingCartStore();
export default shoppingCartStore;
