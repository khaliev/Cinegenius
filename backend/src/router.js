const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

const questionsList = [
  {
    id: 1,
    name: "Quelle durée préférez-vous pour un film?",
    options: [
      { id: 10, value: "Court (moins de 1h30)" },
      { id: 11, value: "Moyen (entre 1h30 et 2h)" },
      { id: 12, value: "Long (entre 2h et 3h)" },
    ],
  },
  {
    id: 2,
    name: "Quel genre de film vous intéresse-t-il?",
    options: [
      { id: 28, value: "Action" },
      { id: 35, value: "Comédie" },
      { id: 27, value: "Horreur" },
      { id: 10749, value: "Romance" },
      { id: 878, value: "Science-fiction" },
    ],
  },
  {
    id: 3,
    name: "Sa date de parution?",
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
