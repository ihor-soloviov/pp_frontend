import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import { getProducts } from '../../utils/menu';
import menuStore from '../../store/menu-store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

export const Categories = observer(({ setProducts }) => {
  const { id } = useParams();
  const [currentCatId, setCurrentCatId] = useState("47");
  const { categories } = menuStore;

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
        {categories.map(({ category_id, category_name }) => (
          <button
            key={category_id}
            className={classNames("categories__btn", {
              "categories__btn-active": currentCatId === category_id,
            })}
            onClick={() => setCurrentCatId(category_id)}
          >
            {category_name}
          </button>
        )
        )}
      </div>
    )
  }
})

