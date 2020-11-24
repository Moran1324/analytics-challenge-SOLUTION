import { useState, useEffect } from "react";
import axios from "axios";
import { EventFilter } from "../../../server/backend/database";

interface Props {
  filterObj: EventFilter;
}

const useEventsFiltered: React.Dispatch<Props> = ({ filterObj }) => {
  const [eventsLogDate, setEventsLogDate] = useState<Event[]>([]);

  const { sorting, type, browser, search, offset } = filterObj;

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3001/events/all-filtered-infinite",
      params: { sorting, type, browser, search, offset },
    }).then((res) => {
      console.log("data", res.data);
    });
  }, [filterObj]);

  return null;
};

export default useEventsFiltered;
