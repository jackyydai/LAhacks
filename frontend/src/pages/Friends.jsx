import logo from '../logo.svg';
import Post from "./Post.jsx"
import '../styles/Friends.css';

function Friends() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>S I D E Q U E S T</h1>
        <p>what are your fellow quest-ers up to?</p>
      </header>
    
      <Post />
      <Post />
    </div>
  );
}

export default Friends;
