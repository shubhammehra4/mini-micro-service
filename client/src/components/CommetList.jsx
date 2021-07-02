import React from "react";

function CommetList({ comments }) {
    const renderedComments = comments.map((c) => {
        let content;
        if (c.status === "approved") content = c.content;
        else if (c.status === "pending") content = "Pending Review";
        else content = "Comment Rejected";

        return <li key={c.id}>{content}</li>;
    });

    return <ul>{renderedComments}</ul>;
}

export default CommetList;
