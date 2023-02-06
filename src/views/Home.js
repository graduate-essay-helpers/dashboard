import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Home = () => {
    const { user, logout } = useContext(UserContext);
    return (
        <div className="home">
            <h1>Hello</h1>
        </div>
    )
}

export default Home;