import { useState, useEffect } from "react";
import { IType } from "app/domain/application/interfaces/IType";
import { api } from "app/infrastructure/externals/mock/mockApiTypes";

export function useTypesApi() {
  const [types, setTypes] = useState<IType[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchTypes = () => {
    setLoading(true);
    const stored = localStorage.getItem("types");
    api.get("/types")
      .then((response) => {
        if(stored) setTypes(JSON.parse(stored));
        else setTypes(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    const handleStorageChange = () => fetchTypes(); 
  
    window.addEventListener("storage", handleStorageChange);
    fetchTypes();
  
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addType = async (newType: IType) => {
    console.log('newType', newType);
    
    const response = await api.post("/types", newType);
    setTypes((prevTypes) => [...prevTypes, response.data]);
  };

  const updateType = async (updatedType: IType) => {
    console.log('updatedType', updatedType);

    const response = await api.put(`/types/${updatedType.id}`, updatedType);
    setTypes((prevTypes) =>
      prevTypes.map((type) => (type.id === updatedType.id ? response.data : type))
    );
  };

  const deleteType = async (id: number) => {
    await api.delete(`/types/${id}`);
    setTypes((prevTypes) => prevTypes.filter((type) => type.id !== id));
  };

  return { types, loading, addType, updateType, deleteType };
}