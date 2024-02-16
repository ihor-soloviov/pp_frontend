import { makeAutoObservable, reaction } from "mobx";

class ShoppingCartStore {
  cartItems = [];
  promocode = false;
  totalPrice = 0

  constructor() {
    makeAutoObservable(this);
    this.loadCartFromLocalStorage();
    // Автоматично зберігає стан кошика в localStorage при будь-яких змінах
    reaction(
      () => [this.cartItems, this.totalPrice],
      () => {
        localStorage.setItem('shoppingCart', JSON.stringify(this.cartItems));
        localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
      }
    );
  }

  loadCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice') || '0');
    this.cartItems = cartItems;
    this.totalPrice = totalPrice;
  }

  addProduct = (product) => {
    const { price, count, mods = [] } = product;

    const modsPrice = mods.reduce((acc, mod) => acc + (mod.price || 0), 0);
    const totalPrice = count * (price + modsPrice);
    const newProduct = { ...product, totalPrice };

    this.cartItems.push(newProduct);
    this.totalPrice += totalPrice
  };

  removeFromCart = (id) => {
    const itemIndex = this.cartItems.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      this.totalPrice -= this.cartItems[itemIndex].totalPrice;
      this.cartItems.splice(itemIndex, 1);
    }
  }

  get itemCount() {
    return this.cartItems.length;
  }

  get cartTotalPrice() {
    return this.totalPrice
  }

  getItemById = (id) => {
    return this.cartItems.find(item => item.id === id);
  }

  updateItemQuantity = (id, newCount) => {
    const itemIndex = this.cartItems.findIndex(item => item.id === id);
    if (itemIndex > -1) {
      const item = this.cartItems[itemIndex];
      const modsPrice = item.mods.reduce((acc, mod) => acc + mod.price, 0);
      const totalPrice = newCount * (item.price + modsPrice);

      this.cartItems[itemIndex] = { ...item, count: newCount, totalPrice };
      // Перерахунок загальної вартості кошика
      this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    }
  }

  cartPromocode = () => {
    this.promocode = true;
  };

  clearCart = () => {
    this.cartItems = [];
    this.totalPrice = 0
    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("posterOrder");
    localStorage.removeItem("poster_order");
    localStorage.removeItem("user_payment_data");
    localStorage.removeItem("user_order_data");
  }
}

const shoppingCartStore = new ShoppingCartStore();
export default shoppingCartStore;
