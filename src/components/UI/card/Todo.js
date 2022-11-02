import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeComponent } from "../../../store/component-slice";
import { v4 } from "uuid";
import "./css/Todo.css";

function Todo(props) {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState([
    { id: v4(), content: "", isCompleted: false },
  ]);
  const lastInputTodoRef = useRef(null);

  const handleFocus = () => {
    props.setDisable(true);
    setIsFocus(true);
  };

  const handleBlur = () => {
    props.setDisable(false);
    setIsFocus(false);
  };

  const handleKeyDown = (e, id) => {
    const key = e.key;
    const todo = value.find((m) => m.id === id);
    if (key === "Backspace") {
      if (todo && value.length === 1 && !todo.content) {
        dispatch(removeComponent(props.content));
      } else if (todo && value.length > 1 && !todo.content) {
        setValue([...value.filter((m) => m.id !== id)]);
      }
    } else if (key === "Enter") {
      setValue([...value, { id: v4(), content: "", isCompleted: false }]);
      lastInputTodoRef.current.focus();
    }
  };

  const handleOnChange = (e, id) => {
    const data = value.map((m) => {
      if (m.id === id) {
        return { ...m, content: e.target.value };
      }
      return m;
    });
    setValue(data);
  };

  const toogleCompleteTodo = (id) => {
    const data = value.map((m) => {
      if (m.id === id) {
        return { ...m, isCompleted: !m.isCompleted };
      }
      return m;
    });
    setValue(data);
  };

  return (
    <>
      <div className={`contain-card ${isFocus && `card-text-focus`}`}>
        <div className="Todo-container">
          {value.map((m) => {
            return (
              <div className="Todo" key={m.id}>
                <input
                  type="checkbox"
                  checked={m.isCompleted}
                  onChange={() => toogleCompleteTodo(m.id)}
                />
                <input
                  className={`card-text ${m.isCompleted && "done"}`}
                  type="text"
                  placeholder="Add task..."
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleKeyDown(e, m.id)}
                  value={m.content}
                  onChange={(e) => handleOnChange(e, m.id)}
                  ref={lastInputTodoRef}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Todo;
