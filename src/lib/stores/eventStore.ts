import { writable } from 'svelte/store';
import type { Event } from '$lib/models/Event.js';
import eventsJson from '$lib/data/input.json' assert { type: 'json' };
import { createEvent } from '$lib/models/Event.js';

export const eventStore = writable<Event[]>([]);

export const eventActions = {
  init: () => {
    const events = eventsJson.map((event: any) =>
      createEvent(event.id, event.start, event.duration)
    );
    eventStore.set(events);
  },

  sort: () => {
    eventStore.update(events =>
      [...events].sort((a, b) => {
        if (a.start.getHours() === b.start.getHours()) {
          if (a.start.getMinutes() === b.start.getMinutes()) {
            return b.duration - a.duration;
          }
          return a.start.getMinutes() - b.start.getMinutes();
        }
        return a.start.getHours() - b.start.getHours();
      })
    );
  },

  addEvent: (event: Event) => {
    eventStore.update(events => [...events, event]);
  },

  removeEvent: (id: number) => {
    eventStore.update(events => events.filter(event => event.id !== id));
  }
};