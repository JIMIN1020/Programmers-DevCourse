import React from "react";
import styled from "styled-components";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCategory } from "@/hooks/useCategory";
import { Category } from "@/models/category.model";
import { useAuthStore } from "@/store/authStore";

function Header() {
  const category = useCategory();
  const { isLoggedIn, storeLogout } = useAuthStore();

  return (
    <HeaderBar>
      <Logo to="/">Book Store</Logo>
      <CategoryNav className="category">
        <ul>
          {category.map((item: Category) => (
            <li key={item.category_id}>
              <Link
                to={
                  item.category_id === null
                    ? "/books"
                    : `/books?categoryId=${item.category_id}`
                }
              >
                {item.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </CategoryNav>

      <Auth>
        {isLoggedIn ? (
          <ul>
            <li>
              <Link to="/cart">
                <FaSignInAlt />
                장바구니
              </Link>
            </li>
            <li>
              <Link to="/orderlist">
                <FaSignInAlt />
                주문 내역
              </Link>
            </li>
            <li>
              <button onClick={storeLogout}>로그아웃</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                로그인
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaRegUser />
                회원가입
              </Link>
            </li>
          </ul>
        )}
      </Auth>
    </HeaderBar>
  );
}

export default Header;

const HeaderBar = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.lg};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};
`;

const CategoryNav = styled.nav`
  ul {
    display: flex;
    gap: 32px;
    li {
      a {
        font-size: 1.5rem;
        font-weight: 600;
        text-decoration: none;
        color: ${({ theme }) => theme.color.text};
        display: flex;
        align-items: center;
        line-height: 1;
        gap: 10px;

        &:hover {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }
`;

const Auth = styled.nav`
  ul {
    display: flex;
    gap: 16px;

    li {
      a,
      button {
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        display: flex;
        align-items: center;
        line-height: 1;
        gap: 10px;
        background: none;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

const Logo = styled(Link)`
  font-weight: 700;
  font-size: 28px;
  color: orange;
  text-decoration: none;
`;
