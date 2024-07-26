// import logo from "./logo.svg";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import MyCard from "./Component/MyCard";
// import { dataArr } from "./utils/utilsArr";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const responce = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    // console.log(responce.data.slice(0, 30));
    setPosts(responce.data.slice(0, 30));
  };
  useEffect(() => {
    getPosts();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItemss = posts.slice(itemOffset, endOffset);
  if (JSON.stringify(currentItemss) !== JSON.stringify(currentItems)) {
    setCurrentItems(currentItemss);
  }
  const pageCount = Math.ceil(posts.length / itemsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  console.log(itemOffset, "itemOffset", posts);
  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5 pt-5 fw-bold fs-1">
        Loading...
      </div>
    );
  return (
    <Container>
      <Row className="mx-5 my-5">
        {currentItems.map((post, index) => {
          return (
            <Col className="col-4" key={index}>
              <MyCard
                posts={posts}
                setPosts={setPosts}
                handlePageClick={handlePageClick}
                post={post}
                index={index}
                currentPage={currentPage}
                // setCurrentPage={setCurrentPage}
              />
            </Col>
          );
        })}
      </Row>
      <ReactPaginate
        className="react-paginate"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </Container>
  );
}

export default App;
