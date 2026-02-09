import { useReducer } from "react";
import { Todo } from "../types/Todo";

type Action = // Tyyppien asetus
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: string };

function todosReducer(state: Todo[], action: Action): Todo[] { // Switch Casien teko, logiikkaa varten
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: Date.now().toString(),
                    text: action.payload,
                    done: false,
                },
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => 
                todo.id === action.payload
                ? { ...todo, done: !todo.done }
                : todo
            );
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.payload);

        default:
            return state;
    }
}

export function useTodos () { // useReducerin käyttö
    const [ todos, dispatch ] = useReducer(todosReducer, [])
    
    function addTodo (text: string) { // Lisäys funktio
        dispatch({ type: 'ADD_TODO', payload: text});
        console.log("Adding task")
    }

    function toggleTodo (id: string) { // Tehdyksi tekemättömäksi funktio
        dispatch({ type: 'TOGGLE_TODO', payload: id});
        console.log("Toggling task")
    }

    function removeTodo (id: string) { // Poisto funktio
        dispatch({ type: 'REMOVE_TODO', payload: id});
        console.log("Removing task")
    }

    return {
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
    };
}