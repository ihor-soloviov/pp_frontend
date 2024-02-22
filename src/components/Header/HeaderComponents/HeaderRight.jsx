import { useNavigate } from "react-router-dom";
import Cart from "../../Cart/Cart";
import BtnMain from "../../Buttons/BtnMain";
import modalsStore from "../../../store/modal-store";
import userStore from "../../../store/user-store";
import { observer } from "mobx-react-lite";
import classNames from "classnames";

export const HeaderRight = observer(({ setHamburger, hamburger }) => {
  const navigate = useNavigate();
  const { authModalHandler } = modalsStore;
  const { isAuthenticated, name, avatar } = userStore;

  return (
    <div className="header__right">
      <Cart />
      {isAuthenticated ? (
        <div className="header__profile-btn" onClick={() => navigate("/profile/info")}>
          <div className="header__avatar">
            <img src={avatar} alt="avatar" />
          </div>
          <span className="header__username">{name}</span>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.00048 3.78132L8.30048 0.481323L9.24315 1.42399L5.00048 5.66666L0.757812 1.42399L1.70048 0.481323L5.00048 3.78132Z"
              fill="#12130F"
            />
          </svg>
        </div>
      ) : (
        <BtnMain name={"Увійти"} onClick={() => authModalHandler(true)} />
      )}
      <div
        className={classNames("header__hamburger", { "header__hamburger--active": hamburger })}
        onClick={() => setHamburger(!hamburger)}
      >
        <span />
      </div>
    </div>
  )
});
