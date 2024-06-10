import Hero from "../Banner/Hero";
import Category from "./Category";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="container">
        <div className="row">
          <div className="col-2"><Category /></div>
          <div className="col-10 mt-3"><h1>Hello Post</h1></div>

      </div>
    </div>
  </div>
  );
};

export default Home;
