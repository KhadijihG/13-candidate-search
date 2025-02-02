import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';
import './CandidateSearch.css'

interface User {
  login: string
}
const CandidateSearch = () => {
  const [users, setUsers] = useState<User[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [currentUser, setCurrentUser] = useState<Candidate>()
  async function getAllUsers() {
    const data = await searchGithub()
    setUsers(data)
  }
  async function getUser() {
    const data = await searchGithubUser(users[currentIndex].login)
    setCurrentUser(data)
  }
  useEffect(() => {
    getAllUsers()


  }, [])
  useEffect(() => {
    // console.log(users)
    if (users.length === 0) return
    getUser()
  }, [users, currentIndex])
  useEffect(() => {
    console.log(currentUser)
  
  }, [currentUser])
function readLocalStorage(){
  const localStorageUsers = localStorage.getItem('users')
  if (localStorageUsers){
    return JSON.parse(localStorageUsers)
  }
  else {
    return []
  }
}
  function handleAddUser(){
setCurrentIndex(currentIndex + 1)
const parsedUsers = readLocalStorage()
parsedUsers.push(currentUser)
localStorage.setItem('users',JSON.stringify(parsedUsers))
  }
function handleSkipUser(){
  setCurrentIndex(currentIndex + 1)
}
  return <div>
    <h1>CandidateSearch</h1>
    <div className='userCard'>
    <p>{currentUser?.login}</p>
    <img src={currentUser?.avatar_url} alt="" />
    <button onClick={handleAddUser}>+</button>
    <button onClick={handleSkipUser}>-</button>
    </div>
    </div>;

};

export default CandidateSearch;
