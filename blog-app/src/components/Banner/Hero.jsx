import "./Hero.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => {
  return (
    <div className="container-hero">
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <h1 className="text-light text-center">
              Welcome to Blog Application
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
