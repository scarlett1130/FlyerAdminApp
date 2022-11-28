import { useEffect, useState } from "react";
import store from "../redux/store";
import { getGroups } from "../redux/actions/groups";
import { useSelector } from "react-redux";

export function useGroups() {
  const [page, setPage] = useState(1);
  const items = useSelector((state) => state.groups.items);

  const fetch = async () => {
    store.dispatch(getGroups(page));
    setPage(page + 1);
  };

  useEffect(() => {
    fetch();
  }, []);

  return [items, fetch];
}
