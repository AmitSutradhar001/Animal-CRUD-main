import express from "express";

const PORT = 3000;

const app = express();

app.use(express.json());

let animals = [
  { id: 1, name: "Tiger" },
  { id: 2, name: "Rabit" },
];

// GET all animals
app.get("/animals", (req, res) => {
  try {
    res.json(animals);
  } catch (error) {
    console.error("Error retrieving all animals:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET a animal by id
app.get("/animals/:id", (req, res) => {
  try {
    const animalId = req.params.id;
    const animal = animals.find((animal) => animal.id == animalId);
    if (animal) {
      res.json(animal);
    } else {
      res.status(404).json({ message: "animal not found" });
    }
  } catch (error) {
    console.error("Error retrieving animal by ID:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new animal
app.post("/animals", (req, res) => {
  try {
    const newAnimal = req.body;
    animals.push(newAnimal);
    res.status(201).json({ message: "animal added!" });
  } catch (error) {
    console.error("Error while adding a new animals:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT (Update) a animal by ID
app.put("/animals/:id", (req, res) => {
  try {
    const animalId = req.params.id;
    const updatedAnimal = req.body;
    console.log(updatedAnimal);
    const index = animals.findIndex((animal) => animal.id == animalId);
    if (index !== -1) {
      animals[index] = updatedAnimal;
      res.json(updatedAnimal);
    } else {
      res.status(404).json({ message: "Animal not found" });
    }
  } catch (error) {
    console.error("Error updating a animal:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a animal by ID
app.delete("/animals/:id", (req, res) => {
  try {
    const animalId = req.params.id;
    const index = animals.findIndex((animal) => animal.id == animalId);
    if (index != -1) {
      animals.splice(index, 1);
      res.sendStatus(204).send();
    } else {
      res.status(404).json({ message: "Animal not found!" });
    }
  } catch (error) {
    console.error("Error deleting a animal:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
