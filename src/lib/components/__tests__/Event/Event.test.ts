import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Event from '../../Event/Event.svelte';
import type { Event as EventType } from '$lib/models/Event.js';
import * as EventUtils from '$lib/utils/EventUtils.js';

// Mock de la fonction utilitaire avec vi de Vitest
vi.mock('$lib/utils/EventUtils.js', () => ({
  displayTime: vi.fn((start, duration) => `MockedTime(${start.toISOString()}, ${duration})`)
}));

describe('Event', () => {
  let mockEvent: EventType;

  beforeEach(() => {
    mockEvent = {
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
    };
    vi.clearAllMocks();
  });

  it('devrait rendre l\'événement avec les styles et l\'attribut aria-label corrects', () => {
    const { getByRole } = render(Event, { props: mockEvent });
    const eventElement = getByRole('gridcell');

    expect(eventElement).toHaveAttribute('aria-label', `Événement de MockedTime(${mockEvent.start.toISOString()}, ${mockEvent.duration})`);

    expect(eventElement).toHaveStyle({
      top: `${mockEvent.top}px`,
      height: `${mockEvent.height}px`,
      left: `${mockEvent.left}px`,
      width: `${mockEvent.width}px`,
      backgroundColor: mockEvent.backgroundColor.color,
      boxShadow: `inset 0 0 0 2px ${mockEvent.backgroundColor.darkerColor}`
    });
  });

  it('devrait afficher le bon temps en utilisant la fonction displayTime', () => {
    const { getByText } = render(Event, { props: mockEvent });

    expect(EventUtils.displayTime).toHaveBeenCalledWith(mockEvent.start, mockEvent.duration);
    expect(getByText(`MockedTime(${mockEvent.start.toISOString()}, ${mockEvent.duration})`)).toBeInTheDocument();
  });

  it('devrait être accessible avec l\'attribut tabindex', () => {
    const { getByRole } = render(Event, { props: mockEvent });
    const eventElement = getByRole('gridcell');

    expect(eventElement).toHaveAttribute('tabindex', '0');
  });
});