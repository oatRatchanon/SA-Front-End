import { Link } from "react-router-dom";
import styled from "styled-components";
import { Subject } from "../types";

interface SubjectCardProps {
  subject: Subject;
}

function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <StyledLink to={`/subjects/${subject.id}`}>
      <SubjectText>{subject.name}</SubjectText>
      <Text>Year : {subject.year}</Text>
      <Text>Semester : {subject.semester}</Text>
      <Text>Section : {subject.section}</Text>
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
  width: 20%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.03);
  }
`;

const Text = styled.div`
  font-size: 16px;
`;

const SubjectText = styled.div`
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

export default SubjectCard;
