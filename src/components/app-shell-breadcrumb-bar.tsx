"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { BreadcrumbItem } from "@/model/breadcrumb";

type Props = {
  items: BreadcrumbItem[];
};

/**
 * Breadcrumb trail with optional per-crumb dropdown menus (Luckee `BreadcrumbBar`).
 */
export const AppShellBreadcrumbBar = ({ items }: Props) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const breadcrumbRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const pendingIndex = items.findIndex((item) => item.isPendingSelection);
    setOpenMenuIndex((current) => {
      if (pendingIndex !== -1) {
        return pendingIndex;
      }
      if (current !== null && items[current]?.isPendingSelection) {
        return null;
      }
      if (current !== null && current >= items.length) {
        return null;
      }
      return current;
    });
  }, [items]);

  useEffect(() => {
    if (openMenuIndex === null) {
      return undefined;
    }
    const handleClickOutside = (event: MouseEvent) => {
      const el = breadcrumbRefs.current[openMenuIndex];
      if (el && !el.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuIndex]);

  const handleMenuToggle = (index: number) => {
    setOpenMenuIndex((current) => (current === index ? null : index));
  };

  const handleMenuItemSelect = (onSelect: () => void) => {
    onSelect();
    setOpenMenuIndex(null);
  };

  return (
    <>
      {items.map((item, index) => {
        const isMenu = Boolean(item.menuItems && item.menuItems.length > 0);
        const isMenuOpen = openMenuIndex === index;
        const separator = index > 0;

        return (
          <li
            key={`${item.label}-${index}-${item.href ?? ""}`}
            className={styles.item}
            ref={(element) => {
              breadcrumbRefs.current[index] = element;
            }}
          >
            {separator ? (
              <span className={styles.sep} aria-hidden="true">
                /
              </span>
            ) : null}
            {isMenu ? (
              <div className={styles.dropdownWrap}>
                <button
                  type="button"
                  className={`${styles.menuBtn} ${
                    item.isPendingSelection ? styles.menuBtnPending : ""
                  }`}
                  onClick={() => handleMenuToggle(index)}
                  aria-expanded={isMenuOpen}
                >
                  <span>{item.label}</span>
                  <svg
                    className={`${styles.chevron} ${isMenuOpen ? styles.chevronOpen : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 8L10 12L14 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isMenuOpen && item.menuItems ? (
                  <div className={styles.menu} role="menu">
                    {item.menuItems.map((menuItem, menuIndex) => (
                      <button
                        key={`${menuItem.label}-${menuIndex}`}
                        type="button"
                        className={`${styles.menuItem} ${
                          menuItem.isActive ? styles.menuItemActive : ""
                        }`}
                        onClick={() => handleMenuItemSelect(menuItem.onSelect)}
                        role="menuitem"
                        disabled={menuItem.isDisabled}
                      >
                        {menuItem.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : item.onSelect ? (
              <button type="button" className={styles.action} onClick={item.onSelect}>
                {item.label}
              </button>
            ) : item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
          </li>
        );
      })}
    </>
  );
};

const styles = {
  item: `relative flex min-w-0 items-center gap-2 text-xs font-medium text-gray-600`,
  sep: `text-xs font-normal text-gray-400`,
  dropdownWrap: `relative flex items-center`,
  menuBtn: `
    flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-700
    transition-colors hover:bg-gray-100/80 hover:text-gray-900 focus:outline-none
  `,
  menuBtnPending: `text-gray-500 italic`,
  chevron: `h-3.5 w-3.5 text-gray-500 transition-transform duration-150 ease-linear`,
  chevronOpen: `rotate-180`,
  menu: `
    absolute left-0 top-full z-50 mt-1.5 min-w-[16rem] max-h-[min(20rem,70vh)] overflow-y-auto
    rounded-lg border border-gray-200 bg-white shadow-lg
  `,
  menuItem: `
    flex w-full items-center justify-between px-3 py-2 text-left text-xs text-gray-700
    transition-colors hover:bg-orange-50 hover:text-orange-700
  `,
  menuItemActive: `bg-orange-100 font-semibold text-orange-800`,
  action: `
    truncate cursor-pointer border-none bg-transparent p-0 text-left text-xs font-medium
    text-gray-600 transition-colors hover:text-gray-900 focus:outline-none
  `,
  link: `
    truncate text-gray-600 transition-colors hover:text-gray-900 focus:outline-none
  `,
  current: `truncate text-xs font-medium text-gray-900`,
};
