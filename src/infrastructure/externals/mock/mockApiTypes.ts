/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const api = axios.create();
const mock = new MockAdapter(api, { delayResponse: 1000 });

const getStoredTypes = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem("types");

    // Si no hay datos en localStorage, inicializa con 10 elementos de prueba
    if (!stored) {
      const mockData = [
        { id: 1, name: "Tipo Básico", description: "Un tipo simple", properties: ["prop1"], createdAt: "2025-03-17" },
        { id: 2, name: "Tipo Avanzado", description: "Un tipo complejo", properties: ["prop2", "prop3"], createdAt: "2025-03-17" },
        { id: 3, name: "Tipo Personalizado", description: "Definido por el usuario", properties: ["prop4"], createdAt: "2025-03-17" },
        { id: 4, name: "Tipo Predeterminado", description: "Tipo predefinido", properties: ["prop5"], createdAt: "2025-03-17" },
        { id: 5, name: "Tipo Especial", description: "Para casos especiales", properties: ["prop6", "prop7"], createdAt: "2025-03-17" },
        { id: 6, name: "Tipo Legacy", description: "Tipo del sistema antiguo", properties: ["prop8"], createdAt: "2025-03-17" },
        { id: 7, name: "Tipo Temporal", description: "Uso temporal", properties: ["prop9"], createdAt: "2025-03-17" },
        { id: 8, name: "Tipo Experimental", description: "Para pruebas", properties: ["prop10"], createdAt: "2025-03-17" },
        { id: 9, name: "Tipo Archivado", description: "Ya no se usa", properties: ["prop11"], createdAt: "2025-03-17" },
        { id: 10, name: "Tipo Futuro", description: "Planeado para más adelante", properties: ["prop12"], createdAt: "2025-03-17" },
      ];
      localStorage.setItem("types", JSON.stringify(mockData));
      return mockData;
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Error al leer los datos de localStorage", error);
    return [];
  }
};


mock.onGet("/types").reply(200, getStoredTypes());
mock.onPost("/types").reply((config) => {
  const newType = JSON.parse(config.data);
  const existingTypes = getStoredTypes();
  existingTypes.push(newType);
  localStorage.setItem("types", JSON.stringify(existingTypes));
  return [201, newType];
});
mock.onPut(/\/types\/.*/).reply((config) => {
  const updatedType = JSON.parse(config.data);
  let existingTypes = getStoredTypes();
  existingTypes = existingTypes.map((t: { id: any; }) => (t.id === updatedType.id ? updatedType : t));
  localStorage.setItem("types", JSON.stringify(existingTypes));
  return [200, updatedType];
});
mock.onDelete(/\/types\/.*/).reply((config) => {
  const id = parseInt(config.url!.split("/").pop()!);
  let existingTypes = getStoredTypes();
  existingTypes = existingTypes.filter((t: { id: number; }) => t.id !== id);
  localStorage.setItem("types", JSON.stringify(existingTypes));
  return [200];
});

export { api };