import { useDispatch, useSelector } from "react-redux";
import { setUnreadCounterAction } from "../redux/actions/chat";

export const useUnreadCounter = () => {
  const unreadCounter = useSelector((state) => state.chat.unreadCounter);
  const dispatch = useDispatch();

  const setUnreadCounter = (counter) => {
    dispatch(setUnreadCounterAction(counter));
  };

  return [unreadCounter, setUnreadCounter];
};
