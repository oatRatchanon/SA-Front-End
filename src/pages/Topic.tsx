import { useParams } from "react-router-dom";
import { subjects } from "../subject";
import styled from "styled-components";

function Topic() {
  const { topicId } = useParams();
  const topic = subjects[Number(topicId) - 1].topics[0];

  return (
    <TopicContainer>
      <div>Topic : {topic.description}</div>
      <div>
        <div>Comments : </div>
        <div>
          {topic.comments.map((comment, index) => {
            return <div key={index}>- {comment.description}</div>;
          })}
        </div>
      </div>
    </TopicContainer>
  );
}

const TopicContainer = styled.div`
  padding: 1rem 10rem;
`;

export default Topic;
