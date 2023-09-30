import { Link } from "react-router-dom";
import styled from "styled-components";
import { Subject } from "../types";

interface SubjectCardProps {
  subject: Subject;
}

function SubjectCard({ subject }: SubjectCardProps) {
  return (
    <Container>
      <StyledLink to={`/subjects/${subject.id}`}>
        <SubjectText>{subject.name}</SubjectText>
        <Text>Year : {subject.year}</Text>
        <Text>Semester : {subject.semester}</Text>
        <Text>Section : {subject.section}</Text>
      </StyledLink>
    </Container>
  );
}

const Container = styled.span`
  border-radius: 20px;
  width: 23%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition-duration: 0.3s;
  position: relative;
  &:hover {
    transform: scale(1.03);
    border: 1px solid #6b6b6b;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6b6b6b;
  font-size: 24px;
  background-color: #f2f2f2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Text = styled.span`
  font-size: 16px;
`;

const SubjectText = styled.span`
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

export default SubjectCard;
