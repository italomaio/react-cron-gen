import "@testing-library/jest-dom/vitest";

beforeEach(() => {
  vi.clearAllMocks();
});

if (typeof Element.prototype.hasPointerCapture === "undefined") {
  Element.prototype.hasPointerCapture = vi.fn();
}

if (typeof Element.prototype.releasePointerCapture === "undefined") {
  Element.prototype.releasePointerCapture = vi.fn();
}

if (typeof Element.prototype.scrollIntoView === "undefined") {
  Element.prototype.scrollIntoView = vi.fn();
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

if (typeof window.DataTransfer === "undefined") {
  Object.defineProperty(window, "DataTransfer", {
    value: function () {
      this.data = {};
      this.dropEffect = "none";
      this.effectAllowed = "uninitialized";
      this.files = [];
      this.items = [];
      this.types = [];

      this.setData = vi.fn((format, data) => {
        this.data[format] = data;
      });
      this.getData = vi.fn((format) => this.data[format]);
      this.clearData = vi.fn(() => {
        this.data = {};
      });
      this.setDragImage = vi.fn();
      this.addElement = vi.fn();
    },
  });
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
