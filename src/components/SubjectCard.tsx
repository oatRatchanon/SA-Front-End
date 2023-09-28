import { Link } from "react-router-dom";
import styled from "styled-components";
import { Subject } from "../types";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

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
      <StarContainer>
        {subject.star ? (
          <StarIcon className="StarIcon" />
        ) : (
          <StarOutlineIcon className="StarIcon" />
        )}
      </StarContainer>
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
  width: 23%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition-duration: 0.3s;
  position: relative;
  &:hover {
    transform: scale(1.03);
    border: 1px solid #6b6b6b;
  }
`;

const Text = styled.span`
  font-size: 16px;
`;

const SubjectText = styled.span`
  color: black;
  font-weight: bold;
  font-size: 20px;
`;

const StarContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: #2a2d48;
`;

export default SubjectCard;
