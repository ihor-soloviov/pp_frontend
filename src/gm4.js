// Перегляд категорії товарів

export const view_item_list = (category_id, category_name, items) => {
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "view_item_list",
    ecommerce: {
      item_list_id: category_id,
      item_list_name: category_name,
      items: items.map(item => ({
        item_id: item.product_id,
        item_name: item.product_name,
      }))
    }
  })
}


//Просмотр карточки товара

export const view_item = (item_name, item_id, price, item_category) => {
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "view_item",
    ecommerce: {
      items: [
        {
          item_name: item_name,
          item_id: item_id,
          price: price,
          item_brand: "Polar Pelmeni",
          item_category: item_category,
        },
      ],
    },
  });
};

//Добавление товара в корзину

export const add_to_cart = (
  item_name,
  item_id,
  price,
  item_category,
  quantity
) => {
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      items: [
        {
          item_name: item_name,
          item_id: item_id,
          price: price,
          item_brand: "Polar Pelmeni",
          item_category: item_category,
          quantity: quantity,
        },
      ],
    },
  });
};

//Удаление товара из корзины

export const remove_from_cart = (
  item_name,
  item_id,
  price,
  item_category,
  quantity
) => {
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "remove_from_cart",
    ecommerce: {
      items: [
        {
          item_name: item_name,
          item_id: item_id,
          price: price / quantity,
          item_brand: "Polar Pelmeni",
          item_category: item_category,
          quantity: quantity,
        },
      ],
    },
  });
};

//Оформление заказа

export const begin_checkout = (array) => {
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "begin_checkout",
    ecommerce: {
      items: array.map((item) => {
        return {
          item_name: item.name,
          item_id: item.id,
          price: item.price,
          item_brand: "Polar Pelmeni",
          item_category: item.category,
          quantity: item.count,
        };
      }),
    },
  });
};

//Покупка

export const purchase = (transaction_id, total, array) => {
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "purchase",
    ecommerce: {
      transaction_id: transaction_id,
      affiliation: "cart",
      value: total,
      tax: "0",
      shipping: "0",
      currency: "UAH",
      items: array.map((item) => {
        return {
          item_name: item.name,
          item_id: item.id,
          price: item.price,
          item_brand: "Polar Pelmeni",
          item_category: item.category,
          quantity: item.count,
        };
      }),
    },
  });
};
