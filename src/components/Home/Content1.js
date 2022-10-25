import "./css/Content1.css";

function Content1(props) {
  return (
    <>
      <section className="content1">
        <h3 className="content_title">Collect everything in one place</h3>
        <p className="content_subtitle"></p>

        <div className="contain_content1 container">
          <div className="card_content1">
            <div className="card_img">
              <img
                src="https://images.prismic.io/milanote/45cf75e0-22ed-40df-ac23-4e8dfe6f1744_image-write-notes-lists.png?auto=compress%2Cformat&w=600"
                alt=""
              />
            </div>
            <div className="card_text">
              <p className="title">Write notes & to-do lists</p>
              <p className="desc">
                Simple text editing and task management make it easy to add your
                thoughts to a board.
              </p>
            </div>
          </div>

          <div className="card_content1">
            <div className="card_img">
              <img
                src="https://images.prismic.io/milanote/225d281d-c602-45c3-b070-822e24e10331_image-upload-files.png?auto=compress%2Cformat&w=600"
                alt=""
              />
            </div>
            <div className="card_text">
              <p className="title">Write notes & to-do lists</p>
              <p className="desc">
                Simple text editing and task management make it easy to add your
                thoughts to a board.
              </p>
            </div>
          </div>
          <div className="card_content1">
            <div className="card_img">
              <img
                src="https://images.prismic.io/milanote/0c215c36-0679-49c0-b9e7-5be46235e0b1_image-save-test-images-links%402x.png?auto=compress%2Cformat&w=600"
                alt=""
              />
            </div>
            <div className="card_text">
              <p className="title">Write notes & to-do lists</p>
              <p className="desc">
                Simple text editing and task management make it easy to add your
                thoughts to a board.
              </p>
            </div>
          </div>
          <div className="card_content1">
            <div className="card_img">
              <img
                src="https://images.prismic.io/milanote/8d93749e-4d08-450e-8e91-97f22f64106c_image-add-notes.png?auto=compress%2Cformat&w=600"
                alt=""
              />
            </div>
            <div className="card_text">
              <p className="title">Write notes & to-do lists</p>
              <p className="desc">
                Simple text editing and task management make it easy to add your
                thoughts to a board.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Content1;
