import { useState } from "react";
import { useSelector } from "react-redux";
import { getConversations } from "../redux/actions/chat";
import store from "../redux/store";

export function useChatItems() {
  const [page, setPage] = useState(1);
  const items = useSelector((state) => state.conversations.items);

  const fetch = async (resetPage = false) => {
    if (resetPage) {
      store.dispatch(getConversations(1));
      setPage(2);
    } else {
      store.dispatch(getConversations(page));
      setPage(page + 1);
    }
  };

  return [items, fetch];
}
