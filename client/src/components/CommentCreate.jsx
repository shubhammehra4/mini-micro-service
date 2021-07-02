import React, { useRef } from "react";
import axios from "axios";

function CommentCreate({ id }) {
    const input = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const content = input.current.value;
        await axios.post(`http://localhost:4001/posts/${id}/comments`, {
            content,
        });
        input.current.value = "";
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input ref={input} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CommentCreate;
