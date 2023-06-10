import React from 'react'
import { useState } from 'react';

const ShowMostVoted = ({ mostVotes, mostVotedAnecdote }) => {
  if (mostVotes === 0) {
    return (
      <div>
        <p>No vote has been casted yet</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>{mostVotedAnecdote}</p>
        <p>This anecdote is the most voted with {mostVotes} votes</p>
      </div>
    );
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well."
  ];

  // create object to store votes for each quote
  // asigned store votes to setVote state
  // asign vote to each quote on display when clicking on vote button
  // display vote for each quote

  // const points = { 0: 1, 1: 3, 2: 4, 3: 2 };
  // console.log(points[2])

  function voteTracker(arr) {
    let indexes = {};
    for (let i = 1; i <= arr.length; i++) {
      indexes[i] = 0;
    }
    return indexes;
  }

  function mostPopular() {
    let greatest = 0;
    let key;
    for (let x in votes) {
      if (votes[x] > greatest) {
        key = x;
        greatest = votes[key];
      }
    }
    const result = { [key]: greatest };
    return result;
  }

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(voteTracker(anecdotes));

  // This function can be merged directly into handleClick
  // function quoteIndex() {
  //   return Math.floor(Math.random() * anecdotes.length);
  // }

  // handleClick only throws a random interger number and assign that number to selected to the be pointed to the anecdotes array to get a quote
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    const newVotes = { ...votes };
    newVotes[selected + 1]++;
    setVotes(newVotes);
  };

  const mostVotes = Number(Object.values(mostPopular())[0]);
  const mostVotedAnecdote =
    anecdotes[Number(Object.keys(mostPopular())[0]) - 1];

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>This quote has: {votes[selected + 1]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anectdote</button>
      <h2>Anecdote with the most votes</h2>
      <ShowMostVoted
        mostVotedAnecdote={mostVotedAnecdote}
        mostVotes={mostVotes}
      />
    </div>
  );
};

export default App