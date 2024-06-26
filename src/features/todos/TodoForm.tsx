import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAddTodo } from "./useAddTodo";
import { HiPencil } from "react-icons/hi2";
import { useEffect, useRef } from "react";

import CircularButton from "../../ui/CircularButton";

function TodoForm() {
    const { handleSubmit, register, reset } = useForm();
    const { addTodo, isPending } = useAddTodo();

    const todoRef = useRef<HTMLInputElement | null>();
    const { ref, ...rest } = register("todo");

    const onSubmit: SubmitHandler<FieldValues> = (formData) => {
        const { todo } = formData;
        addTodo(todo, {
            onSuccess: () => reset(),
        });
    };

    useEffect(() => {
        const handleKeyPress = () =>
            document.addEventListener("keypress", () =>
                todoRef.current?.focus(),
            );

        handleKeyPress();
        return document.removeEventListener("keypress", handleKeyPress);
    }, []);

    return (
        <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
            <input
                placeholder="What needs to be done?"
                className="input input-bordered grow"
                disabled={isPending}
                required
                ref={(e) => {
                    ref(e);
                    todoRef.current = e;
                }}
                {...rest}
            />

            <CircularButton color="secondary" isLoading={isPending}>
                <HiPencil />
            </CircularButton>
        </form>
    );
}

export default TodoForm;
