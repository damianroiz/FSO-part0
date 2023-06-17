import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Name from "./components/Name";

// const Persons = () => {};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3005/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addName = (event) => {
    event.preventDefault();
    const trimmedName = newName.trim().replace(/\s+/g, " ");
    const directory = {
      name: trimmedName,
      number: newNumber,
      id: persons.length + 1,
    };
    const nameChecker = persons.some((person) => person.name === trimmedName);
    if (nameChecker) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(directory));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  // const filter = (searchValue) => {
  //   if (searchValue !== "") {
  //     const results = persons.filter((person) =>
  //       person.name.toLowerCase().startsWith(searchValue.toLowerCase())
  //     );
  //     setFilteredUsers(results);
  //   } else {
  //     setFilteredUsers(persons);
  //   }
  //   console.log(filteredUsers > 0)
  // };
  // I deleted this funciton as it was keeping data in two different states and that is what I need to avoid in React. Instead, filteredUsers()

  const filteredUsers = persons.filter((person) =>
    person.name.toLowerCase().startsWith(newSearch.toLowerCase())
  );

  return (
    <div>
      <Filter
        title={"PhoneBook"}
        handleSearch={handleSearch}
        newSearch={newSearch}
      />
      <Form
        doSomething={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        button={"add"}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredUsers.map((person) => (
          <Name key={person.id} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
