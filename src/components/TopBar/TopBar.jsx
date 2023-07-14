import React from "react";
import { Link } from "react-router-dom";
import { TopBarWrapper, Title } from "./TopBar_Style";

function TopBar({ mypage }) {
  return (
    <>
      <TopBarWrapper page={mypage ? mypage : ""}>
        <Title>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontFamily: "OKDDUNG, sans-serif",
              fontSize: "50px",
            }}
          >
            도와줄개
          </Link>
        </Title>
      </TopBarWrapper>
    </>
  );
}

export default TopBar;
