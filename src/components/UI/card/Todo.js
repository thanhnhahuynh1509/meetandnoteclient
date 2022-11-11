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
  const currentRef = useRef();

  const init = async () => {
    setValue(props.content.attribute.todos);
    console.log(props.content);
  };

  useEffect(() => {
    init();
    const children = currentRef.current.getBoundingClientRect();
    props.setChildrenWidth(children.width);
    props.setChildrenHeight(children.height);
  }, [props.content]);

  const handleFocus = () => {
    props.setDisable(true);
    setIsFocus(true);
    dispatch(setCurrentComponent(props.content));
  };

  const handleBlur = () => {
    props.setDisable(false);
    setIsFocus(false);
    send(roomId, {
      ...props.content,
      attribute: { ...props.content.attribute, todos: [...value] },
    });
  };

  const handleKeyDown = async (e, id) => {
    const key = e.key;
    const todo = value.find((m) => m.id === id);
    if (key === "Backspace") {
      if (todo && value.length === 1 && !todo.content) {
        dispatch(removeComponent(props.content));
        deleteTodo(id);
        deleteComponent(props.content);
        send(roomId, { ...props.content, command: "DELETE" });
        dispatch(setCurrentComponent(null));
      } else if (todo && value.length > 1 && !todo.content) {
        const data = [...value.filter((m) => m.id !== id)];
        setValue(data);
        deleteTodo(id);
        send(roomId, {
          ...props.content,
          attribute: { ...props.content.attribute, todos: [...data] },
        });
      }
    } else if (key === "Enter") {
      const todo = {
        content: "",
        done: false,
      };

      const response = await saveTodo(props.content.attribute.id, todo);

      setValue([...value, response]);
      lastInputTodoRef.current.focus();

      send(roomId, {
        ...props.content,
        attribute: { ...props.content.attribute, todos: [...value, response] },
      });
    }
  };

  const handleOnChange = (e, id) => {
    const data = value.map((t) => {
      console.log(t);
      if (t.id === id) {
        const td = { ...t, content: e.target.value };
        updateTodo(td);
        return td;
      } else {
        return t;
      }
    });
    setValue(data);
  };

  const toogleCompleteTodo = (id) => {
    const data = value.map((t) => {
      if (t.id === id) {
        const td = { ...t, done: !t.done };
        updateTodo(td);
        return td;
      } else {
        return t;
      }
    });

    setValue(data);
    send(roomId, {
      ...props.content,
      attribute: { ...props.content.attribute, todos: [...data] },
    });
  };

  return (
    <>
      <div
        className={`contain-card ${isFocus && `card-text-focus`}`}
        onClick={(e) => e.stopPropagation()}
        ref={currentRef}
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
