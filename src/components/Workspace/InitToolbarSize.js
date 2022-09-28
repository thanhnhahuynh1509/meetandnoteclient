import { useDispatch } from "react-redux";
import { updateStartContent } from "../../store/screen-additional-space";

function InitToolbarSize(props) {
  const dispatch = useDispatch();
  console.log(props.toolbarRef);
  const toolbarPos = props.toolbarRef.current.getBoundingClientRect();
  const toolbarWidth = toolbarPos.width;
  dispatch(updateStartContent(toolbarWidth));
  console.log(toolbarWidth);
  return <></>;
}

export default InitToolbarSize;
