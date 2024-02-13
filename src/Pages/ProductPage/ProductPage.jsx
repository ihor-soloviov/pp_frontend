//Import React
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import shoppingCartStore from "../../store/shoping-cart-store";
import popupActionsStore from "../../store/popup-action-store";


//Import components
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import ProductCard from "../../components/ProductCard/ProductCard";
// import ArrowBtn from "../../components/ArrowBtn/ArrowBtn";

//Import styles
import "./ProductPage.scss";

import { url } from "../../api";
import { add_to_cart, view_item } from "../../gm4";
import { addToCartHandler, productPageGetter } from "../../utils/menu";
import Popup from "../../components/Popup/Popup";
import ModificatorsPopup from "./ModificatorsPopup";

const ProductPage = observer(() => {
  const { id } = useParams();
  const { addProduct, products } = shoppingCartStore;
  const { setActions } = popupActionsStore;

  const [count, setCount] = useState(1);

  const [product, setProduct] = useState(null);
  const [productIngredients, setProductIngredients] = useState(null);
  const [productDescription, setProductDescription] = useState(null)
  const [recommendationsProducts, setRecommendationsProducts] = useState(null);
  const [groupsOfModificators, setGroupsOfModificators] = useState([])
  const [selectedModificators, setSelectedModificators] = useState([]);

  const [isPopupOpened, setIsPopupOpened] = useState(false)

  const handleModificatorChange = useCallback((newModificator) => {
    setSelectedModificators(prev => {
      const index = prev.findIndex(modificator => modificator.group === newModificator.group);

      if (index !== -1) {
        if (newModificator.name.toLowerCase().includes("без")) {
          return prev.filter((_, idx) => idx !== index);
        } else {
          return prev.map((modificator, idx) => idx === index ? newModificator : modificator);
        }
      } else {
        return [...prev, newModificator];
      }
    });
  }, []);

  const handleModPopup = () => setIsPopupOpened(prev => !prev)

  useEffect(() => {
    console.log(selectedModificators)
  }, [selectedModificators])


  useEffect(() => {
    if (product) {
      console.log(product)
      const stringOfDescription = product.product_production_description;
      const arr = stringOfDescription.split(".")[0].split(", ");
      setProductIngredients(arr);
      setProductDescription(stringOfDescription.split(".").splice(1).join(""))
    }
  }, [product]);

  useEffect(() => {
    productPageGetter(id, setProduct, setGroupsOfModificators, setRecommendationsProducts);
  }, [id]);

  if (product !== null && product !== false) {
    view_item(
      product.product_name,
      product.product_id,
      parseInt(product.price[1].slice(0, -2)),
      product.category_name.replace(/onlineOrder: /, "")
    );

    return (
      <div>
        <div className="product-page">
          {isPopupOpened && (
            <Popup closeModal={handleModPopup}>
              <ModificatorsPopup groups={groupsOfModificators} />
            </Popup>
          )}
          <Container>
            <div className="product-page__content">
              <div className="product-page__preview">
                <img
                  src={`https://api.polarpelmeni.com.ua/api/sendImage/${id}`}
                  alt={product.product_name}
                />
              </div>
              <div className="product-page__info">
                <p className="product-page__weight text text__color--secondary">
                  {product.out} г
                </p>
                <h1 className="product-page__title text__color--secondary">
                  {product.product_name}
                </h1>
                {productDescription && (
                  <p className="product-page__desc text__color--secondary">
                    {productDescription}
                  </p>
                )}
                {window.innerWidth > 1000 ? (
                  <p className="product-page__price text-price text__color--secondary">
                    {parseInt(product.price[1].slice(0, -2))} ₴
                  </p>
                )
                  : (
                    <div className="product-page__price__mob">
                      <p className="product-page__price text-price text__color--secondary">
                        {parseInt(product.price[1].slice(0, -2))} ₴
                      </p>
                      <div className="counter">
                        <div
                          className="counter__btn counter__btn--transperent"
                          onClick={() => {
                            if (count > 1) {
                              setCount(count - 1);
                            }
                          }}
                        >
                          -
                        </div>
                        <div className="counter__value text__color--secondary">
                          {count}
                        </div>
                        <div
                          className="counter__btn counter__btn--transperent"
                          onClick={() => setCount(count + 1)}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  )
                }

                <div className="product-page__order">
                  <button
                    className="btn btn-main"
                    onClick={handleModPopup}
                  >
                    Додати в кошик
                  </button>

                  {window.innerWidth > 1000 && (
                    <div className="counter">
                      <div
                        className="counter__btn counter__btn--transperent"
                        onClick={() => {
                          if (count > 1) {
                            setCount(count - 1);
                          }
                        }}
                      >
                        -
                      </div>
                      <div className="counter__value text__color--secondary">
                        {count}
                      </div>
                      <div
                        className="counter__btn counter__btn--transperent"
                        onClick={() => setCount(count + 1)}
                      >
                        +
                      </div>
                    </div>
                  )}
                </div>

                {product.product_production_description && (
                  <React.Fragment>
                    <h6 className="product-page__compile-title title__h6 text__color--secondary">
                      Склад
                    </h6>
                    <ul className="product-page__compile">
                      {productIngredients &&
                        productIngredients.map((el) => {
                          return (
                            <li key={el} className="product-page__compile-item">{el}</li>
                          );
                        })}
                    </ul>
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="product-page__recommendations">
              <div className="product-page__recommendations-head">
                <h3 className="title__h3">Рекомендуємо спробувати</h3>
                {/*<div className="product-page__recommendations-arrows">
                  <ArrowBtn direction={"left"} />
                  <ArrowBtn direction={"right"} />
                      </div>*/}
              </div>

              {recommendationsProducts !== null && (
                <div className="product-page__recommendations-track">
                  <div className="product-page__recommendations-list">
                    {recommendationsProducts.map((product) => {
                      return (
                        <ProductCard
                          preview={
                            "https://api.polarpelmeni.com.ua/api/sendImage/" +
                            product.product_id
                          }
                          name={product.product_name}
                          price={parseInt(product.price[1].slice(0, -2))}
                          ingredients={product.ingredients}
                          weight={product.out}
                          key={product.product_id}
                          id={product.product_id}
                          category={product.category_name}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loader__wrapper">
        <Loader />
      </div>
    );
  }
});

export default ProductPage;
