import React from "react";
import styled from "styled-components";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";

const CATEGORY = [
  { id: null, name: "전체" },
  { id: 0, name: "동화" },
  { id: 1, name: "소설" },
  { id: 2, name: "사회" },
];

function Header() {
  const { category } = useCategory();
  console.log(category);

  return (
    <HeaderBar>
      <Logo to="/">Book Store</Logo>
      <CategoryNav className="category">
        <ul>
          {CATEGORY.map((item) => (
            <li key={item.id}>
              <Link
                to={
                  item.id === null ? "/books" : `/books?category_id=${item.id}`
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </CategoryNav>
      <Auth>
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt />
              로그인
            </Link>
          </li>
          <li>
            <Link to="/join">
              <FaRegUser />
              회원가입
            </Link>
          </li>
        </ul>
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
      a {
        font-size: 1.5rem;
        font-weight: 600;
        text-decoration: none;
        display: flex;
        align-items: center;
        line-height: 1;
        gap: 10px;
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
