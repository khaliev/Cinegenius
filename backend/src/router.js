const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

const questionsList = [
  {
    id: 1,
    name: "Quelle occasion?",
    options: [
      { id: 10, value: "En famille" },
      { id: 11, value: "Entre amis" },
      { id: 12, value: "Seul(e)" },
      { id: 13, value: "En couple" },
    ],
  },
  {
    id: 2,
    name: "Quel genre de film?",
    options: [
      { id: 20, value: "Action" },
      { id: 21, value: "Comédie" },
      { id: 22, value: "Drame" },
      { id: 23, value: "Horreur" },
      { id: 24, value: "Science-fiction" },
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
