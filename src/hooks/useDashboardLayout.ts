import { useState, useEffect, useCallback, useRef } from 'react';
import type { useDashboardLayoutArgs } from '@/types';
import {
  MIN_COLUMN_BELOW_STATUS,
  MAX_HISTORY_HEIGHT,
  MIN_INLINE_MAP_HEIGHT,
  MAX_INLINE_MAP_HEIGHT,
  COLUMN_ALIGN_TOLERANCE
} from '@/constants';

const DESKTOP_QUERY = '(min-width: 64rem)';

export const useDashboardLayout = ({
  sidebarRef,
  galleryRef,
  statusRef,
  historyRef,
  listRef,
  donations,
  isReady
}: useDashboardLayoutArgs) => {
  const [columnMinHeight, setColumnMinHeight] = useState<number | null>(null);
  const [mapHeight, setMapHeight] = useState<number | null>(null);
  const previousGalleryHeight = useRef<number | null>(null);
  const lastColumnTarget = useRef<number | null>(null);
  const lastMapTarget = useRef<number | null>(null);

  const measure = useCallback(() => {
    const sidebar = sidebarRef.current;
    const status = statusRef.current;
    const history = historyRef.current;
    if (!sidebar || !status || !history) return;

    if (!window.matchMedia(DESKTOP_QUERY).matches) {
      previousGalleryHeight.current = null;
      lastColumnTarget.current = null;
      lastMapTarget.current = null;
      setColumnMinHeight(null);
      setMapHeight(null);
      return;
    }

    const gallery = galleryRef.current;
    const galleryVisible = gallery?.offsetHeight ?? 0;
    const galleryFull =
      (gallery?.firstElementChild as HTMLElement | null)?.scrollHeight ?? 0;

    const previous = previousGalleryHeight.current;
    previousGalleryHeight.current = galleryVisible;

    const settled = galleryVisible === 0 || galleryVisible === galleryFull;

    let target;
    if (settled || previous === null) {
      target = sidebar.offsetHeight;
    } else if (galleryVisible === previous) {
      return;
    } else {
      const base = sidebar.offsetHeight - galleryVisible;
      target = galleryVisible > previous ? base + galleryFull : base;
    }

    const columnFloor = status.offsetHeight + MIN_COLUMN_BELOW_STATUS;

    const columnNext =
      target >= columnFloor || columnFloor - target <= COLUMN_ALIGN_TOLERANCE
        ? target
        : columnFloor;
    const alignDeficit = Math.max(0, columnFloor - columnNext);

    const column = history.parentElement;
    const gap = column ? parseFloat(getComputedStyle(column).rowGap) || 0 : 0;

    const list = listRef.current;
    const card = history.firstElementChild as HTMLElement | null;
    const clipped = list
      ? list.scrollHeight - list.clientHeight
      : card
        ? Math.max(0, card.scrollHeight - card.clientHeight)
        : 0;
    const historyNatural = Math.min(
      history.offsetHeight + clipped,
      MAX_HISTORY_HEIGHT
    );

    const mapRaw = columnNext - status.offsetHeight - historyNatural - 2 * gap;
    const mapNext =
      mapRaw > MAX_INLINE_MAP_HEIGHT &&
      mapRaw - MAX_INLINE_MAP_HEIGHT > COLUMN_ALIGN_TOLERANCE
        ? MAX_INLINE_MAP_HEIGHT
        : Math.max(MIN_INLINE_MAP_HEIGHT - alignDeficit, mapRaw);

    const columnMoved =
      lastColumnTarget.current === null ||
      Math.abs(columnNext - lastColumnTarget.current) > 2;
    const mapMoved =
      lastMapTarget.current === null ||
      Math.abs(mapNext - lastMapTarget.current) > 2;
    if (!columnMoved && !mapMoved) return;

    lastColumnTarget.current = columnNext;
    lastMapTarget.current = mapNext;

    setColumnMinHeight(columnNext);
    setMapHeight(mapNext);
  }, [sidebarRef, galleryRef, statusRef, historyRef, listRef]);

  useEffect(() => {
    if (!isReady) return;

    const observer = new ResizeObserver(measure);
    const observed = [
      sidebarRef.current,
      galleryRef.current,
      statusRef.current,
      historyRef.current,
      listRef.current
    ];
    observed.forEach((element) => element && observer.observe(element));

    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    mediaQuery.addEventListener('change', measure);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', measure);
    };
  }, [
    measure,
    isReady,
    donations,
    sidebarRef,
    galleryRef,
    statusRef,
    historyRef,
    listRef
  ]);

  return { columnMinHeight, mapHeight };
};
