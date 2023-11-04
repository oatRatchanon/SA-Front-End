// import { useParams } from "react-router-dom";
// import { subjects } from "../subject";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import CommentCard from "../components/CommentCard";
import { useEffect, useRef, useState } from "react";
import { Comment } from "../types";
import CommentIcon from "@mui/icons-material/Comment";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useStore } from "../hooks/useStore";
import { GATEWAY_URL } from "../config/env";
import { getTopicByIdService } from "../services/topics";
import { useParams } from "react-router-dom";
import {
  createCommentService,
  getCommentByTopicIdService,
} from "../services/comments";
import { Box, Skeleton } from "@mui/material";

export interface TopicRes {
  id: string;
  forum: Forum;
  topicCreatorId: string;
  description: string;
  createAt: Date;
  comments: Comment[];
}

export interface Forum {
  id: string;
  subjectId: string;
  year: number;
  semester: number;
  section: number;
}

const googleLoginURL = `${GATEWAY_URL}/api/auth/google/login`;

function Topic() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState<TopicRes | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingC, setIsLoadingC] = useState<boolean>(true);
  const textRef = useRef<null | HTMLDivElement>(null);
  const { user } = useStore();

  const handleCommentSubmit = async () => {
    if (user && topicId) {
      const c: Comment = {
        description: commentInput,
        createAt: new Date(),
      };
      await createCommentService(topicId, commentInput);
      setComments((prev) => [...prev, c]);
      setCommentInput("");
    } else {
      window.location.href = googleLoginURL;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (topicId) {
        const results = await getTopicByIdService(topicId);
        setTopic(results);
        const results2 = await getCommentByTopicIdService(topicId);
        setComments(results2.comments);
        setIsLoadingC(false);
      }
    };
    fetchData();
  }, [topicId]);

  useEffect(() => {
    textRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [comments]);

  return (
    <TopicContainer>
      <CenterContainer>
        {isLoadingC ? (
          <HeaderContainer>
            <Box sx={{ width: 300, lineHeight: "2rem" }}>
              <Skeleton />
              <Skeleton />
            </Box>
          </HeaderContainer>
        ) : (
          <HeaderContainer>
            <h1>{topic?.description}</h1>
            <Text date={topic?.createAt || new Date()} />
          </HeaderContainer>
        )}

        <CommentContainer>
          <CommentHeader>
            <CommentIcon /> Comments
          </CommentHeader>
          <CommentContent>
            {isLoadingC ? (
              <>
                <Skeleton
                  style={{ marginTop: "2rem" }}
                  variant="rounded"
                  width="100%"
                  height={80}
                />
                <Skeleton
                  style={{ marginTop: "2rem" }}
                  variant="rounded"
                  width="100%"
                  height={80}
                />
                <Skeleton
                  style={{ marginTop: "2rem" }}
                  variant="rounded"
                  width="100%"
                  height={80}
                />
              </>
            ) : comments.length > 0 ? (
              comments.map((comment, index) => {
                return <CommentCard key={index} comment={comment} />;
              })
            ) : (
              <div className="noData">No Data</div>
            )}

            <div ref={textRef} />
          </CommentContent>

          <CommentSendBox
            placeholder="Write Comment"
            rows={3}
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
          ></CommentSendBox>
          <CommentSubmit
            commentInput={commentInput}
            onClick={handleCommentSubmit}
            disabled={commentInput === ""}
          >
            <AddCommentIcon /> Send Comment
          </CommentSubmit>
        </CommentContainer>
      </CenterContainer>
    </TopicContainer>
  );
}

const TopicContainer = styled.div`
  padding: 0rem 10vw;
`;

const CenterContainer = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  border-bottom: 1.5px solid #f2f2f2;
  margin-bottom: 1rem;
  gap: 1.5rem;
  height: 200px;
  font-weight: bold;
`;

const Text = styled(ReactTimeAgo)`
  font-size: 14px;
  color: #6b6b6b;
`;

const CommentContainer = styled.div`
  width: 100%;
`;

const CommentHeader = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommentContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  overflow-x: hidden;
  max-height: 40vh;
`;

const CommentSendBox = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  font-weight: bold;
  font-size: 16px;
`;

const CommentSubmit = styled.button<{ commentInput: string }>`
  font-size: 16px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: ${(p) => (p.commentInput == "" ? "#838383" : "#2a2d48")};
  color: white;
  font-weight: bold;
  float: right;
  margin-top: 0.5rem;
  margin-bottom: 50px;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.02);
  }
`;

export default Topic;
