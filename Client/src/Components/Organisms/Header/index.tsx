import { useRecoilValue } from "recoil";
import { checkLoginSelector } from "@Recoil/CheckLogin";

import { SmallLoginButtonType } from "@Style/.";

import Button from "@Atoms/Button";
import { Container } from "./styles";
import HeaderLeftSide from "@Molecules/Header";
import HeaderNav from "@Molecules//Header/Nav";

const Header = ({ onClick }: { onClick?: () => void }) => {
  const user = useRecoilValue(checkLoginSelector);

  return (
    <Container>
      <HeaderLeftSide />
      {user ? (
        <HeaderNav />
      ) : (
        <Button {...SmallLoginButtonType} title="로그인" onClick={onClick} />
      )}
    </Container>
  );
};

export default Header;
