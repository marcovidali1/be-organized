import { supabase } from "./supabase";

export async function getTodos() {
    const { data: todos, error } = await supabase.from("todos").select("*");
    if (error) throw new Error(error.message);
    return todos;
}

export async function setDoneTodo(id: number, done: boolean) {
    const { error } = await supabase
        .from("todos")
        .update({ done: done })
        .eq("id", id);
    if (error) throw new Error(error.message);
}

export async function deleteTodo(id: number) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw new Error(error.message);
}

export async function addTodo(todo: string) {
    const { error } = await supabase.from("todos").insert([{ content: todo }]);
    if (error) throw new Error(error.message);
}
