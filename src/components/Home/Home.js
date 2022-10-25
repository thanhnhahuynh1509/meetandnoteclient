import "./css/Home.css";
import Header from "./Header";
import Hero from "./Hero";
import Content1 from "./Content1";
import ceo from "../../assets/image/ceo.png";
import sales from "../../assets/image/saleschair.png";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  const navigateSignIn = () => {
    navigate("/sign-in");
  };

  const navigateSignUp = () => {
    navigate("/sign-up");
  };
  return (
    <div className="Home">
      <Header signIn={navigateSignIn} signUp={navigateSignUp} />
      <Hero signUp={navigateSignUp} />
      <Content1 />

      <section className="content2">
        <div>
          <h3 className="content_title">Organize visually</h3>
          <p
            className="content_subtitle"
            style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
          >
            Meet&Note's flexible drag and drop interface lets you arrange things
            in whatever way makes sense for your project.
          </p>

          <div className="container content2_content">
            <img
              src="https://images.prismic.io/milanote/184fed5a-5b9e-4369-8b65-51d4e9005f76_Image-Article-Research-Board.png?auto=compress%2Cformat&w=1800"
              alt=""
            />
          </div>
        </div>

        <div>
          <h3 className="content_title">Collaborate with your team</h3>
          <p
            className="content_subtitle"
            style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
          >
            Use Meet&Note as your online whiteboard to brainstorm ideas and work
            with your team, wherever they’re located.
          </p>

          <div className="container content2_content">
            <img
              src="https://images.prismic.io/milanote/9038117d-0669-49f3-96fa-54e387fcdd75_Image-sketch-ideas-board.png?auto=compress%2Cformat&w=1800"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="members container">
        <h3 className="content_title">All members of Meet&Note</h3>
        <p
          className="content_subtitle"
          style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
        ></p>
        <div className="contain_member_cards">
          <div className="member_card">
            <div className="member_card_img">
              <img src={ceo} alt="" />
              <div
                className="img_bg"
                style={{ backgroundColor: "#0e0938" }}
              ></div>
            </div>
            <div className="member_card_desc">
              <p className="member_name">Huynh Thanh Nha</p>
              <p className="member_pos">Founder & CEO of Meet&Note</p>
            </div>
          </div>

          <div className="member_card">
            <div className="member_card_img">
              <img src={ceo} alt="" />
              <div
                className="img_bg"
                style={{ backgroundColor: "#0e0938" }}
              ></div>
            </div>
            <div className="member_card_desc">
              <p className="member_name">Huynh Thanh Nha</p>
              <p className="member_pos">Founder & CEO of Meet&Note</p>
            </div>
          </div>

          <div className="member_card">
            <div className="member_card_img">
              <img src={sales} alt="" />
              <div
                className="img_bg"
                style={{ backgroundColor: "rgb(243, 207, 77)" }}
              ></div>
            </div>
            <div className="member_card_desc">
              <p className="member_name">Duong Thanh Tam</p>
              <p className="member_pos">Sales chair & Marketing</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="testimonials"></section> */}
      <footer></footer>
    </div>
  );
}

export default Home;
