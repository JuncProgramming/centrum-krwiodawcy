import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { useRef } from 'react';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';
import {
  MIN_COLUMN_BELOW_STATUS,
  MIN_INLINE_MAP_HEIGHT,
  MAX_INLINE_MAP_HEIGHT
} from '@/constants';
import type { Donation } from '@/types';

const FLOOR = 200 + MIN_COLUMN_BELOW_STATUS;

type Sizes = {
  sidebar: number;
  galleryVisible: number;
  galleryFull: number;
  status: number;
  history: number;
  listClient: number;
  listScroll: number;
};

const donations: Donation[] = [];

let resizeCallbacks: ResizeObserverCallback[] = [];
let isDesktop = true;

const setViewport = (desktop: boolean) => {
  isDesktop = desktop;
};

const triggerResize = () => {
  act(() => {
    resizeCallbacks.forEach((cb) => cb([], {} as unknown as ResizeObserver));
  });
};

const applyHeight = (
  element: HTMLElement,
  offsetHeight: number,
  scrollHeight?: number
) => {
  Object.defineProperty(element, 'offsetHeight', {
    value: offsetHeight,
    configurable: true
  });
  if (scrollHeight !== undefined) {
    Object.defineProperty(element, 'scrollHeight', {
      value: scrollHeight,
      configurable: true
    });
  }
};

const LoadingHarness = ({ isLoading }: { isLoading: boolean }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { columnMinHeight, mapHeight } = useDashboardLayout({
    sidebarRef,
    galleryRef,
    statusRef,
    historyRef,
    listRef,
    donations,
    isReady: !isLoading
  });

  if (isLoading) return <span data-testid='result'>loading</span>;

  return (
    <div>
      <div ref={sidebarRef} data-testid='sidebar'>
        <div ref={galleryRef} data-testid='gallery'>
          <div data-testid='gallery-content' />
        </div>
      </div>
      <div data-testid='column'>
        <div ref={statusRef} data-testid='status' />
        <div ref={historyRef} data-testid='history' />
        <ul ref={listRef} data-testid='list' />
      </div>
      <span data-testid='result'>
        {String(columnMinHeight)}/{String(mapHeight)}
      </span>
    </div>
  );
};

const Harness = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { columnMinHeight, mapHeight } = useDashboardLayout({
    sidebarRef,
    galleryRef,
    statusRef,
    historyRef,
    listRef,
    donations,
    isReady: true
  });

  return (
    <div>
      <div ref={sidebarRef} data-testid='sidebar'>
        <div ref={galleryRef} data-testid='gallery'>
          <div data-testid='gallery-content' />
        </div>
      </div>
      <div data-testid='column'>
        <div ref={statusRef} data-testid='status' />
        <div ref={historyRef} data-testid='history' />
        <ul ref={listRef} data-testid='list' />
      </div>
      <span data-testid='result'>
        {String(columnMinHeight)}/{String(mapHeight)}
      </span>
    </div>
  );
};

const EmptyStateHarness = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { columnMinHeight, mapHeight } = useDashboardLayout({
    sidebarRef,
    galleryRef,
    statusRef,
    historyRef,
    listRef,
    donations,
    isReady: true
  });

  return (
    <div>
      <div ref={sidebarRef} data-testid='sidebar'>
        <div ref={galleryRef} data-testid='gallery'>
          <div data-testid='gallery-content' />
        </div>
      </div>
      <div data-testid='column'>
        <div ref={statusRef} data-testid='status' />
        <div ref={historyRef} data-testid='history'>
          <div data-testid='history-card' />
        </div>
      </div>
      <span data-testid='result'>
        {String(columnMinHeight)}/{String(mapHeight)}
      </span>
    </div>
  );
};

const renderWithSizes = (sizes: Sizes) => {
  const utils = render(<Harness />);
  const stamp = (next: Sizes) => {
    applyHeight(utils.getByTestId('sidebar'), next.sidebar);
    applyHeight(utils.getByTestId('gallery'), next.galleryVisible);
    applyHeight(
      utils.getByTestId('gallery-content'),
      next.galleryFull,
      next.galleryFull
    );
    applyHeight(utils.getByTestId('status'), next.status);
    applyHeight(utils.getByTestId('history'), next.history);
    const list = utils.getByTestId('list');
    Object.defineProperty(list, 'clientHeight', {
      value: next.listClient,
      configurable: true
    });
    Object.defineProperty(list, 'scrollHeight', {
      value: next.listScroll,
      configurable: true
    });
  };
  stamp(sizes);
  triggerResize();
  return { ...utils, stamp };
};

describe('useDashboardLayout', () => {
  beforeEach(() => {
    resizeCallbacks = [];
    isDesktop = true;

    vi.stubGlobal(
      'ResizeObserver',
      class {
        cb: ResizeObserverCallback;
        constructor(cb: ResizeObserverCallback) {
          this.cb = cb;
          resizeCallbacks.push(cb);
        }
        observe() {
          this.cb([], this as unknown as ResizeObserver);
        }
        disconnect() {}
        unobserve() {}
      }
    );

    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: isDesktop,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {}
    }));

    const original = window.getComputedStyle;
    vi.spyOn(window, 'getComputedStyle').mockImplementation((el) => {
      const style = original(el as Element);
      return { ...style, rowGap: '24px' } as CSSStyleDeclaration;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('stretches the map slightly past its cap to fill the column', () => {
    const { getByTestId } = renderWithSizes({
      sidebar: 1102,
      galleryVisible: 0,
      galleryFull: 318,
      status: 200,
      history: 300,
      listClient: 160,
      listScroll: 160
    });

    expect(getByTestId('result')).toHaveTextContent(`${FLOOR}/740`);
  });

  it('ends flush with a sidebar that stops just short of the floor', () => {
    const { getByTestId } = renderWithSizes({
      sidebar: 1260,
      galleryVisible: 0,
      galleryFull: 318,
      status: 200,
      history: 568,
      listClient: 422,
      listScroll: 948
    });

    expect(getByTestId('result')).toHaveTextContent('1260/452');
  });

  it('keeps 3.5 history rows when three stat types shorten the column', () => {
    const { getByTestId } = renderWithSizes({
      sidebar: 1228,
      galleryVisible: 0,
      galleryFull: 318,
      status: 200,
      history: 500,
      listClient: 354,
      listScroll: 948
    });

    expect(getByTestId('result')).toHaveTextContent('1228/420');
  });

  it('holds the floor when the sidebar is far below it', () => {
    const { getByTestId } = renderWithSizes({
      sidebar: 1200,
      galleryVisible: 0,
      galleryFull: 318,
      status: 200,
      history: 568,
      listClient: 422,
      listScroll: 948
    });

    expect(getByTestId('result')).toHaveTextContent(
      `${FLOOR}/${MIN_INLINE_MAP_HEIGHT}`
    );
  });

  it('holds the map at its floor when the history fills the column', () => {
    const { getByTestId } = renderWithSizes({
      sidebar: 1102,
      galleryVisible: 0,
      galleryFull: 318,
      status: 200,
      history: 568,
      listClient: 422,
      listScroll: 948
    });

    expect(getByTestId('result')).toHaveTextContent(
      `${FLOOR}/${MIN_INLINE_MAP_HEIGHT}`
    );
  });

  it('raises the floor with a taller status card to keep 3.5 rows', () => {
    const { getByTestId } = renderWithSizes({
      sidebar: 1102,
      galleryVisible: 0,
      galleryFull: 318,
      status: 260,
      history: 568,
      listClient: 422,
      listScroll: 948
    });

    expect(getByTestId('result')).toHaveTextContent(
      `1348/${MIN_INLINE_MAP_HEIGHT}`
    );
  });

  it('hands extra sidebar height to the map once the history is capped', () => {
    const { getByTestId } = renderWithSizes({
      sidebar: 1600,
      galleryVisible: 318,
      galleryFull: 318,
      status: 200,
      history: 568,
      listClient: 422,
      listScroll: 948
    });

    expect(getByTestId('result')).toHaveTextContent('1600/672');
  });

  it('caps the map and lets the column end early when the sidebar is very tall', () => {
    const { getByTestId } = renderWithSizes({
      sidebar: 1750,
      galleryVisible: 318,
      galleryFull: 318,
      status: 200,
      history: 568,
      listClient: 422,
      listScroll: 948
    });

    expect(getByTestId('result')).toHaveTextContent(
      `1750/${MAX_INLINE_MAP_HEIGHT}`
    );
  });

  it('aims both targets at the end state from the first growth frame', () => {
    const sizes: Sizes = {
      sidebar: 1102,
      galleryVisible: 0,
      galleryFull: 318,
      status: 200,
      history: 568,
      listClient: 422,
      listScroll: 948
    };
    const { getByTestId, stamp } = renderWithSizes(sizes);
    expect(getByTestId('result')).toHaveTextContent(
      `${FLOOR}/${MIN_INLINE_MAP_HEIGHT}`
    );

    stamp({ ...sizes, sidebar: 1134, galleryVisible: 32 });
    triggerResize();
    expect(getByTestId('result')).toHaveTextContent('1420/492');

    stamp({ ...sizes, sidebar: 1134, galleryVisible: 32 });
    triggerResize();
    expect(getByTestId('result')).toHaveTextContent('1420/492');
  });

  it('ignores pixel-level wobble in the measurements', () => {
    const sizes: Sizes = {
      sidebar: 1600,
      galleryVisible: 318,
      galleryFull: 318,
      status: 200,
      history: 568,
      listClient: 422,
      listScroll: 948
    };
    const { getByTestId, stamp } = renderWithSizes(sizes);
    expect(getByTestId('result')).toHaveTextContent('1600/672');

    stamp({ ...sizes, sidebar: 1601 });
    triggerResize();
    expect(getByTestId('result')).toHaveTextContent('1600/672');
  });

  it('returns null for both below the desktop breakpoint', () => {
    setViewport(false);

    const { getByTestId } = renderWithSizes({
      sidebar: 2000,
      galleryVisible: 0,
      galleryFull: 318,
      status: 200,
      history: 300,
      listClient: 160,
      listScroll: 160
    });

    expect(getByTestId('result')).toHaveTextContent('null/null');
  });

  it('recovers the natural height of a squeezed empty-state card', () => {
    const { getByTestId } = render(<EmptyStateHarness />);
    applyHeight(getByTestId('sidebar'), 980);
    applyHeight(getByTestId('gallery'), 0);
    applyHeight(getByTestId('gallery-content'), 318, 318);
    applyHeight(getByTestId('status'), 200);
    applyHeight(getByTestId('history'), 320);
    const card = getByTestId('history-card');
    Object.defineProperty(card, 'clientHeight', {
      value: 320,
      configurable: true
    });
    Object.defineProperty(card, 'scrollHeight', {
      value: 354,
      configurable: true
    });
    triggerResize();

    expect(getByTestId('result')).toHaveTextContent('1288/686');
  });

  it('still measures when the cards mount after a loading spinner', () => {
    const { getByTestId, rerender } = render(<LoadingHarness isLoading />);
    expect(getByTestId('result')).toHaveTextContent('loading');

    rerender(<LoadingHarness isLoading={false} />);
    applyHeight(getByTestId('sidebar'), 1600);
    applyHeight(getByTestId('gallery'), 318);
    applyHeight(getByTestId('gallery-content'), 318, 318);
    applyHeight(getByTestId('status'), 200);
    applyHeight(getByTestId('history'), 568);
    const list = getByTestId('list');
    Object.defineProperty(list, 'clientHeight', {
      value: 422,
      configurable: true
    });
    Object.defineProperty(list, 'scrollHeight', {
      value: 948,
      configurable: true
    });
    triggerResize();

    expect(getByTestId('result')).toHaveTextContent('1600/672');
  });
});
