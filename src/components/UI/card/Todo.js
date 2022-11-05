import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeComponent } from "../../../store/component-slice";
import { v4 } from "uuid";
import "./css/Todo.css";
import {
  getTodoByAttributeId,
  saveTodo,
  updateTodo,
  deleteTodo,
} from "../../../api/todo-api";
import { useParams } from "react-router-dom";
import { send } from "../../../utils/sockjs/client-sockjs";
import { deleteComponent } from "../../../api/component-api";
import { getAttributeByComponentID } from "../../../api/attribute-api";
import { setCurrentComponent } from "../../../store/component-slice";

function Todo(props) {
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState([]);
  const lastInputTodoRef = useRef(null);
  const { roomId } = useParams();

  const init = async () => {
    const response = await getTodoByAttributeId(props.content.attribute.id);
    setValue(response);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [props.content]);

  const handleFocus = () => {
    props.setDisable(true);
    setIsFocus(true);
    dispatch(setCurrentComponent(props.content));
  };

  const handleBlur = () => {
    props.setDisable(false);
    setIsFocus(false);
  };

  const handleKeyDown = async (e, id) => {
    const key = e.key;
    const todo = value.find((m) => m.id === id);
    if (key === "Backspace") {
      if (todo && value.length === 1 && !todo.content) {
        dispatch(removeComponent(props.content));
        deleteTodo(id);
        deleteComponent(props.content);
        send(roomId, props.content);
      } else if (todo && value.length > 1 && !todo.content) {
        setValue([...value.filter((m) => m.id !== id)]);
        deleteTodo(id);
      }
    } else if (key === "Enter") {
      const todo = {
        content: "",
        done: false,
      };

      setValue([...value, await saveTodo(props.content.attribute.id, todo)]);
      lastInputTodoRef.current.focus();

      send(roomId, props.content);
    }
  };

  const handleOnChange = (e, id) => {
    const data = value.map((t) => {
      if (t.id === id) {
        const td = { ...t, content: e.target.value };
        updateTodo(td);
        return td;
      }
      return t;
    });
    setValue(data);
  };

  const toogleCompleteTodo = (id) => {
    const data = value.map((t) => {
      if (t.id === id) {
        const td = { ...t, done: !t.done };
        updateTodo(td);
        return td;
      }
      return t;
    });

    setValue(data);
  };

  return (
    <>
      <div
        className={`contain-card ${isFocus && `card-text-focus`}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="Todo-container">
          {value.map((m) => {
            return (
              <div className="Todo" key={m.id}>
                <input
                  type="checkbox"
                  checked={m.done}
                  onChange={() => toogleCompleteTodo(m.id)}
                />
                <input
                  className={`card-text ${m.done && "done"}`}
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
