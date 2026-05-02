"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { toast } from "sonner";
import { COMPANY_DETAIL_PAGE_PATH } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import { CompaniesListBuilderActions } from "@/store/builders/companiesListBuilder";
import { createCompanyThunk } from "@/store/thunks";
import { CreateCompanyModal } from "../create-modal";

export const CompaniesListFilters = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchFilter = useAppSelector((s) => s.companiesListBuilder.searchFilter);
  const [localSearch, setLocalSearch] = useState(searchFilter);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      dispatch(CompaniesListBuilderActions.setSearchFilter(localSearch));
    }, 300);
    return () => window.clearTimeout(timer);
  }, [localSearch, dispatch]);

  useEffect(() => {
    setLocalSearch(searchFilter);
  }, [searchFilter]);

  const handleClearFilters = useCallback(() => {
    setLocalSearch("");
    dispatch(CompaniesListBuilderActions.clearFilters());
  }, [dispatch]);

  const handleCreateSubmit = useCallback(
    async (name: string, website: string) => {
      setShowCreateModal(false);
      const status = await dispatch(createCompanyThunk({ name, website, notes: "" }));
      if (status === 200) {
        toast.success("Company created");
        router.push(COMPANY_DETAIL_PAGE_PATH);
      } else {
        toast.error("Could not create company");
      }
    },
    [dispatch, router],
  );

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
              placeholder="Search by name or website…"
              className={styles.searchInput}
              aria-label="Search companies"
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
        <button type="button" className={styles.addButton} onClick={() => setShowCreateModal(true)}>
          New company
        </button>
      </div>
      {showCreateModal ? (
        <CreateCompanyModal
          onSubmit={(name, website) => void handleCreateSubmit(name, website)}
          onClose={() => setShowCreateModal(false)}
        />
      ) : null}
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
