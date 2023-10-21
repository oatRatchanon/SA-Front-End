import { apiClient } from "../utils/axios";

const searchFileService = async (subjectId: string) => {
  try {
    const res = await apiClient.get(`/api/files`, {
      params: {
        subjectId: subjectId,
        ownerUserId: "",
        fileName: "",
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

const uploadFileService = async (file: globalThis.File, subjectId: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("subjectId", subjectId);

    console.log("ser", formData.get("file"));
    const res = await apiClient.post(`/api/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export { searchFileService, uploadFileService };
