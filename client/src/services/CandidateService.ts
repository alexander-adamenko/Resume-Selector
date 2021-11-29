import {SERVER_API_URL} from "../constants";
import axios, {AxiosResponse} from "axios";
import {Candidate} from "../models/Candidate";

const candidatesEndpoint = `${SERVER_API_URL}/candidates`;

const axiosInstance = axios.create({ withCredentials: true });
const config = {headers: { 'Content-Type': 'multipart/form-data'}}

class CandidateService {
    getAllCandidates(): Promise<AxiosResponse<Candidate[]/*List with names of resumes*/>> {
        return axiosInstance.get(candidatesEndpoint);
    }

    getNamesUploadedFiles(): Promise<AxiosResponse<string[]/*List with names of resumes*/>> {
        return axiosInstance.get(candidatesEndpoint + "/fileNames");
    }

    uploadResumeOfCandidate(resume: File): Promise<AxiosResponse<Candidate>>{
        let formData = new FormData();
        formData.append("resume", resume)
        return axiosInstance.post(candidatesEndpoint + "/upload", formData, config)
    }

    parseChosenResume(fileName: string): Promise<AxiosResponse<Candidate>>{
        let params = new URLSearchParams();
        params.append("fileName", fileName)
        return axiosInstance.get(candidatesEndpoint + "/parse", {params})
    }

    createCandidate(candidate: Candidate): Promise<AxiosResponse<Candidate>> {
        return axiosInstance.post(SERVER_API_URL + '/candidates', candidate);
    }
}

export default new CandidateService();
