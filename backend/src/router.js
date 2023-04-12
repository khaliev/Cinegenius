const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

const questionsList = [
  { id: 1, name: "quel genre de film aimez-vous ?" },
  { id: 2, name: "deuxieme question" },
  { id: 3, name: "3 eme question " },
];

router.get("/questions", (req, res) => {
  res.json(questionsList);
});

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
