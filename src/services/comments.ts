import { apiClient } from "../utils/axios";

const createCommentService = async (topicId: string, description: string) => {
  try {
    const res = await apiClient.post(`/api/comments`, {
      correlationId: "1234",
      topicId,
      description,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

const getCommentByTopicIdService = async (topicId: string) => {
  try {
    const res = await apiClient.get(`/api/comments?topicId=${topicId}`);
    return res.data;
  } catch (err) {
    return null;
  }
};

export { createCommentService, getCommentByTopicIdService };
