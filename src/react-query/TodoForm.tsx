import {useRef} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Todo} from "./hooks/useTodos";
import axios from "axios";

const TodoForm = () => {

    const queryClient = useQueryClient();

    const addTodo = useMutation<Todo, Error, Todo>({
        mutationFn: (todo: Todo) =>
            axios
                .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
                .then(res => res.data),
        onSuccess: (savedTodo, newTodo) => {
            // 1 invalidating the cache, funkar dock inte med JSON placeholder.
            //queryClient.invalidateQueries({
            //  queryKey: ['todos']
            //})

            // 2 Updating the data in cache directly.
            queryClient.setQueryData<Todo[]>(['todos'], todos => [savedTodo, ...(todos || [])]);

            if (ref.current) ref.current.value = ''; // tar bort värde ur input efter success post.
        },
    });

    const ref = useRef<HTMLInputElement>(null);

    return (
        <>
            {addTodo.error && <div className='alert alert-danger'>{addTodo.error.message}</div>} {/*mutate kan också hantera errors*/}
            <form className="row mb-3"
                  onSubmit={event => {
                      event.preventDefault();

                      if (ref.current && ref.current.value)
                          addTodo.mutate({
                              id: 0,
                              title: ref.current.value,
                              completed: false,
                              userId: 1
                          })
                  }}>
                <div
                    className="col">
                    <input
                        ref={ref}
                        type="text"
                        className="form-control"/>
                </div>
                <div
                    className="col">
                    <button
                        disabled={addTodo.isLoading}
                        className="btn btn-primary">
                        {addTodo.isLoading ? 'Adding...' : 'Add'} {/*mutate har också isloading funktionalitet precis som query*/}
                    </button>
                </div>
            </form>
        </>
    );
};

export default TodoForm;
