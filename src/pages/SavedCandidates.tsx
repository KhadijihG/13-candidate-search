import { useEffect, useState } from "react";
import type { Candidate } from '../interfaces/Candidate.interface';
import './SavedCandidates.css'
const SavedCandidates = () => {
  const [savedUsers, setSavedUsers] = useState<Candidate[]>([])
  function readLocalStorage() {
    const localStorageUsers = localStorage.getItem('users')
    if (localStorageUsers) {
      return JSON.parse(localStorageUsers)
    }
    else {
      return []
    }
  }
  useEffect(() => {
    const users = readLocalStorage()
    setSavedUsers(users)
  }, [removeUser])
  function removeUser(userName: string) {
    const users = readLocalStorage()
    const filteredUsers = users.filter((element: Candidate) => element.login !== userName)
    localStorage.setItem('users', JSON.stringify(filteredUsers))
  }
  return (
    <>
      <h1>Potential Candidates</h1>
      <div>
        {
          savedUsers.map((element) => {
            return <div key={element.login} className="savedUserCard">
              <div>{element.login}</div>
              <img src={element.avatar_url} alt="Avatar Image" />
              <button onClick={() => removeUser(element.login ? element.login : '')}>-</button>
            </div>
          })
        }
      </div>
    </>
  );
};

export default SavedCandidates;
