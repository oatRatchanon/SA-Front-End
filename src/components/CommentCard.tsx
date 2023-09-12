import styled from "styled-components";
import { Comment } from "../types";
import ReactTimeAgo from "react-time-ago";

interface CommentCardProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentCardProps) {
  return (
    <TopicCardContainer>
      <CommentText>{comment.description}</CommentText>
      <DateText date={comment.createAt} />
    </TopicCardContainer>
  );
}

const TopicCardContainer = styled.div`
  text-decoration: none;
  color: #6b6b6b;
  font-size: 24px;
  background-color: #f2f2f2;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.01);
  }
`;

const DateText = styled(ReactTimeAgo)`
  font-size: 14px;
`;

const CommentText = styled.div`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;
export default CommentCard;
