const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

const questionsList = [
  {
    id: 1,
    name: "Quelle occasion?",
    options: [
      { id: 1, value: "En famille" },
      { id: 2, value: "Entre amis" },
      { id: 3, value: "Seul(e)" },
      { id: 4, value: "En couple" },
    ],
  },
  {
    id: 2,
    name: "Quel genre de film?",
    options: [
      { id: 1, value: "Action" },
      { id: 2, value: "Comédie" },
      { id: 3, value: "Drame" },
      { id: 4, value: "Horreur" },
      { id: 5, value: "Science-fiction" },
    ],
  },
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
