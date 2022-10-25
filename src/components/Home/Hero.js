import "./css/Hero.css";
import test from "../../assets/image/test.jpg";

function Hero(props) {
  return (
    <>
      <section className="hero">
        <div className="container hero_content">
          <div className="hero_content_left">
            <h2 className="hero_content_title">
              Get organized. <br /> Stay creative.
            </h2>
            <p className="hero_content_desc">
              Meet&Note is an easy-to-use tool to organize your ideas and
              projects into visual boards.
            </p>
            <div className="hero_contain_button">
              <button
                className="button_home button_primary"
                onClick={props.signUp}
              >
                Sign Up For Free
              </button>
            </div>
          </div>
          <div className="hero_content_right">
            <div className="hero_content_img">
              <img src={test} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
