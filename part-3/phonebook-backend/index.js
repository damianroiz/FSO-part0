const express = require("express");
const app = express();

app.use(express.json());

//////////// 3.1
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];


//////////// 3.1
app.get("/api/persons", (request, response) => {
    response.json(persons);
});

////////// 3.2
app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date = new Date()}</p>`)
})

////////////// 3.3 
app.get('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
