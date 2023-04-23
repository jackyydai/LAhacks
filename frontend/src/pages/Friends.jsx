import logo from '../logo.svg';
import Post from "./Post.jsx"
import '../styles/Friends.css';
import TaskComp from '../components/TaskComp';

function Friends() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>S I D E Q U E S T</h1>
        <p>what are your fellow quest-ers up to?</p>
      </header>

      <div class="wrapper">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>

      <div>
        <form>
            <h2>Add new friends</h2>
            <input></input>
            <button>Add</button>
        </form>
      </div>

      <div></div>

    </div>
  );
}

export default Friends;
