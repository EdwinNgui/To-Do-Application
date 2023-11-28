// Creates the addToDo action
export const AddToDoAction = (todo) => (dispatch, getState) =>{
    const {
            ToDo: { todos },
        } = getState();

        // Checks through our todo to see if it is inside it
        const hasTodo = todos.find(i=>i.todo===todo);

        if (!hasTodo && todo !== ''){
            dispatch({
                type: "ADD_TODO",
                payload: [{id: todo, todo}, ...todos]
            })
        }

};

// Creates the remove to do action
export const RemoveToDoAction = (todo) => (dispatch, getState) =>{
    const {
            ToDo: { todos },
        } = getState();

        dispatch({
            type: "REMOVE_TODO",
            payload: todos.filter((t) => t.id !== todo.id),
        });

};