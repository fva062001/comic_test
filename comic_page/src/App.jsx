import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

function Modal({ id, closeModal }) {
  const [comicItem, setComic] = useState(null);

  useEffect(() => {
    getElementById(id);
  }, []);
  const getElementById = async (someId) => {
    await axios.get(`http://localhost:8000/comic/${someId}`).then((data) => {
      setComic({
        image: data.data.results.image.original_url,
        name: data.data.results.volume.name,
        name_desc: data.data.results.name,
        description: data.data.results.description,
      });
    });
  };

  const handleClose = () => {
    closeModal();
    setComic(null);
  };

  console.log(comicItem);
  return (
    <>
      {comicItem && (
        <>
          <div className="modal" onClick={handleClose}></div>
          <div className="modal_content">
            <img
              className="large_image"
              src={comicItem.image ? comicItem.image : null}
              alt=""
            />
            <div>
              <h1 className="comic_title">{comicItem.name}</h1>{" "}
              <p className="comic_title">
                <span>Chapter:</span>{" "}
                {comicItem.name_desc ? comicItem.name_desc : "No chapter name"}
              </p>
              <p className="comic_title">
                <span>Description:</span>{" "}
                {comicItem.description
                  ? comicItem.description
                  : "No description"}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Main() {
  const [comics, setComics] = useState(null);
  const [show, setShow] = useState(false);
  const [showId, setShowId] = useState(null);
  const { isLoading, error, data } = useQuery("comicData", () =>
    axios.get("http://localhost:8000/comics").then((data) => {
      let comics_list = data.data.results;
      setComics(comics_list);
    })
  );

  if (isLoading) return <h1>Im loading...</h1>;
  if (error) return <h2>Error</h2>;

  const handleClick = (id) => {
    setShow(true);
    setShowId(id);
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      {show && <Modal id={showId} closeModal={closeModal} />}
      <div className="main_container">
        {comics.map((data) => {
          return (
            <div className="image_container" key={data.id}>
              <img
                onClick={() => handleClick(data.id)}
                className="comic_image"
                src={data.image.medium_url}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
