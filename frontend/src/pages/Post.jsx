import '../styles/Home.css';
function Post(props) {
  return (
    <div className="brag">
        {/* <img src ="https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg" alt="test image"></img> */}
        <p>username: {props.name}</p>
        <p>points: {props.point}</p>
    </div>
  );
}

export default Post;
