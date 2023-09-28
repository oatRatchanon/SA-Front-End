import styled from "styled-components";
import { subjects } from "./subject";
import SubjectCard from "./components/SubjectCard";

function App() {
  return (
    <HomeContainer>
      <HomeHeader>
        <Text>Explore Subjects</Text>
      </HomeHeader>
      <HomeContent>
        {subjects.map((subject, index) => {
          return <SubjectCard key={index} subject={subject} />;
        })}
      </HomeContent>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  padding: 0rem 10rem;
`;

const HomeHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1.5px solid #f2f2f2;
  font-size: 48px;
  font-weight: bold;
  height: 200px;
`;

const Text = styled.span`
  position: relative;
  /* color: hsl(0, 0%, 68%); */
  width: 460px;
  letter-spacing: 7px !important;
  overflow: hidden;
  border-right: 0.1em solid hsl(0, 0%, 80%);
  white-space: nowrap;
  animation: typing 1.5s steps(21, end),
    blink-caret 0.5s step-end infinite alternate;

  @keyframes typing {
    from {
      width: 0;
    }
  }
  @keyframes blink-caret {
    50% {
      border-color: transparent;
    }
  }
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
