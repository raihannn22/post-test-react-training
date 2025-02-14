import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import {
  format,
  isBefore,
  isToday,
  isTomorrow,
  differenceInDays,
} from "date-fns";
import toDoStore from "../store/toDoStore";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

const Dashboard = () => {
  const { todos } = toDoStore();

  const [categorizedTodos, setCategorizedTodos] = useState({
    overdue: [],
    today: [],
    tomorrow: [],
    next: [],
  });

  useEffect(() => {
    const today = new Date();
    const categorized = {
      overdue: [],
      today: [],
      tomorrow: [],
      next: [],
    };

    todos.forEach((todo) => {
      const taskDate = new Date(todo.date);

      if (isBefore(taskDate, today) && !isToday(taskDate)) {
        categorized.overdue.push(todo);
      } else if (isToday(taskDate)) {
        categorized.today.push(todo);
      } else if (isTomorrow(taskDate)) {
        categorized.tomorrow.push(todo);
      } else if (differenceInDays(taskDate, today) > 1) {
        categorized.next.push(todo);
      }
    });

    setCategorizedTodos(categorized);
  }, [todos]);

  // Komponen untuk menampilkan kategori tugas
  const renderTaskCard = (title, tasks, bgColor) => (
    <div className="col-12 md:col-3">
      <Card title={title} className={`shadow-3 p-3 ${bgColor} text-white`}>
        {tasks.length > 0 ? (
          <ul className="m-0 p-0 list-none">
            {tasks.map((todo, idx) => (
              <li key={idx} className="border-b pb-2 mb-2">
                <strong>
                  {todo.description} <span>- {todo.category}</span>
                </strong>
                <br />
                <small>{format(new Date(todo.date), "dd MMM yyyy")}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">Tidak ada tugas.</p>
        )}
      </Card>
    </div>
  );

  return (
    <div className="p-5">
      <h2 className="text-center font-bold mb-5">To-Do  </h2>
      <div className="grid">
        {renderTaskCard("Overdue", categorizedTodos.overdue, "bg-red-500")}
        {renderTaskCard("Today", categorizedTodos.today, "bg-blue-500")}
        {renderTaskCard("Tomorrow", categorizedTodos.tomorrow, "bg-yellow-500")}
        {renderTaskCard("Next", categorizedTodos.next, "bg-green-500")}
      </div>
    </div>
  );
};

export default Dashboard;
