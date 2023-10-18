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
      <DateText date={topic.createAt} />
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
  width: 30%;
  height: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.03);
    border: 1px solid #6b6b6b;
  }
`;

const DateText = styled(ReactTimeAgo)`
  font-size: 14px;
`;

const TopicText = styled.span`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;
export default TopicCard;
