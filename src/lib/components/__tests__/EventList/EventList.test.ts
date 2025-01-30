import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import EventList from '../../EventList/EventList.svelte';
import type { Event } from '$lib/models/Event.js';
import * as EventUtils from '$lib/utils/EventUtils.js';

vi.mock('$lib/utils/EventUtils.js', () => ({
  groupOverlappingEvents: vi.fn((events) => events),
  displayTime: vi.fn()
}));

describe('EventList', () => {
  const mockEvents: Event[] = [
    {
      id: 1,
      start: new Date('2025-01-30T10:00:00Z'),
      duration: 60,
      top: 100,
      height: 50,
      width: 200,
      left: 300,
      backgroundColor: {
        color: 'blue',
        darkerColor: 'darkblue'
      }
    },
    {
      id: 2,
      start: new Date('2025-01-30T11:00:00Z'),
      duration: 30,
      top: 200,
      height: 25,
      width: 200,
      left: 300,
      backgroundColor: {
        color: 'red',
        darkerColor: 'darkred'
      }
    }
  ];

  const mockProps = {
    events: mockEvents,
    containerWidth: 1000,
    containerHeight: 800,
    hourLabelsWidth: 50
  };

  it('devrait rendre tous les événements', () => {
    const { container } = render(EventList, { props: mockProps });
    const events = container.querySelectorAll('.event');
    expect(events).toHaveLength(2);
  });

  it('devrait appeler groupOverlappingEvents avec les bonnes propriétés', () => {
    render(EventList, { props: mockProps });
    expect(EventUtils.groupOverlappingEvents).toHaveBeenCalledWith(
      mockEvents,
      mockProps.containerWidth - mockProps.hourLabelsWidth,
      mockProps.containerHeight
    );
  });

  it('devrait mettre à jour les colonnes quand les props changent', async () => {
    const { rerender } = render(EventList, { props: mockProps });

    const newProps = {
      ...mockProps,
      containerWidth: 1200
    };

    await rerender(newProps);

    expect(EventUtils.groupOverlappingEvents).toHaveBeenCalledWith(
      mockEvents,
      newProps.containerWidth - mockProps.hourLabelsWidth,
      mockProps.containerHeight
    );
  });
});