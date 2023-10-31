import axios from "axios";
import { apiClient } from "../utils/axios";
import { GATEWAY_URL } from "../config/env";
import { getAccessToken } from "./auth";

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

const getAllBookmark = async () => {
  try {
    const res = await apiClient.get(`/api/files/bookmark`);
    return res.data;
  } catch (err) {
    return null;
  }
};

const createBookmark = async (fileId: string) => {
  try {
    const res = await apiClient.post(`/api/files/bookmark`, {
      fileId: fileId,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

const deleteBookmark = async (fileId: string) => {
  try {
    const accessToken = getAccessToken();
    const res = await axios.delete(`${GATEWAY_URL}/api/files/bookmark`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        fileId: fileId,
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

export {
  searchFileService,
  uploadFileService,
  getAllBookmark,
  createBookmark,
  deleteBookmark,
};
