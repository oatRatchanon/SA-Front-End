import { apiClient } from "../utils/axios";

const paginateSubjectService = async (page: number) => {
  try {
    const res = await apiClient.post(`/api/subjects/pages/${page}`);
    return res.data;
  } catch (err) {
    return null;
  }
};

const getSubjectByIdService = async (id: number) => {
  try {
    const res = await apiClient.get(`/api/subjects/${id}`);
    return res.data;
  } catch (err) {
    return null;
  }
};

export { paginateSubjectService, getSubjectByIdService };
