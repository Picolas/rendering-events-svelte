import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import HourLabels from '../../HourLabels/HourLabels.svelte';
import { DAY_START_HOUR, DAY_END_HOUR } from '$lib/constants/const.js';

describe('HourLabels', () => {
  const mockProps = {
    containerHeight: 800,
    clientWidth: 50
  };

  it('devrait rendre les étiquettes des heures', () => {
    const { container } = render(HourLabels, { props: mockProps });
    const labels = container.querySelectorAll('li');
    const expectedLabels = (DAY_END_HOUR - DAY_START_HOUR) * 2;

    expect(labels).toHaveLength(expectedLabels);
  });

  it('devrait afficher les heures dans le bon format', () => {
    const { container } = render(HourLabels, { props: mockProps });
    const hourLabels = container.querySelectorAll('.hour-label');

    expect(hourLabels[0]).toHaveTextContent('9:00');
    expect(hourLabels[hourLabels.length - 1]).toHaveTextContent('20:00');
  });

  it('devrait avoir une hauteur totale proche du containerHeight', () => {
    const { container } = render(HourLabels, { props: mockProps });
    const labels = container.querySelectorAll('li');
    let totalHeight = 0;

    labels.forEach(label => {
      const styles = window.getComputedStyle(label);
      totalHeight += parseInt(styles.height);
    });

    const margin = 20; // marge d'erreur de 20px
    expect(totalHeight).toBeGreaterThanOrEqual(mockProps.containerHeight - margin);
    expect(totalHeight).toBeLessThanOrEqual(mockProps.containerHeight + margin);
  });

  it('devrait avoir des étiquettes positionnées correctement', () => {
    const { container } = render(HourLabels, { props: mockProps });
    const labels = container.querySelectorAll('li');
    const hourHeight = mockProps.containerHeight / ((DAY_END_HOUR - DAY_START_HOUR) * 2);

    labels.forEach((label) => {
      const height = parseInt(window.getComputedStyle(label).height);
      const expectedHeight = Math.floor(hourHeight);
      expect(height).toBeGreaterThanOrEqual(expectedHeight - 1);
      expect(height).toBeLessThanOrEqual(expectedHeight + 1);
    });
  });
});