import { useTodos } from "../features/todos/useTodos";

import TodoList from "../features/todos/TodoList";
import TodosTitle from "../features/todos/TodosTitle";
import FullPageCentered from "../ui/FullPageCentered";
import FullPageSpinner from "../ui/FullPageSpinner";

function Todos() {
    const { isLoading } = useTodos();

    if (isLoading) return <FullPageSpinner />;

    return (
        <FullPageCentered>
            <div className="flex flex-col gap-4">
                <TodosTitle />
                <TodoList />
            </div>
        </FullPageCentered>
    );
}

export default Todos;
