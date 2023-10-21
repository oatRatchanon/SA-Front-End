export interface Subject {
  id: number;
  subjectId: string;
  name: string;
  semester: number;
  sectionIds?: number[];
  year: number;
  faculty?: string;
  description?: string;
  prerequisites?: string[];
}

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
  createAt: Date;
};

export type Comment = {
  id: number;
  subjectId: number;
  description: string;
  CommenterId: number;
  createAt: Date;
  topicId: number;
};

export type File = {
  name: string;
};

export type User = {
  email: string;
  displayName: string;
};
