import {useRef} from 'react';
import useAddTodo from "./hooks/useAddTodo";

const TodoForm = () => {
    const ref = useRef<HTMLInputElement>(null);
    const addTodo = useAddTodo(() => {
        if (ref.current) ref.current.value = '';
    })

    return (
        <>
            {addTodo.error &&
                <div className='alert alert-danger'>{addTodo.error.message}</div>} {/*mutate kan också hantera errors*/}
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
                        className="btn btn-primary">
                        Add
                    </button>
                </div>
            </form>
        </>
    );
};

export default TodoForm;


// // ### OM VI BARA ANVÄNDER ONSUCCESS #####
//             // 1 invalidating the cache, funkar dock inte med JSON placeholder.
//             //queryClient.invalidateQueries({
//             //  queryKey: ['todos']
//             //})
//
//             // 2 Updating the data in cache directly.
//             // queryClient.setQueryData<Todo[]>(['todos'], todos => [savedTodo, ...(todos || [])]);
//
//             //if (ref.current) ref.current.value = ''; // tar bort värde ur input efter success post.
//             // ### OM VI BARA ANVÄNDER ONSUCCESS #####