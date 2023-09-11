export type Subject = {
  id: number;
  name: string;
  year: number;
  semester: number;
  section: number;
  instructors: Instructor[];
  description: string;
  prerequisites: Subject[];
  topics: Topic[];
  files: File[];
};

export type Instructor = {
  full_name: string;
  email: string;
  phone_number: string;
  degrees: string;
};

export type Topic = {
  id: number;
  subjectId: number;
  comments: Comment[];
  TopicCreatorId: number;
  description: string;
  createAt: string;
};

export type Comment = {
  id: number;
  subjectId: number;
  description: string;
  CommenterId: number;
  createAt: string;
  topicId: number;
};
