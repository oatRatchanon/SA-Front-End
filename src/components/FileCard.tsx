// import { Link } from "react-router-dom";
import styled from "styled-components";
import { File } from "../types";
import ReactTimeAgo from "react-time-ago";
import DownloadIcon from "@mui/icons-material/Download";
import LinkIcon from "@mui/icons-material/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { useStore } from "../hooks/useStore";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

interface FileCardProps {
  file: File;
}
function FileCard({ file }: FileCardProps) {
  const [copied, setCopied] = useState(false);
  const [star, setStar] = useState(false);
  const { user, setUser } = useStore();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );
        console.log(res);
        setUser({
          email: res.data.email,
          name: res.data.name,
          picture: res.data.picture,
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleStarClick = () => {
    if (user) {
      setStar(!star);
    } else {
      login();
    }
  };

  return (
    <FileCardContainer>
      <Content>
        <FileText>{file.name}</FileText>
        <FooterContent>
          <DateText date={file.createAt} />
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
        <StyledA
          href="data:image/png;base64,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"
          download
        >
          <DownloadIcon fontSize={"large"} />
        </StyledA>
        <LinkContainer>
          <StyledLink text="aaa" onCopy={() => setCopied(true)}>
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
  gap: 1rem;
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
  width: 80%;
`;

const DateText = styled(ReactTimeAgo)`
  font-size: 14px;
`;

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
  align-items: center;
  gap: 0.4rem;
  font-size: 16px;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 0 0.2rem;
`;

export default FileCard;
