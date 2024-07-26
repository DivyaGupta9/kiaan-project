import React from "react";
import Card from "react-bootstrap/Card";
import { Image, NavLink } from "react-bootstrap";
import { imgArr } from "../utils/utilsArr";

const MyCard = ({ posts, handlePageClick, post, currentPage }) => {
  // console.log(post);
  const ndate = Math.floor(10 * Math.random());
  // console.log(ndate);
  const date = new Date(
    `${ndate + 1}/${ndate + ndate}/2023`
  ).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const removePost = (id) => {
    const objWithIdIndex = posts.findIndex((obj) => obj.id === id);
    posts.splice(objWithIdIndex, 1);

    handlePageClick({ selected: currentPage });
  };
  console.log(post.id % 12);
  return (
    // <div>
    <Card className="my-2" style={{ height: "26rem" }}>
      <Card.Body>
        <span>{post.id}</span>
        <NavLink
          onClick={() => removePost(post.id)}
          to="#"
          className="text-end text-danger mb-1 fw-bold"
        >
          X
        </NavLink>
        <Card.Title>
          {post.title.length > 18
            ? `${post.title.toUpperCase().substring(0, 18)}...`
            : post.title}
        </Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle
          </Card.Subtitle> */}
        <Card.Text>
          {post.body.length > 60
            ? `${post.body.toUpperCase().substring(0, 60)}...`
            : post.body}
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
        <span>{date}</span>
        <Image src={imgArr[post.id % 11]} className="w-100 h-50" />
      </Card.Body>
    </Card>
    // </div>
  );
};

export default MyCard;
