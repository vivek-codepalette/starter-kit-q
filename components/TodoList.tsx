"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react";

export function TodoList() {
  const [input, setInput] = useState("");
  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleAddTodo = async () => {
    if (input.trim()) {
      await addTodo({ text: input });
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Todo List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Add a new todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleAddTodo} className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {todos === undefined ? (
            <div className="text-center py-8 text-gray-500">
              Loading todos...
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No todos yet. Add one to get started!
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <button
                  onClick={() => toggleTodo({ id: todo._id })}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo({ id: todo._id })}
                  className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {todos && todos.length > 0 && (
          <div className="pt-4 text-sm text-gray-500 border-t">
            {todos.filter((t) => !t.completed).length} of {todos.length} tasks
            remaining
          </div>
        )}
      </CardContent>
    </Card>
  );
}

