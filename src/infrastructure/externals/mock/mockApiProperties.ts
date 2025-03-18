/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const api = axios.create();
const mock = new MockAdapter(api, { delayResponse: 1000 });

const getStoredProperties = () => {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem("properties");
  if (!stored) {
    const mockData = [
      { id: 1, name: "Tamaño", type: "número", createdAt: "2025-03-17" },
      { id: 2, name: "Color", type: "texto", createdAt: "2025-03-17" },
      { id: 3, name: "Fecha de Expiración", type: "fecha", createdAt: "2025-03-17" },
    ];
    localStorage.setItem("properties", JSON.stringify(mockData));
    return mockData;
  }
  return JSON.parse(stored);
};

mock.onGet("/properties").reply(200, getStoredProperties());

mock.onPost("/properties").reply((config) => {
  const newProperty = JSON.parse(config.data);
  newProperty.id = Date.now();
  const existingProperties = getStoredProperties();
  existingProperties.push(newProperty);
  localStorage.setItem("properties", JSON.stringify(existingProperties));
  return [201, newProperty];
});

mock.onPut(/\/properties\/.*/).reply((config) => {
  const updatedProperty = JSON.parse(config.data);
  let existingProperties = getStoredProperties();
  existingProperties = existingProperties.map((p: { id: any; }) => (p.id === updatedProperty.id ? updatedProperty : p));
  localStorage.setItem("properties", JSON.stringify(existingProperties));
  return [200, updatedProperty];
});

mock.onDelete(/\/properties\/.*/).reply((config) => {
  const id = parseInt(config.url!.split("/").pop()!);
  let existingProperties = getStoredProperties();
  existingProperties = existingProperties.filter((p: { id: number; }) => p.id !== id);
  localStorage.setItem("properties", JSON.stringify(existingProperties));
  return [200];
});

export { api };
