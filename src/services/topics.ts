import { apiClient } from "../utils/axios";

const createTopicService = async (topic: unknown) => {
  try {
    const res = await apiClient.post(`/api/topics`, topic);
    return res.data;
  } catch (err) {
    return null;
  }
};

const getAllTopicstService = async () => {
  try {
    const res = await apiClient.get(`/api/topics`);
    return res.data;
  } catch (err) {
    return null;
  }
};

const getTopicByIdService = async (topicId: string) => {
  try {
    const res = await apiClient.get(`/api/topics/${topicId}`);
    return res.data;
  } catch (err) {
    return null;
  }
};

export { createTopicService, getAllTopicstService, getTopicByIdService };
