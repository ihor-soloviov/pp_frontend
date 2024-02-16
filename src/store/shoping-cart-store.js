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
    const { id, price, count, mods = [] } = product;

    // Функція для перевірки еквівалентності модифікаторів
    const areModifiersEqual = (mods1, mods2) => {
      if (mods1.length !== mods2.length) return false;
      return mods1.every(mod1 => {
        const mod2 = mods2.find(m => m.m === mod1.m);
        return mod2 && mod1.a === mod2.a;
      });
    };

    const modsPrice = mods.reduce((acc, mod) => acc + (mod.price || 0), 0);
    const totalPriceForProduct = count * (price + modsPrice);

    // Перевірка наявності товару з такими ж модифікаторами
    const existingProductIndex = this.cartItems.findIndex(item => item.id === id && areModifiersEqual(item.mods, mods));

    if (existingProductIndex >= 0) {
      // Якщо товар з такими ж модифікаторами вже є, збільшуємо кількість
      const existingProduct = this.cartItems[existingProductIndex];
      existingProduct.count += count;
      existingProduct.totalPrice += totalPriceForProduct;
      this.cartItems[existingProductIndex] = existingProduct;
    } else {
      // Якщо немає точно такого товару, додаємо як новий
      const cartItemId = Date.now() + Math.random().toString(16).substring(2);
      this.cartItems.push({ ...product, totalPrice: totalPriceForProduct, cartItemId });
    }
    this.totalPrice += totalPriceForProduct
  };

  removeFromCart = (cartItemId) => {
    const itemIndex = this.cartItems.findIndex(item => item.cartItemId === cartItemId);
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

  getItemById = (cartItemId) => {
    return this.cartItems.find(item => item.cartItemId === cartItemId);
  }

  updateItemQuantity = (cartItemId, newCount) => {
    const itemIndex = this.cartItems.findIndex(item => item.cartItemId === cartItemId);
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
