import React from "react";
import styled from "styled-components";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";

const CATEGORY = [
  { id: null, name: "전체" },
  { id: 0, name: "동화" },
  { id: 1, name: "소설" },
  { id: 2, name: "사회" },
];

function Header() {
  return (
    <HeaderBar>
      <Logo>Book Store</Logo>
      <Category className="category">
        <ul>
          {CATEGORY.map((item) => (
            <li key={item.id}>
              <a
                href={
                  item.id === null ? "/books" : `/books?category_id=${item.id}`
                }
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </Category>
      <Auth>
        <ul>
          <li>
            <a href="/login">
              <FaSignInAlt />
              로그인
            </a>
          </li>
          <li>
            <a href="/join">
              <FaRegUser />
              회원가입
            </a>
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

const Category = styled.nav`
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

const Logo = styled.h1`
  font-weight: 700;
  font-size: 28px;
  color: orange;
`;
