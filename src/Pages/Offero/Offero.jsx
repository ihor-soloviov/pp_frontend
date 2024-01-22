import React from "react";
import Container from "../../components/Container/Container";
import { details, info } from "./info";
import useSmoothScroll from "../../utils/useSmoothScroll";

import "./Offero.scss";

const Offero = () => {
  const scrollTo = useSmoothScroll();

  const handleScrollClick = (e, id) => {
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <Container>
      <main className="offero">
        <h1>Публічний договір (оферта)</h1>
        <h2>на замовлення, купівлю-продаж і доставку товарів</h2>
        <div className="offero__container">
          <aside className="offero__navigation">
            <p className="nav__title">Зміст:</p>
            <ul className="nav__list">
              {info.map(({ title }, index) => {
                const value = `${index + 1}. ${title}`;
                return (
                  <a
                    href={`#${title}`}
                    className="nav__item"
                    key={title}
                    onClick={(e) => handleScrollClick(e, title)}
                  >
                    {value}
                  </a>
                );
              })}
            </ul>
          </aside>
          <section className="offero__main">
            <p className="main-text">
              Цей договір є офіційною та публічною пропозицією Продавця укласти
              договір купівлі-продажу Товару, представленого на сайті
              polarpelmeni.com.ua. Даний договір є публічним, тобто відповідно
              до статті 633 Цивільного кодексу України, його умови є однаковими
              для всіх покупців незалежно від їх статусу (фізична особа,
              юридична особа, фізична особа-підприємець) без надання переваги
              одному покупцю перед іншим. Шляхом укладення цього Договору
              покупець в повному обсязі приймає умови та порядок оформлення
              замовлення, оплати товару, доставки товару, повернення товару,
              відповідальності за недобросовісне замовлення та усі інші умови
              договору. Договір вважається укладеним з моменту натискання кнопки
              «Підтвердити Замовлення» на сторінці оформлення замовлення в
              Розділі «Кошик» і отримання Покупцем від Продавця підтвердження
              замовлення в електронному вигляді.
            </p>
            {info.map(({ title, items }, index) => {
              const mainTitle = `${index + 1}. ${title}`;
              return (
                <article
                  id={`${title}`}
                  className="offero__article"
                  key={title}
                >
                  <p className="black">{mainTitle}</p>

                  {items.map(
                    ({ blackTitle, text, orederList, unOrderedList }, indx) => {
                      const id = `${index + 1}.${indx + 1}.`;
                      const blackPart = `${id} ${blackTitle} `;
                      const black = blackTitle ? (
                        <b>{blackPart}</b>
                      ) : (
                        <b>{id}</b>
                      );
                      return (
                        <div className="light" key={id}>
                          {black}
                          {text}
                          {orederList && (
                            <ul className="orderedList">
                              {orederList.map((listItem, ind) => {
                                const val = `${id}${ind + 1} ${listItem}`;
                                return <li key={val}>{val}</li>;
                              })}
                            </ul>
                          )}
                          {unOrderedList && (
                            <ul className="orderedList">
                              {unOrderedList.map((listItem) => (
                                <li key={listItem}>{listItem}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    }
                  )}
                </article>
              );
            })}
            <h3>Адреса та реквізити продавця:</h3>
            <ul className="offero__details">
              {details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </Container>
  );
};

export default Offero;
