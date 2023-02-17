import React, {useState} from 'react'
import { Post } from '../Interfaces/PostInterface'
import { UserDisplayInterface } from '../Interfaces/PropsInterface'
import { User } from '../Interfaces/UserInterface'
import '../Style/Users.css'

const UserDisplay = ({users, postFetch}: UserDisplayInterface) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [postList, setPostList] = useState<Post[]>([])
    const [currPostUId, setCurrPostUId] = useState<number>()

    const loadPosts = (id: number): void => {
        if(loading) return
        setCurrPostUId(id)
        setLoading(true)
        postFetch(id)
        .then((result: Post[]) => {
          setPostList(result)
        })
        .catch((error: string) => {
          console.log(error)
          setPostList([])
        })
        .finally(() => setLoading(false))
      }

    return (
        <section className='users-wrapper'>
            {
                users.map((user: User, i: number) => {
                    return(
                        <div className='user-card' key={user.username + i}>
                            <div>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                                <p>{user.website}</p>
                                {
                                    loading && currPostUId === user.id ?
                                    <span className="loader" /> :
                                    <p className='link-button' onClick={() => loadPosts(user.id)}>
                                        View posts
                                    </p>
                                }
                            </div>
                            {
                                !loading && currPostUId === user.id &&
                                <div className='post-view'>
                                    {
                                        postList.length > 0 ?
                                        postList.map((post: Post, i: number) => {
                                            return(
                                                <div key={post.title + i} className='single-post'>
                                                    <h3>{post.title}</h3>
                                                    <p>{post.body}</p>
                                                </div>
                                            )
                                        })
                                        :
                                        <p>No posts...</p>
                                    }
                                </div>
                            }
                        </div>
                    )
                })
            }
        </section>
    )
}

export default UserDisplay