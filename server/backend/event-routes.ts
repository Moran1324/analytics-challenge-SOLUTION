///<reference path="types.ts" />

import express from "express";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// some useful database functions in here:
import { getAllEvents, getFilteredEvents, logEvent } from "./database";
import { Event, weeklyRetentionObject } from "../../client/src/models/event";
import { ensureAuthenticated, validateMiddleware } from "./helpers";

import {
  shortIdValidation,
  searchValidation,
  userFieldsValidator,
  isUserValidator,
} from "./validators";
const router = express.Router();

interface EventFilter {
  sorting: string;
  type: string;
  browser: string;
  search: string;
  offset: number;
}

interface JSONres {
  events: Event[];
  more: boolean;
}

// Routes

router.get("/all", (req: Request, res: Response) => {
  const events: Event[] = getAllEvents();
  res.json(events);
});

router.get("/all-filtered", (req: Request, res: Response) => {
  // res.send("/all-filtered");
  const filters: EventFilter = req.query;
  console.log(filters);

  const filteredEvents = getFilteredEvents(filters);
  const response: JSONres = {
    events: filteredEvents,
    more: false,
  };
  if (req.query.offset > 0) {
    if (filteredEvents.length > req.query.offset) {
      response.more = true;
    }
    response.events = filteredEvents.slice(0, +req.query.offset);
  }
  res.json(response);
});

router.get("/by-days/:offset", (req: Request, res: Response) => {
  res.send("/by-days/:offset");
});

router.get("/by-hours/:offset", (req: Request, res: Response) => {
  res.send("/by-hours/:offset");
});

router.get("/today", (req: Request, res: Response) => {
  res.send("/today");
});

router.get("/week", (req: Request, res: Response) => {
  res.send("/week");
});

router.get("/retention", (req: Request, res: Response) => {
  const { dayZero } = req.query;
  res.send("/retention");
});

router.get("/:eventId", (req: Request, res: Response) => {
  res.send("/:eventId");
});

router.post("/", (req: Request, res: Response) => {
  const newEvent: Event = {
    _id: uuidv4(),
    session_id: uuidv4(),
    name: req.body.name,
    url: req.body.url,
    distinct_user_id: req.body.distinct_user_id,
    date: req.body.date,
    os: req.body.os,
    browser: req.body.browser,
    geolocation: req.body.geolocation,
  };
  logEvent(newEvent);
  res.sendStatus(200);
});

router.get("/chart/os/:time", (req: Request, res: Response) => {
  res.send("/chart/os/:time");
});

router.get("/chart/pageview/:time", (req: Request, res: Response) => {
  res.send("/chart/pageview/:time");
});

router.get("/chart/timeonurl/:time", (req: Request, res: Response) => {
  res.send("/chart/timeonurl/:time");
});

router.get("/chart/geolocation/:time", (req: Request, res: Response) => {
  res.send("/chart/geolocation/:time");
});

export default router;
