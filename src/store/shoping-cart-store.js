import { makeAutoObservable } from "mobx";

class ShoppingCartStore {
  products = [];
  promocode = false;

  constructor() {
    makeAutoObservable(this);
  }

  addProduct = (product) => {
    const { price, count, mods } = product;

    const modsPrice = mods.reduce((acc, mod) => acc + mod.price, 0);
    const totalPrice = count * (price + modsPrice);
    const newProduct = { ...product, totalPrice };

    this.products.push(newProduct);

    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  };

  removeProduct = (productId) => {
    this.products = this.products.filter((product) => product.id !== productId);
    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  };

  getCartItem = (productId) => {
    if (!this.products.length) {
      return
    }

    return this.products.find(el => el.id === productId)
  }

  getCartTotalPrice = () => {
    if (!this.products.length) {
      console.log("кошик порожній");
      return
    }

    return this.products.reduce((a, b) => {
      return a + b.totalPrice
    }, 0)
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
    setCartItem(updatedItem);
  
    // Оновлюємо продукт безпосередньо у масиві
    this.products[productIndex] = updatedItem;
  
    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  };
  
  getCartProductsFromLS = () => {
    const data = localStorage.getItem("shoppingCart");

    if (!data) {
      return
    }
    this.products = JSON.parse(data);
  };

  cartPromocode = () => {
    this.promocode = true;
  };

  clearCart = () => {
    this.products = [];
    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("posterOrder");
    localStorage.removeItem("poster_order");
    localStorage.removeItem("user_payment_data");
    localStorage.removeItem("user_order_data");
  }
}

const shoppingCartStore = new ShoppingCartStore();
export default shoppingCartStore;
