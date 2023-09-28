import styled from "styled-components";
import { subjects } from "./subject";
import SubjectCard from "./components/SubjectCard";
import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { Subject } from "./types";

interface Inputs {
  name: string;
  year: string;
  semester: string;
  section: string;
}

function App() {
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    year: "",
    semester: "",
    section: "",
  });
  const [subject, setSubject] = useState<Subject[]>([]);

  const handleFilterChange = (
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleReset = () => {
    setInputs({
      name: "",
      year: "",
      semester: "",
      section: "",
    });
  };

  useEffect(() => {
    setSubject(subjects);
  }, []);

  useEffect(() => {
    const temp = subjects.filter((subject) => {
      return (
        (inputs.name === "" ||
          subject.name.toLowerCase().includes(inputs.name.toLowerCase())) &&
        (inputs.year === "" || subject.year.toString() === inputs.year) &&
        (inputs.semester === "" ||
          subject.semester.toString() === inputs.semester) &&
        (inputs.section === "" || subject.section.toString() === inputs.section)
      );
    });
    setSubject(temp);
  }, [inputs]);

  return (
    <HomeContainer>
      <HomeHeader>
        <Text>Explore Subjects</Text>
      </HomeHeader>
      <HomeFilter>
        <div className="FilterBox">
          <label>Subject</label>
          <SearchInput
            type="search"
            placeholder="--Subject Name--"
            name="name"
            onChange={handleFilterChange}
            value={inputs.name}
          />
        </div>
        <div className="FilterBox">
          <label>Year</label>
          <select name="year" onChange={handleFilterChange} value={inputs.year}>
            <option value="">--Please choose a year--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="FilterBox">
          <label>Semester</label>
          <select
            name="semester"
            onChange={handleFilterChange}
            value={inputs.semester}
          >
            <option value="">--Please choose a semester--</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="FilterBox">
          <label>Section</label>
          <input
            type="number"
            placeholder="--Section--"
            name="section"
            onChange={handleFilterChange}
            value={inputs.section}
          />
        </div>
        <Reset onClick={handleReset}>Reset</Reset>
      </HomeFilter>
      <HomeContent>
        {subject.map((subject, index) => {
          return <SubjectCard key={index} subject={subject} />;
        })}
      </HomeContent>
    </HomeContainer>
  );
}

const Reset = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2a2d48;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  margin-left: 0.8rem;
`;

const HomeFilter = styled.div`
  padding: 1.5rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 0.8rem;
  border-radius: 15px;
  /* width: 500px; */
`;

const HomeContainer = styled.div`
  padding: 0rem 10rem;
  padding-bottom: 5rem;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export default App;
