import { useParams } from "react-router-dom";
import { subjects } from "../subject";
import styled from "styled-components";
import TopicCard from "../components/TopicCard";

function Subject() {
  const { subjectId } = useParams();
  const subject = subjects[Number(subjectId) - 1];

  return (
    <SubjectContainer>
      <CenterContainer>
        <HeaderContainer>
          <h1>{subject.name}</h1>
          <h3 style={{ color: "#6b6b6b" }}>
            Year : {subject.year} | Semester : {subject.semester} | Section :{" "}
            {subject.section}
          </h3>
        </HeaderContainer>
        <FileContainer>
          <FileHeader>Files</FileHeader>
          <FileContent>No Data</FileContent>
        </FileContainer>
        <TopicContainer>
          <TopicHeader>Topics</TopicHeader>
          <TopicContent>
            {subject.topics.map((topic, index) => {
              return <TopicCard key={index} topic={topic} />;
            })}
          </TopicContent>
        </TopicContainer>
      </CenterContainer>
    </SubjectContainer>
  );
}

const SubjectContainer = styled.div`
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
  align-items: center;
  border-bottom: 1.5px solid #f2f2f2;
  margin-bottom: 1rem;
  gap: 1.5rem;
  height: 160px;
  font-weight: bold;
`;

const FileContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const FileHeader = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
`;

const FileContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const TopicContainer = styled.div`
  width: 100%;
`;

const TopicHeader = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
`;

const TopicContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export default Subject;
