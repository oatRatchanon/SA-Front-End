import styled from "styled-components";
import { File } from "../types";
// import ReactTimeAgo from "react-time-ago";
import DownloadIcon from "@mui/icons-material/Download";
import LinkIcon from "@mui/icons-material/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useStore } from "../hooks/useStore";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useEffect, useState } from "react";
import { GATEWAY_URL } from "../config/env";
import { createBookmark, deleteBookmark } from "../services/files";

interface FileCardProps {
  file: File;
}
function FileCard({ file }: FileCardProps) {
  const [copied, setCopied] = useState(false);
  const [star, setStar] = useState(false);
  const { user } = useStore();
  const downloadURL = `${GATEWAY_URL}/api/files/download/${file.id}`;

  const handleStarClick = async () => {
    if (user) {
      if (!star) {
        await createBookmark(file.id);
      } else if (star) {
        await deleteBookmark(file.id);
      }
      setStar(!star);
    }
  };

  useEffect(() => {
    setStar(file.star);
  }, [file.star]);

  return (
    <FileCardContainer>
      <Content>
        <FileText>{file.name}</FileText>
        <FooterContent>
          {/* <DateText date={file.createAt} /> */}
          {user && (
            <StarContainer onClick={handleStarClick}>
              {star ? (
                <StarIcon className="StarIcon" />
              ) : (
                <StarOutlineIcon className="StarIcon" />
              )}
            </StarContainer>
          )}
        </FooterContent>
      </Content>
      <SideBar>
        <StyledA href={downloadURL}>
          <DownloadIcon fontSize={"large"} />
        </StyledA>
        <LinkContainer>
          <StyledLink text={downloadURL} onCopy={() => setCopied(true)}>
            <LinkIcon />
          </StyledLink>{" "}
          {copied ? <div>copied</div> : null}
        </LinkContainer>
      </SideBar>
    </FileCardContainer>
  );
}

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StarContainer = styled.div`
  color: #2a2d48;
  display: flex;
  align-items: center;
`;

const FileCardContainer = styled.div`
  text-decoration: none;
  color: #6b6b6b;
  font-size: 24px;
  border-radius: 20px;
  background-color: #f2f2f2;
  padding: 1rem;
  width: 30%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.03);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 70%;
`;

// const DateText = styled(ReactTimeAgo)`
//   font-size: 14px;
// `;

const FileText = styled.span`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

const StyledA = styled.a`
  cursor: pointer;
  border-radius: 50%;
  color: #2a2d48;
  &:hover {
    background-color: #2a2d48;
    color: white;
  }
`;

const StyledLink = styled(CopyToClipboard)`
  cursor: pointer;
  border-radius: 50%;
  color: #2a2d48;
  &:hover {
    transform: scale(1.3);
  }
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 0.4rem;
  font-size: 16px;
  cursor: pointer;
  width: 30%;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 0 0.2rem;
  margin-right: 0.3rem;
`;

export default FileCard;
