export interface Subject {
  id: number;
  subjectId: string;
  name: string;
  semester: number;
  sections?: { number: number }[];
  year: number;
  faculty?: string;
  description?: string;
  prerequisites?: string[];
  sectionNumbers: number[];
}

export type Instructor = {
  full_name: string;
  email: string;
  phone_number: string;
  degrees: string;
};

export type Topic = {
  _id: ID;
  id: string;
  description: string;
  topicCreator: string;
  forumId: string;
  createAt: Date;
  forum: Forum;
};
export type ID = {
  timestamp: number;
  date: Date;
};
export type Forum = {
  _id: ID;
  id: string;
  subjectId: string;
  year: number;
  section: number;
  semester: number;
};

export type Comment = {
  id?: string;
  topicId?: string;
  description: string;
  authorId?: string;
  createAt: Date;
};

export type File = {
  name: string;
  id: string;
  star: boolean;
};

export type User = {
  email: string;
  displayName: string;
};
