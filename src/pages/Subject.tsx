import { useParams } from "react-router-dom";
import { subjects } from "../subject";
import styled from "styled-components";
import TopicCard from "../components/TopicCard";
import FileCard from "../components/FileCard";
import { useEffect, useState } from "react";
import { File, Topic } from "../types";
import Modal, { Styles } from "react-modal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TopicIcon from "@mui/icons-material/Topic";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "20vw",
  },
};

interface Inputs {
  username: string;
  password: string;
}

function Subject() {
  const { subjectId } = useParams();
  const subject = subjects[Number(subjectId) - 1];
  const [inputs, setInputs] = useState<Inputs>({ username: "", password: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  // Modal
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleTopicChange = (event: { target: HTMLInputElement }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleTopicSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const topic = {
      id: topics.length + 1,
      subjectId: 1,
      comments: [],
      TopicCreatorId: 1,
      description: inputs.username,
      createAt: new Date(),
    };
    setTopics((prev) => [...prev, topic]);
    setInputs({ username: "", password: "" });
    closeModal();
  };

  const handleFileSubmit = (event: { target: HTMLInputElement }) => {
    const f = event.target.files?.[0];
    const file: File = { name: f?.name || "", createAt: new Date() };
    setFiles((prev) => [...prev, file]);
  };

  useEffect(() => {
    setFiles(subject.files);
    setTopics(subject.topics);
  }, [subject.files, subject.topics]);

  return (
    <SubjectContainer>
      <CenterContainer>
        <HeaderContainer>
          <h1>{subject.name}</h1>
          <HeaderFooter>
            <h3 style={{ color: "#6b6b6b", marginRight: "1rem" }}>
              Year : {subject.year} | Semester : {subject.semester} | Section :{" "}
              {subject.section}
            </h3>
            {subject.star ? (
              <StarIcon fontSize={"large"} className="StarIcon" />
            ) : (
              <StarOutlineIcon fontSize={"large"} className="StarIcon" />
            )}
          </HeaderFooter>
        </HeaderContainer>
        <FileContainer>
          <FileHeader>
            <StyledHeader>
              <InsertDriveFileIcon /> Files
            </StyledHeader>
            <Button>
              <FileUploadIcon />
              <label htmlFor="file" style={{ cursor: "pointer" }}>
                Upload File
              </label>
              <FileInput type="file" id="file" onChange={handleFileSubmit} />
            </Button>
          </FileHeader>
          <FileContent>
            {files?.map((file, index) => {
              return <FileCard key={index} file={file} />;
            })}
          </FileContent>
        </FileContainer>
        <TopicContainer>
          <TopicHeader>
            <StyledHeader>
              <TopicIcon /> Topics
            </StyledHeader>
            <Button onClick={openModal}>
              <AddCircleOutlineIcon /> Create Topic
            </Button>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <ModalText>Create Topic</ModalText>
              <StyledHr /> <br />
              <TopicForm onSubmit={handleTopicSubmit}>
                <label>
                  <b> Username :</b> <br />
                  <br />
                  <StyledInput
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleTopicChange}
                  />
                </label>
                <label>
                  <b> Passwaord :</b> <br />
                  <br />
                  <StyledInput
                    type="text"
                    name="password"
                    value={inputs.password || ""}
                    onChange={handleTopicChange}
                  />
                </label>
                <StyledSubmit type="submit" />
              </TopicForm>
              <StyledClose onClick={closeModal}>Close</StyledClose>
            </Modal>
          </TopicHeader>
          <TopicContent>
            {topics.map((topic, index) => {
              return <TopicCard key={index} topic={topic} />;
            })}
          </TopicContent>
        </TopicContainer>
      </CenterContainer>
    </SubjectContainer>
  );
}

const SubjectContainer = styled.div`
  padding: 0rem 10vw;
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
  height: 200px;
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
  display: flex;
  justify-content: space-between;
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
  display: flex;
  justify-content: space-between;
`;

const TopicContent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  font-size: 16px;
  cursor: pointer;
  padding: 0.5rem;
  background-color: #2a2d48;
  color: white;
  gap: 0.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 140px;
  &:hover {
    transform: scale(1.02);
  }
`;

const TopicForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 2rem;
`;

const StyledSubmit = styled.input`
  font-size: 16px;
  cursor: pointer;
  padding: 0.5rem;
  background-color: #2a2d48;
  color: white;
  width: 110px;
  font-weight: bold;
  width: 70px;
  margin-top: 1rem;
  &:hover {
    transform: scale(1.02);
  }
`;

const StyledClose = styled.button`
  font-size: 14px;
  cursor: pointer;
  padding: 0.3rem;
  background-color: #2a2d48;
  color: white;
  float: right;
  width: 70px;
  font-weight: bold;
  &:hover {
    transform: scale(1.02);
  }
`;

const ModalText = styled.h2`
  margin-bottom: 1rem;
  color: #2a2d48;
`;

const StyledHr = styled.hr`
  border: 0;
  height: 0;
  border-top: 1px solid #2a2d4858;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderFooter = styled.div`
  display: flex;
  align-items: center;
`;

export default Subject;
