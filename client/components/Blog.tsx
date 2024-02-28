import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import Image from "../public/assets/images/tree-736885_1280.jpg";

interface BlogProps {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  text: string;
  color: string;
}

const Blog: React.FC<BlogProps> = ({
  id,
  image,
  title,
  subtitle,
  text,
  color,
}) => {
  const router = useRouter();

  const handleReadMoreClick = () => {
    // Now you can use the 'id' in whatever way you need
    router.push(`/blogs/${id}`);
  };

  console.log("This is image : " + image);

  return (
    <Card>
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <img alt={image} className="h-full w-full " src={image || Image.src} />
      </div>
      <CardBody className="p-3">
        <CardTitle tag="h5" className="h-10 overflow-hidden">
          <strong>
            {" "}
            {title
              ? title.length < 80
                ? `${title}`
                : `${title.substring(0, 32)} ...`
              : "This news has now heading"}
          </strong>
        </CardTitle>
        {/* <CardSubtitle> <small className="text-gray-400">{subtitle}</small></CardSubtitle> */}
        <CardText className="mt-1 h-12 overflow-hidden">
          <small className="text-gray-400">
            {" "}
            {text.length < 80 ? `${text}` : `${text.substring(0, 32)} ...`}
          </small>{" "}
        </CardText>
        <Button
          color={"primary"}
          className="btn-sm my-2 bg-slate-700"
          onClick={handleReadMoreClick}
        >
          Read More
        </Button>
      </CardBody>
    </Card>
  );
};

Blog.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Blog;
