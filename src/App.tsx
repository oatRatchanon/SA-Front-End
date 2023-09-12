import styled from "styled-components";
import { subjects } from "./subject";
import SubjectCard from "./components/SubjectCard";

function App() {
  return (
    <>
      <HomeHeader>Explore Subjects</HomeHeader>
      <HomeContent>
        {subjects.map((subject, index) => {
          return <SubjectCard key={index} subject={subject} />;
        })}
      </HomeContent>
    </>
  );
}

const HomeHeader = styled.div`
  padding: 5vh 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1.5px solid #f2f2f2;
  font-size: 40px;
  font-weight: bold;
`;

const HomeContent = styled.div`
  padding: 5vh 0vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export default App;
