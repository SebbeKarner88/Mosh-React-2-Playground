import axios from "axios";
import {useQuery} from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const UsePost = () => {

    const fetchPosts = () =>
    axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.data);

    return useQuery<Post[], Error>({
        queryKey: ['posts'],
        queryFn: fetchPosts
    })
};

export default UsePost;