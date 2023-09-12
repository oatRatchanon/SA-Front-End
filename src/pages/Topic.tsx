// import { useParams } from "react-router-dom";
import { subjects } from "../subject";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import CommentCard from "../components/CommentCard";

function Topic() {
  // const { topicId } = useParams();
  const topic = subjects[0].topics[0];

  return (
    <TopicContainer>
      <CenterContainer>
        <HeaderContainer>
          <h1>{topic.description}</h1>
          <Text date={topic.createAt} />
        </HeaderContainer>
        <CommentContainer>
          <CommentHeader>Comments</CommentHeader>
          <CommentContent>
            {topic.comments.map((comment, index) => {
              return <CommentCard key={index} comment={comment} />;
            })}
          </CommentContent>
        </CommentContainer>
      </CenterContainer>
    </TopicContainer>
  );
}

const TopicContainer = styled.div`
  padding: 1rem 10rem;
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
  height: 160px;
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
`;

const CommentContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export default Topic;
