import React, { useRef } from "react";
import axios from "axios";

function PostCreate() {
    const input = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const title = input.current.value;
        await axios.post("http://localhost:4000/posts", { title });
        input.current.value = "";
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input ref={input} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PostCreate;
