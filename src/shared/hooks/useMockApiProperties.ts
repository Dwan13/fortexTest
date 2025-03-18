import { useState, useEffect } from "react";
import { IProperty } from "app/domain/application/interfaces/IProperty";
import { api } from "app/infrastructure/externals/mock/mockApiProperties";

export function usePropertiesApi() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = () => {
    setLoading(true);
    const stored = localStorage.getItem("properties");
    api.get("/properties")
      .then((response) => {
        if (stored) setProperties(JSON.parse(stored));
        else setProperties(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    const handleStorageChange = () => fetchProperties();
    
    window.addEventListener("storage", handleStorageChange);
    fetchProperties();
    
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addProperty = async (newProperty: IProperty) => {
    console.log('newProperty', newProperty);
    
    const response = await api.post("/properties", newProperty);
    setProperties((prevProperties) => [...prevProperties, response.data]);
  };

  const updateProperty = async (updatedProperty: IProperty) => {
    console.log('updatedProperty', updatedProperty);

    const response = await api.put(`/properties/${updatedProperty.id}`, updatedProperty);
    setProperties((prevProperties) =>
      prevProperties.map((property) => (property.id === updatedProperty.id ? response.data : property))
    );
  };

  const deleteProperty = async (id: number) => {
    await api.delete(`/properties/${id}`);
    setProperties((prevProperties) => prevProperties.filter((property) => property.id !== id));
  };

  return { properties, loading, addProperty, updateProperty, deleteProperty };
}
