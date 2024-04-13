//Import React
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { view_item } from "../../gm4";
import { addToCartHandler, getProductById } from "../../utils/menu";

//Import components
import Container from "../../components/Container/Container";
import ProductCard from "../../components/ProductCard/ProductCard";
import Popup from "../../components/Popup/Popup";
import ModificatorsPopup from "./ModificatorsPopup";
import { url } from "../../api";

//Import styles
import "./ProductPage.scss";
import { observer } from "mobx-react-lite";
import menuStore from "../../store/menu-store";
import { DotsLoader } from "../../components/Loader/DotsLoader";

const ProductPage = observer(() => {
  const { id } = useParams();
  const { products, setProductsByCategoryId } = menuStore

  const [count, setCount] = useState(1);

  const [product, setProduct] = useState(null);
  const [selectedModificators, setSelectedModificators] = useState([]);
  const [isPopupOpened, setIsPopupOpened] = useState(false)

  useEffect(() => {
    getProductById(id, setProduct, products, setProductsByCategoryId);
  }, [id, products, setProductsByCategoryId]);

  const addProductToCart = () => {
    const productWithMods = { ...product, mods: selectedModificators }
    addToCartHandler(productWithMods, count);
    setIsPopupOpened(false);
    setSelectedModificators([])
  }

  const handleModPopup = () => { setIsPopupOpened(prev => !prev); setSelectedModificators([]) }

  if (product) {
    view_item(
      product.product_name,
      product.product_id,
      product.price,
      product.category_name
    );

    console.log(product)

    const { out, product_name, description, price, group_modifications, ingredients } = product;

    return (
      <div>
        <div className="product-page">
          {isPopupOpened && group_modifications && (
            <Popup closeModal={handleModPopup}>
              <ModificatorsPopup groups={group_modifications} setSelectedModificators={setSelectedModificators} addProductToCart={addProductToCart} />
            </Popup>
          )}
          <Container>
            <div className="product-page__content">
              <div className="product-page__preview" style={{ backgroundImage: `url(${url}/api/sendImage/${id})` }}>

              </div>
              <div className="product-page__info">
                <p className="product-page__weight text">
                  {out} г
                </p>
                <h1 className="product-page__title text__color--secondary">
                  {product_name}
                </h1>
                <p className="product-page__desc">
                  {description}
                </p>
                {window.innerWidth > 1000 ? (
                  <p className="product-page__price text-price text__color--secondary">
                    {price} ₴
                  </p>
                )
                  : (
                    <div className="product-page__price__mob">
                      <p className="product-page__price text-price text__color--secondary">
                        {price} ₴
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
                    onClick={() => group_modifications ? handleModPopup() : addProductToCart()}
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

                {ingredients && (
                  <React.Fragment>
                    <h6 className="product-page__compile-title title__h6 text__color--secondary">
                      Склад
                    </h6>
                    <ul className="product-page__compile">
                      {ingredients.map((ingredient) => (
                        <li key={ingredient} className="product-page__compile-item">{ingredient}</li>
                      ))
                      }
                    </ul>
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className="product-page__recommendations">
              <div className="product-page__recommendations-head">
                <h3 className="title__h3 product-page__rec-title">Рекомендуємо спробувати</h3>
              </div>

              {products && (
                <div className="product-page__recommendations-track">
                  <div className="product-page__recommendations-list">
                    {products.map((product) => (
                      <ProductCard
                        product={product}
                        key={product.product_id}
                      />
                    )
                    )}
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
      <DotsLoader />
    );
  }
});

export default ProductPage;
