"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, X } from "lucide-react";

type Props = {
  searchFilter: string;
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
};

export const JobNewsletterSourcesToolbar = ({
  searchFilter,
  onSearchChange,
  onCreateClick,
}: Props) => {
  const [localSearch, setLocalSearch] = useState(searchFilter);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  useEffect(() => {
    setLocalSearch(searchFilter);
  }, [searchFilter]);

  const handleClearFilters = useCallback(() => {
    setLocalSearch("");
    onSearchChange("");
  }, [onSearchChange]);

  const hasActiveFilters = !!searchFilter.trim();

  return (
    <div className={styles.container}>
      <div className={styles.toolbarRow}>
        <div className={styles.searchAndFilters}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} aria-hidden />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by name or sender…"
              className={styles.searchInput}
              aria-label="Search newsletter sources"
            />
            {localSearch ? (
              <button
                type="button"
                onClick={() => setLocalSearch("")}
                className={styles.clearSearchButton}
                aria-label="Clear search"
              >
                <X className={styles.clearIcon} aria-hidden />
              </button>
            ) : null}
          </div>
          {hasActiveFilters ? (
            <button type="button" onClick={handleClearFilters} className={styles.clearButton}>
              Clear
            </button>
          ) : null}
        </div>
        <button type="button" className={styles.addButton} onClick={onCreateClick}>
          New source
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: `mb-3`,
  toolbarRow: `flex flex-wrap items-center justify-between gap-2`,
  searchAndFilters: `
    flex flex-1 min-w-0 max-w-xl flex-wrap items-stretch gap-1.5
  `,
  searchBar: `
    relative flex min-w-[10rem] flex-1 items-center rounded-md border border-gray-300
    bg-white px-1.5 py-1.5 shadow-sm
  `,
  searchIcon: `mr-0.5 h-3.5 w-3.5 shrink-0 text-gray-400`,
  searchInput: `min-w-0 flex-1 border-none bg-transparent text-xs text-gray-900 outline-none`,
  clearSearchButton: `
    flex shrink-0 cursor-pointer items-center justify-center border-none bg-transparent p-0
    text-gray-400 hover:text-gray-600
  `,
  clearIcon: `h-3.5 w-3.5`,
  clearButton: `
    h-[34px] shrink-0 rounded-md border border-gray-200 bg-white px-2 text-xs font-medium text-gray-600
    hover:border-gray-300 hover:text-gray-900
  `,
  addButton: `
    shrink-0 rounded-md border border-[#FF7C1E] bg-[#FF7C1E] px-2 py-1 text-xs font-medium text-white
    hover:bg-[#e66b10]
  `,
};
