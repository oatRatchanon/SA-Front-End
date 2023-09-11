import { Link, useParams } from "react-router-dom";
import { subjects } from "../subject";
import styled from "styled-components";

function Subject() {
  const { subjectId } = useParams();
  const subject = subjects[Number(subjectId) - 1];

  return (
    <SubjectContainer>
      <div>{subject.name}</div>
      <div>Files : -</div>
      <div>
        <div>Topics :</div>
        <div>
          {subject.topics.map((topic, index) => {
            return (
              <StyledLink to={`/topics/${topic.id}`} key={index}>
                - {topic.description}
              </StyledLink>
            );
          })}
        </div>
      </div>
    </SubjectContainer>
  );
}

const SubjectContainer = styled.div`
  padding: 1rem 10rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default Subject;
