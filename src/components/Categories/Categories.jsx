import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { getProducts } from '../../utils/menu';
import menuStore from '../../store/menu-store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

export const Categories = observer(({ setProducts }) => {
  const { id } = useParams();
  const [currentCatId, setCurrentCatId] = useState(null);
  const { categories } = menuStore;

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentCatId(categories[0].category_id);
    }
  }, [categories]);

  useEffect(() => {
    getProducts(currentCatId, setProducts);
  }, [currentCatId, setProducts]);


  useEffect(() => {
    if (id) {
      setCurrentCatId(id);
    }
  }, [id]);

  if (categories) {
    return (
      <div className="categories__list">
        {categories.map((cat) => {
          return (
            <button
              key={cat.category_id}
              className={classNames("categories__btn", {
                "categories__btn-active": currentCatId === cat.category_id,
              })}
              onClick={() => setCurrentCatId(cat.category_id)}
            >
              {cat.category_name}
            </button>
          );
        })}
      </div>
    )
  }
})

