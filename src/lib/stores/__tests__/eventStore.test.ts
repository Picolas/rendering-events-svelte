import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { eventStore, eventActions } from '../eventStore.js';
import type { Event } from '$lib/models/Event.js';

describe('eventStore', () => {
  beforeEach(() => {
    eventStore.set([]);
  });

  describe('eventActions.init', () => {
    it('devrait initialiser le store avec les événements du JSON', () => {
      eventActions.init();
      const events = get(eventStore);

      expect(events.length).toBeGreaterThan(0);
      expect(events[0]).toHaveProperty('id');
      expect(events[0]).toHaveProperty('start');
      expect(events[0]).toHaveProperty('duration');
    });
  });

  describe('eventActions.sort', () => {
    it('devrait trier les événements par heure, minutes et durée', () => {
      const events: Event[] = [
        {
          id: 1,
          start: new Date(2024, 0, 1, 10, 0),
          duration: 60,
          top: 0,
          height: 0,
          width: 0,
          left: 0,
          backgroundColor: ''
        },
        {
          id: 2,
          start: new Date(2024, 0, 1, 9, 0),
          duration: 30,
          top: 0,
          height: 0,
          width: 0,
          left: 0,
          backgroundColor: ''
        },
        {
          id: 3,
          start: new Date(2024, 0, 1, 9, 0),
          duration: 60,
          top: 0,
          height: 0,
          width: 0,
          left: 0,
          backgroundColor: ''
        }
      ];

      eventStore.set(events);
      eventActions.sort();

      const sortedEvents = get(eventStore);
      expect(sortedEvents[0].id).toBe(3); // 9h00, 60min
      expect(sortedEvents[1].id).toBe(2); // 9h00, 30min
      expect(sortedEvents[2].id).toBe(1); // 10h00
    });
  });

  describe('eventActions.addEvent', () => {
    it('devrait ajouter un événement au store', () => {
      const newEvent: Event = {
        id: 1,
        start: new Date(2024, 0, 1, 9, 0),
        duration: 30,
        top: 0,
        height: 0,
        width: 0,
        left: 0,
        backgroundColor: ''
      };

      eventActions.addEvent(newEvent);
      const events = get(eventStore);

      expect(events).toHaveLength(1);
      expect(events[0]).toEqual(newEvent);
    });
  });

  describe('eventActions.removeEvent', () => {
    it('devrait supprimer un événement du store', () => {
      const event: Event = {
        id: 1,
        start: new Date(2024, 0, 1, 9, 0),
        duration: 30,
        top: 0,
        height: 0,
        width: 0,
        left: 0,
        backgroundColor: ''
      };

      eventStore.set([event]);
      eventActions.removeEvent(1);

      const events = get(eventStore);
      expect(events).toHaveLength(0);
    });
  });
});