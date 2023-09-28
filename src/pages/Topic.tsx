// import { useParams } from "react-router-dom";
import { subjects } from "../subject";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import CommentCard from "../components/CommentCard";
import { useEffect, useRef, useState } from "react";
import { Comment } from "../types";
import CommentIcon from "@mui/icons-material/Comment";
import AddCommentIcon from "@mui/icons-material/AddComment";

function Topic() {
  // const { topicId } = useParams();
  const topic = subjects[0].topics[0];
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const textRef = useRef<null | HTMLDivElement>(null);

  const handleCommentSubmit = () => {
    const c: Comment = {
      id: comments.length + 1,
      subjectId: 1,
      description: commentInput,
      CommenterId: 1,
      createAt: new Date(),
      topicId: 1,
    };
    setComments((prev) => [...prev, c]);
    setCommentInput("");
  };

  useEffect(() => {
    setComments(topic.comments);
  }, [topic.comments]);

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
        <HeaderContainer>
          <h1>{topic.description}</h1>
          <Text date={topic.createAt} />
        </HeaderContainer>
        <CommentContainer>
          <CommentHeader>
            <CommentIcon /> Comments
          </CommentHeader>
          <CommentContent>
            {comments.length > 0 ? (
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
          <CommentSubmit onClick={handleCommentSubmit}>
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

const CommentSubmit = styled.button`
  font-size: 16px;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2a2d48;
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
