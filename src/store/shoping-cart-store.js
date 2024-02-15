import { makeAutoObservable } from "mobx";

class ShoppingCartStore {
  products = [];
  promocode = false;
  totalPrice = 0

  constructor() {
    makeAutoObservable(this);
  }

  addProduct = (product) => {
    const { price, count, mods } = product;

    const modsPrice = mods.reduce((acc, mod) => acc + mod.price, 0);
    const totalPrice = count * (price + modsPrice);
    const newProduct = { ...product, totalPrice };

    this.products.push(newProduct);
    this.totalPrice += totalPrice

    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  };

  removeProduct = (productId) => {
    const productIndex = this.products.findIndex((product) => product.id === productId);
    if (productIndex > -1) {
      // Знайшли продукт, віднімаємо його вартість від загальної суми
      this.totalPrice -= this.products[productIndex].totalPrice;

      // Видаляємо продукт з масиву
      this.products.splice(productIndex, 1);
    }
    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  };

  getCartItem = (productId) => {
    if (!this.products.length) {
      return
    }

    return this.products.find(el => el.id === productId)
  }

  getCartTotalPrice = () => {
    return this.totalPrice
  }

  updateCount = (id, count, setCartItem) => {
    if (!this.products.length) {
      return;
    }

    const productIndex = this.products.findIndex((el) => el.id === id);
    if (productIndex === -1) {
      console.log('Продукт не знайдено');
      return;
    }

    const product = this.products[productIndex];
    const modsPrice = product.mods.reduce((acc, mod) => acc + mod.price, 0);

    const updatedItem = { ...product, count, totalPrice: (product.price + modsPrice) * count };
    this.totalPrice -= updatedItem.totalPrice
    setCartItem(updatedItem);

    // Оновлюємо продукт безпосередньо у масиві
    this.products[productIndex] = updatedItem;

    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  };

  setCartProductsFromLS = () => {
    const data = localStorage.getItem("shoppingCart");

    if (!data) {
      return
    }
    const productsFromLS = JSON.parse(data)
    this.products = productsFromLS;
    this.totalPrice = productsFromLS.reduce((a, b) => a + b.totalPrice, 0)
  };

  cartPromocode = () => {
    this.promocode = true;
  };

  clearCart = () => {
    this.products = [];
    this.totalPrice = 0
    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("posterOrder");
    localStorage.removeItem("poster_order");
    localStorage.removeItem("user_payment_data");
    localStorage.removeItem("user_order_data");
  }
}

const shoppingCartStore = new ShoppingCartStore();
export default shoppingCartStore;
