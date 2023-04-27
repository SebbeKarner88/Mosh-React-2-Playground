import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constants";
import todoService, {Todo} from "../services/todoService";

const UseTodos = () => {

    return useQuery<Todo[], Error>({
        queryKey: CACHE_KEY_TODOS,
        queryFn: todoService.getAll,
        staleTime: 10*1000 // här kan vi sätta specifika configs som vi vill att just denna query ska ha.
    })
};

export default UseTodos;