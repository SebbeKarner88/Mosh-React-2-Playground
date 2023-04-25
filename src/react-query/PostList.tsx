import React, {useState} from 'react';
import usePost from "./hooks/usePost";
import 'bootstrap';

const PostList = () => {

    //const [userId, setUserId] = useState<number>() kommentera ut för fitrering på user
    const pageSize = 10;
    //const [page, setPage] = useState<number>(1) För prev,next knappar!
    const {data, error, isLoading, fetchNextPage, isFetchingNextPage} = usePost(/*page,*/ {pageSize}/*userId*/);

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>;

    return (
        <>
            {/* <select onChange={(event) => setUserId(parseInt(event.target.value))} FILTRERA PÅ USER
                    value={userId}
                    className="form-select mb-3">
                <option value=''></option>
                <option value='1'>User 1</option>
                <option value='2'>User 2</option>
                <option value='3'>User 3</option>
            </select> */}
            <ul className="list-group">
                {data.pages.map((page, index) =>
                    <React.Fragment key={index}>
                        {page.map(post =>
                            <li key={post.id} className="list-group-item">
                                {post.title}
                            </li>)}
                    </React.Fragment>)}
            </ul>
            {/* <button
                disabled={page === 1}
                className="btn btn-primary my-3"
                onClick={() => setPage(page -1)}>Previous
            </button>
            <button
                disabled={page === 10}
                className="btn btn-primary my-3 ms-2"
                onClick={() => setPage(page +1)}>Next
            </button>*/}
            <button
                disabled={isFetchingNextPage}
                className="btn btn-primary my-3"
                onClick={() => fetchNextPage()}>{isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
        </>
    );
};

export default PostList;
