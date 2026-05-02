"use client";

import { useEffect, useMemo, type DependencyList } from "react";
import { useAppDispatch } from "@/store";
import { BreadcrumbBuilderActions } from "@/store/builders/breadcrumbBuilder";
import type { BreadcrumbItem } from "@/model/breadcrumb";

/**
 * Publishes a breadcrumb trail for the app shell while this screen is mounted.
 * Uses a passive effect so it runs after {@link AppShellBreadcrumbHeader}'s pathname reset
 * (same ordering idea as luckee-web static dashboard breadcrumbs).
 */
export const useRegisterBreadcrumbTrail = (factory: () => BreadcrumbItem[], deps: DependencyList) => {
  const dispatch = useAppDispatch();
  const trail = useMemo(factory, deps);
  useEffect(() => {
    dispatch(BreadcrumbBuilderActions.setItems(trail));
  }, [dispatch, trail]);
};
