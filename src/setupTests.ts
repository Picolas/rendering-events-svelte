import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';

const global = globalThis as any;

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

expect.extend({
  toHaveStyle(received, style) {
    const hasStyle = Object.entries(style).every(
      ([property, value]) => received.style[property] === value
    );
    return {
      pass: hasStyle,
      message: () => `expected ${received} to have style ${JSON.stringify(style)}`
    };
  }
});