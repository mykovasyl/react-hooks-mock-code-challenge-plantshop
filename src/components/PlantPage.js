import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((resp) => resp.json())
      .then((data) => {
        setPlants(data);
        console.log(data);
        setIsLoaded(true);
      });
  }, []);

  function handleNewPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((resp) => resp.json())
      .then((postedPlant) => setPlants([...plants, postedPlant]));
  }

  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onFormSubmit={handleNewPlant} />
      <Search onSearch={setSearchTerm} />
      {isLoaded ? (
        <PlantList plantsToDisplay={plantsToDisplay} />
      ) : (
        "Loading..."
      )}
    </main>
  );
}

export default PlantPage;
