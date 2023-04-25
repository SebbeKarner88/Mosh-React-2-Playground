import axios from "axios";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostQuery {
    // page: number; för prev,next knappar
    pageSize: number;
}

const UsePost = (query: PostQuery/*userId: number | undefined*/) =>  // här skickar vi med userid för att filtrera på users

    useInfiniteQuery<Post[], Error>({
        queryKey: ['posts', query] /*userId ? ['users', userId, 'posts'] : ['posts']*/, // turnery ifall vi väljer ingen user, så visas bara posts i query devtools
        queryFn: ({pageParam = 1}) => axios // ifall vi kör infinite, pageparam skickas med för att hålla reda på vilken sida vi är på.
            .get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    //userId userfiltrering
                    _start: (/*query.page*/pageParam - 1) * query.pageSize,
                    _limit: query.pageSize
                }
            })
            .then((res) => res.data),
        staleTime: 1 * 60 * 1000, // 1min
        keepPreviousData: true, // detta gör så att inte sidan hoppar upp till start varje gång vi fetchar ny data.
        getNextPageParam: (lastPage, allPages) => { // här skriver vi syntax för att kunna ladda nya sidor.
            return lastPage.length > 0 ? allPages.length + 1 : undefined; // ifall listan är slut =0 så retuyrneras undefined.
        }
    })


export default UsePost;