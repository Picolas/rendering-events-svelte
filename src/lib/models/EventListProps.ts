import type { Event } from "./Event.js";

export interface EventsListProps {
  events: Event[];
  containerWidth: number;
  containerHeight: number;
  hourLabelsWidth: number;
}