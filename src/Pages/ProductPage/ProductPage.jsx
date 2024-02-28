//Import React
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { view_item } from "../../gm4";
import { addToCartHandler, productPageGetter } from "../../utils/menu";

//Import components
import Container from "../../components/Container/Container";
import ProductCard from "../../components/ProductCard/ProductCard";
import Popup from "../../components/Popup/Popup";
import ModificatorsPopup from "./ModificatorsPopup";
import NotFound from "../NotFound/NotFound";
import { url } from "../../api";

//Import styles
import "./ProductPage.scss";

const ProductPage = observer(() => {
  const { id } = useParams();

  const [count, setCount] = useState(1);

  const [product, setProduct] = useState(null);
  const [productIngredients, setProductIngredients] = useState(null);
  const [productDescription, setProductDescription] = useState(null)
  const [recommendationsProducts, setRecommendationsProducts] = useState(null);
  const [groupsOfModificators, setGroupsOfModificators] = useState([])
  const [selectedModificators, setSelectedModificators] = useState([]);

  const [isPopupOpened, setIsPopupOpened] = useState(false)

  const addProductToCart = () => {
    const productWithMods = { ...product, mods: selectedModificators }
    addToCartHandler(productWithMods, count);
    setIsPopupOpened(false);
    setSelectedModificators([])
  }

  const handleModPopup = () => { setIsPopupOpened(prev => !prev); setSelectedModificators([]) }

  useEffect(() => {
    if (product) {
      const stringOfDescription = product.product_production_description;
      const arr = stringOfDescription.split(".")[0].split(", ");
      setProductIngredients(arr);
      setProductDescription(stringOfDescription.split(".").splice(1).join(""))
    }
  }, [product]);

  useEffect(() => {
    productPageGetter(id, setProduct, setGroupsOfModificators, setRecommendationsProducts);
  }, [id]);

  if (!!product) {
    view_item(
      product.product_name,
      product.product_id,
      parseInt(product.price[1].slice(0, -2)),
      product.category_name.replace(/onlineOrder: /, "")
    );

    return (
      <div>
        <div className="product-page">
          {isPopupOpened && groupsOfModificators && (
            <Popup closeModal={handleModPopup}>
              <ModificatorsPopup groups={groupsOfModificators} setSelectedModificators={setSelectedModificators} addProductToCart={addProductToCart} />
            </Popup>
          )}
          <Container>
            <div className="product-page__content">
              <div className="product-page__preview" style={{ backgroundImage: `url(${url}/api/sendImage/${id})` }}>

              </div>
              <div className="product-page__info">
                <p className="product-page__weight text">
                  {product.out} г
                </p>
                <h1 className="product-page__title text__color--secondary">
                  {product.product_name}
                </h1>
                {productDescription && (
                  <p className="product-page__desc">
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
                    onClick={() => groupsOfModificators ? handleModPopup() : addProductToCart()}
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
                <h3 className="title__h3 product-page__rec-title">Рекомендуємо спробувати</h3>
              </div>

              {recommendationsProducts && (
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
      <NotFound />
    );
  }
});

export default ProductPage;
