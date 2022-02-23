import ImageBoardPreview from "@Molecules/BoardPreview/Image";
import { BoardContentOneBoardSelector } from "@Recoil/BoardContent";
import React, { useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Container, ContentContainer, Button } from "./style";

interface Props {
  apiSrc: string;
}
const PhotoDetail = ({ apiSrc }: Props) => {
  const modalRef = useRef(null);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [content] = useRecoilValue(
    BoardContentOneBoardSelector([Number(id), apiSrc])
  );

  const handleOutSideClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!modalRef.current) return;
    if (!(modalRef.current as HTMLElement).contains(e.target as Node))
      handleDetailClose();
  };

  const handleDetailClose = () => history.push("/photos");

  return (
    <Container onClick={handleOutSideClick}>
      <ContentContainer ref={modalRef}>
        <Button onClick={handleDetailClose}>x</Button>
        <ImageBoardPreview {...{ ...content, ...{ type: "detail" } }} />
      </ContentContainer>
    </Container>
  );
};

export default PhotoDetail;
