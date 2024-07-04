import { Link } from "react-router-dom";
import { styled } from "styled-components";
import oc from "open-color";
import { ReactComponent as MussgImage } from "@/assets/mussg.svg";

function IndexTemplate() {
  return (
    <Container>
      <MussgImage height="182" /> <AppTitle>Programmers Note Editor</AppTitle>
      <AppDescription>
        <strong>Programmers Note Editor</strong>는 (...) <br />
        메모는 클라우드에 저장되어 언제 어디서나 (...)
      </AppDescription>
      <StartLink to="login">무료로 시작하기</StartLink>
      <Footer>© 2023 Grepp Co.</Footer>{" "}
    </Container>
  );
}

export default IndexTemplate;

const Container = styled.div`
  //
`;
const AppDescription = styled.div`
  //
`;

const StartLink = styled.div`
  //
`;

const Footer - styled.div`
  //
`