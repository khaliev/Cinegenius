const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

const questionsList = [
  {
    id: 1,
    name: "Quelle occasion?",
    options: [
      { id: 10, value: "Entre famille" },
      { id: 11, value: "Entre amis" },
      { id: 12, value: "Date" },
      { id: 13, value: "Solo" },
    ],
  },
  {
    id: 2,
    name: "Quel genre de film?",
    options: [
      { id: 20, value: "Action" },
      { id: 21, value: "Comédie" },
      { id: 22, value: "Horreur" },
      { id: 23, value: "Romance" },
      { id: 24, value: "Science-fiction" },
    ],
  },
  {
    id: 3,
    name: "Date de publication?",
    options: [
      { id: 30, value: "-3 ans" },
      { id: 31, value: "-5 ans" },
      { id: 32, value: "-10 ans" },
      { id: 33, value: "-20 ans" },
      { id: 34, value: "+20 ans" },
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
