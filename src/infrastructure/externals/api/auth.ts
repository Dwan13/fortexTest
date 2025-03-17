/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICustomJwtPayload } from "app/domain/application/interfaces/ICustomJwtPayload";
import apiClient from "./apiClient";
import {jwtDecode} from 'jwt-decode';

export const login = async (username: string, password: string) => {

  try {
    const res = await apiClient.post("/login", { username, password });
    const { token, userId, username: name } = res.data;
    const decodedToken = jwtDecode<ICustomJwtPayload>(token);
    const isAdmin = decodedToken?.isAdmin;

    localStorage.setItem("token", token);

    console.log('res.data', res.data, token);

    return { userId, name, isAdmin };
  } catch (error) {
    throw new Error("Credenciales inválidas");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};
