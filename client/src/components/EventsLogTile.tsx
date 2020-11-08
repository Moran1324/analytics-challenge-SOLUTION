import React from "react";
import { EventFilter } from "../../../server/backend/database";
import useEventsFiltered from "../myHooks/useEventsFiltered";

interface Props {
  filterObj: EventFilter;
}

const EventsLogTile: React.FC<Props> = ({ filterObj }) => {
  return (
    <div>
      <h1>Events Log</h1>
    </div>
  );
};

export default EventsLogTile;
