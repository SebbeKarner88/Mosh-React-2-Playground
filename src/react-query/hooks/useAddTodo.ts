import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CACHE_KEY_TODOS} from "../constants";
import todoService, {Todo} from "../services/todoService";

interface AddTodoContext {
    previousTodos: Todo[]
}

const useAddTodo = (onAdd: () => void) =>  {

    const queryClient = useQueryClient();

    return useMutation<Todo, Error, Todo, AddTodoContext>({

        mutationFn: todoService.post,

        onMutate: (newTodo: Todo) => { // Uppdaterar så posten syns i listan direkt, sen kollar vi om det fungerade. OPTIMISTIC

            const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || []; // context objekt till onerror nedan

            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS,
                (todos= []) => [newTodo, ...todos]);

            onAdd();

            return {previousTodos} // här returnerar vi context.
        },

        onSuccess: (savedTodo, newTodo) => {

            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, // on success, så lägger posten till i listan i backend.
                todos => todos?.map(todo =>
                    todo === newTodo ? savedTodo : todo)) // här uppdaterar vi listan. om inte så oförändrad.
        },

        onError: (error, newTodo, context) => {

            if(!context) return; // här kollar vi om context är truthy,

            queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos) // om det gick fel så tar vi bort posten och återgår till previous som vi har som context.
        }
    });

}

export default useAddTodo;