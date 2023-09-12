import { Link } from "react-router-dom";
import styled from "styled-components";
import { Topic } from "../types";
import ReactTimeAgo from "react-time-ago";

interface TopicCardProps {
  topic: Topic;
}

function TopicCard({ topic }: TopicCardProps) {
  return (
    <StyledLink to={`/topics/${topic.id}`}>
      <TopicText>{topic.description}</TopicText>
      <Text date={topic.createAt} />
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6b6b6b;
  font-size: 24px;
  border-radius: 20px;
  background-color: #f2f2f2;
  padding: 1rem;
  width: 20vw;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  transition-duration: 1s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Text = styled(ReactTimeAgo)`
  font-size: 14px;
`;

const TopicText = styled.div`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;
export default TopicCard;
