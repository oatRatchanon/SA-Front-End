import { useParams } from "react-router-dom";
import styled from "styled-components";
import TopicCard from "../components/TopicCard";
import FileCard from "../components/FileCard";
import { useCallback, useEffect, useState, createRef, RefObject } from "react";
import { File, Subject, Topic } from "../types";
import Modal, { Styles } from "react-modal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TopicIcon from "@mui/icons-material/Topic";
import { useStore } from "../hooks/useStore";
import { GATEWAY_URL } from "../config/env";
import { getSubjectByIdService } from "../services/subjects";
import {
  getAllBookmark,
  searchFileService,
  uploadFileService,
} from "../services/files";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { createTopicService, getAllTopicstService } from "../services/topics";

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
  description: string;
}

const googleLoginURL = `${GATEWAY_URL}/api/auth/google/login`;

function Subject() {
  const { id } = useParams();
  const [subject, setSubject] = useState<Subject>({
    id: 1,
    subjectId: "6",
    name: "Hello6",
    semester: 1,
    year: 2022,
    sectionNumbers: [1],
  });
  const [inputs, setInputs] = useState<Inputs>({ description: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingF, setIsLoadingF] = useState<boolean>(true);
  const [isLoadingT, setIsLoadingT] = useState<boolean>(true);
  const { user } = useStore();
  const checkboxref: RefObject<HTMLInputElement> = createRef();

  // Modal
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleTopicChange = (event: { target: HTMLInputElement }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleTopicSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let section;
    if (subject.sections) section = subject.sections[0].number;
    const topic = {
      description: inputs.description,
      year: subject.year,
      section: section,
      semester: subject.semester,
      subjectId: id,
    };
    await createTopicService(topic);
    setInputs({ description: "" });
    closeModal();
    const results = await getAllTopicstService();
    const topicsFilter = results.topics.filter((topic: Topic) => {
      return topic.forum.subjectId === id;
    });
    setTopics(topicsFilter);
    setIsLoadingT(false);
  };

  const handleFileSubmit = async (event: { target: HTMLInputElement }) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && id) {
      setIsLoadingF(true);
      await uploadFileService(selectedFile, id);
      const checkboxElement = checkboxref.current;
      if (checkboxElement && checkboxElement.value.length > 0) {
        if (checkboxElement.checked) checkboxElement.checked = false;
      }
      await fetchFiles();
      setIsLoadingF(false);
    }
  };

  const fetchFiles = useCallback(async () => {
    if (id) {
      let fileIds: string[] = [];
      if (user) {
        const res = await getAllBookmark();
        fileIds = res.fileIds === undefined ? [] : res.fileIds;
      }
      const results = await searchFileService(id);
      let tempfiles = results.fileNames.map((fileName: string) => {
        return { name: fileName };
      });
      tempfiles = results.fileIds.map((fileId: string, index: number) => {
        return {
          name: tempfiles[index].name,
          id: fileId,
          star: fileIds.includes(fileId),
        };
      });
      setFiles(tempfiles);
    }
  }, [id, user]);

  const handleBookmarkFilesChange = async (event: {
    target: HTMLInputElement;
  }) => {
    let { fileIds } = await getAllBookmark();
    fileIds = fileIds === undefined ? [] : fileIds;

    if (event.target.checked && id) {
      const results = await searchFileService(id);
      let tempfiles = results.fileNames.map((fileName: string) => {
        return { name: fileName };
      });
      tempfiles = results.fileIds.map((fileId: string, index: number) => {
        return {
          name: tempfiles[index].name,
          id: fileId,
          star: fileIds.includes(fileId),
        };
      });
      const book = tempfiles.filter((file: File) => {
        return fileIds.includes(file.id);
      });
      setFiles(book);
    } else if (!event.target.checked) {
      await fetchFiles();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const results = await getSubjectByIdService(Number(id));
        setSubject(results.subject);
        await fetchFiles();
        setIsLoading(false);
        setIsLoadingF(false);
      }
    };
    fetchData();
  }, [id, fetchFiles]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const results = await getAllTopicstService();
        const topicsFilter = results.topics.filter((topic: Topic) => {
          return topic.forum.subjectId === id;
        });
        setTopics(topicsFilter);
        setIsLoadingT(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <SubjectContainer>
      <CenterContainer>
        {isLoading ? (
          <HeaderContainer>
            <Box sx={{ width: 300, lineHeight: "2rem" }}>
              <Skeleton />
              <Skeleton />
            </Box>
          </HeaderContainer>
        ) : (
          <HeaderContainer>
            <h1>
              {subject.subjectId} {subject.name}
            </h1>
            <HeaderFooter>
              <h3 style={{ color: "#6b6b6b", marginRight: "1rem" }}>
                Year : {subject.year} | Semester : {subject.semester} | Section
                : {subject.sections && subject.sections[0].number}
              </h3>
            </HeaderFooter>
          </HeaderContainer>
        )}
        <FileContainer>
          <FileHeader>
            <StyledHeader>
              <InsertDriveFileIcon /> Files
              {user && (
                <div style={{ fontSize: "16px", marginLeft: "1rem" }}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={handleBookmarkFilesChange}
                      ref={checkboxref}
                    />
                    <span> Bookmark</span>
                  </label>
                </div>
              )}
            </StyledHeader>
            {user ? (
              <Button>
                <label
                  htmlFor="file"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    gap: ".5rem",
                    alignItems: "center",
                  }}
                >
                  <FileUploadIcon />
                  Upload File
                </label>
                <FileInput type="file" id="file" onChange={handleFileSubmit} />
              </Button>
            ) : (
              <Button>
                <a href={googleLoginURL}>
                  <label
                    htmlFor="file"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      gap: ".5rem",
                      alignItems: "center",
                    }}
                  >
                    <FileUploadIcon />
                    Upload File
                  </label>
                </a>
              </Button>
            )}
          </FileHeader>
          <FileContent>
            {isLoadingF ? (
              <>
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
              </>
            ) : files.length > 0 ? (
              files?.map((file, index) => {
                return <FileCard key={index} file={file} />;
              })
            ) : (
              <div className="noData">No Data</div>
            )}
          </FileContent>
        </FileContainer>
        <TopicContainer>
          <TopicHeader>
            <StyledHeader>
              <TopicIcon /> Topics
            </StyledHeader>
            {user ? (
              <Button onClick={openModal}>
                <AddCircleOutlineIcon /> Create Topic
              </Button>
            ) : (
              <Button>
                <a href={googleLoginURL}>
                  <AddCircleOutlineIcon /> Create Topic
                </a>
              </Button>
            )}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <ModalText>Create Topic</ModalText>
              <StyledHr /> <br />
              <TopicForm onSubmit={handleTopicSubmit}>
                <label>
                  <b> Description :</b> <br />
                  <br />
                  <StyledInput
                    type="text"
                    name="description"
                    value={inputs.description || ""}
                    onChange={handleTopicChange}
                  />
                </label>
                <StyledSubmit type="submit" />
              </TopicForm>
              <StyledClose onClick={closeModal}>Close</StyledClose>
            </Modal>
          </TopicHeader>
          <TopicContent>
            {isLoadingT ? (
              <>
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
                <Skeleton variant="rounded" width="30%" height={100} />
              </>
            ) : topics.length > 0 ? (
              topics.map((topic, index) => {
                return <TopicCard key={index} topic={topic} />;
              })
            ) : (
              <div className="noData">No Data</div>
            )}
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
  padding-bottom: 4rem;
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
