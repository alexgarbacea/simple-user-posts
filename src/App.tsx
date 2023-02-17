import React, { useState } from 'react';
import './Style/App.css'
import UserDisplay from './Components/UserDisplay';
import { User } from './Interfaces/UserInterface';
import { Post } from './Interfaces/PostInterface';

function App() {
  const USER_API = 'https://jsonplaceholder.typicode.com/users'
  const POSTS_API = 'https://jsonplaceholder.typicode.com/posts?userId='

  const [userList, setUserList] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const userFetch = (): Promise<User[]> => {
    return new Promise((resolve, reject) => {
      // simulate loading time
      setTimeout(() => {
        fetch(USER_API)
        .then((response: Response) => {
          if (response.status !== 200) return reject('Error')
          return resolve(response.json())
        })
      }, 2000)
    })
  }

  const postFetch = (id: number): Promise<Post[]> => {
    return new Promise((resolve, reject) => {
      // simulate loading time
      setTimeout(() => {
        fetch(`${POSTS_API}${id}`)
        .then((response: Response) => {
          if (response.status !== 200) return reject('Error')
          return resolve(response.json())
        })
      }, 2000)
    })
  }

  const loadUsers = (): void => {
    setLoading(true)
    userFetch()
    .then((result: User[]) => {
      setUserList(result)
    })
    .catch((error: string) => {
      console.log(error)
      setUserList([])
    })
    .finally(() => setLoading(false))
  }

  return (
    <div className="App">
      <h1>User posts</h1>
      {
        !loading ?
        ( userList.length > 0 ?
        <UserDisplay users={userList} postFetch={postFetch} /> :
        <div className='button' onClick={loadUsers}>Load users</div> ) :
        <span className="loader" />
      }
      
    </div>
  );
}

export default App;
