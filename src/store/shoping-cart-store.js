import { makeAutoObservable } from "mobx";

class ShoppingCartStore {
  products = [];
  promocode = false;

  constructor() {
    makeAutoObservable(this);
  }

  addProduct = ({
    preview,
    name,
    price,
    count,
    weight,
    id,
    ingredients,
    category,
  }) => {
    const product = {
      preview,
      name,
      price,
      count,
      weight,
      id,
      ingredients,
      category,
    };
    product.totalPrice = price * count;
    this.products.push(product);

    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  };

  removeProduct = (productId) => {
    this.products = this.products.filter((product) => product.id !== productId);
    localStorage.setItem("shoppingCart", JSON.stringify(this.products));
  };

  updateCount = (id, count) => {
    const product = this.products.find((el) => el.id === id);

    if (product) {
      product.count = count;
      product.totalPrice = product.price * count;
      localStorage.setItem("shoppingCart", JSON.stringify(this.products));
    }
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
