import React from "react";
import { useParams } from "react-router-dom";

const AuthorDetails = () => {
    const { id } = useParams();
    return <div>{id}</div>;
};

export default AuthorDetails;
