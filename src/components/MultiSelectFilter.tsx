import { type Dispatch, type ReactElement, type ReactNode, type SetStateAction, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

export type FilterOption = {
  value: string;
  label: string;
  count: number;
  icon?: ReactNode;
}

type MultiSelectFilterProps = {
  /** what the options are, e.g. "Category" or "Platform" */
  title: string;
  options: FilterOption[];
  selected: string[];
  onSelectedChange: Dispatch<SetStateAction<string[]>>;
  query: string;
  onQueryChange: (query: string) => void;
  searchPlaceholder: string;
  shownCount: number;
  totalCount: number;
}

/** above this many options, the dropdown gets its own search box */
const OPTION_SEARCH_THRESHOLD = 8;

function MultiSelectFilter(
  {
    title,
    options,
    selected,
    onSelectedChange,
    query,
    onQueryChange,
    searchPlaceholder,
    shownCount,
    totalCount,
  }: MultiSelectFilterProps
): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [optionQuery, setOptionQuery] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelId: string = useId();

  // close on outside click / Escape
  useEffect(() => {
    if (!isOpen) return;

    function handlePointer(event: MouseEvent): void {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
    }

    function handleKey(event: KeyboardEvent): void {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const visibleOptions: FilterOption[] = useMemo(() => {
    const q: string = optionQuery.trim().toLowerCase();
    return q ? options.filter(option => option.label.toLowerCase().includes(q)) : options;
  }, [options, optionQuery]);

  const optionByValue = useMemo(
    () => new Map(options.map(option => [option.value, option])),
    [options]
  );

  function toggle(value: string): void {
    onSelectedChange(current => current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value]);
  }

  function clearAll(): void {
    onSelectedChange([]);
    onQueryChange("");
  }

  const hasActiveFilters: boolean = selected.length > 0 || query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative z-20 w-full max-w-4xl glass p-3 md:p-4 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-2.5">
        {/* search */}
        <label className="relative grow">
          <span className="sr-only">{searchPlaceholder}</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="field h-12 pl-11 pr-10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center size-8 rounded-lg text-subtle hover:text-fg hover:bg-fg/5 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </label>

        {/* dropdown trigger */}
        <div className="relative shrink-0 flex flex-col">
          <button
            type="button"
            onClick={() => setIsOpen(open => !open)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className={`h-12 shrink-0 inline-flex items-center justify-between sm:justify-center gap-2.5 px-4 rounded-[0.875rem]
            border text-sm font-semibold cursor-pointer transition-colors ${isOpen || selected.length > 0
              ? "border-indigo-500/50 bg-indigo-500/10 text-fg"
              : "border-line bg-bg/40 text-muted hover:text-fg hover:border-indigo-400/40"}`}
          >
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontal size={17} />
              {title}
              {selected.length > 0 && (
                <span className="grid place-items-center min-w-5 h-5 px-1.5 rounded-full bg-brand text-white text-xs font-bold">
                  {selected.length}
                </span>
              )}
            </span>
            <ChevronDown size={17} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* dropdown panel */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id={panelId}
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute z-30 left-0 right-0 sm:left-auto top-full mt-2 sm:w-80 origin-top-right
                rounded-2xl border border-line bg-surface-strong shadow-2xl backdrop-blur-xl p-2"
              >
                <div className="flex items-center justify-between px-2 pt-1 pb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-subtle">
                    {title} · {options.length}
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => onSelectedChange(options.map(option => option.value))}
                      className="px-2 py-1 rounded-md text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 cursor-pointer"
                    >
                      Select all
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectedChange([])}
                      disabled={selected.length === 0}
                      className="px-2 py-1 rounded-md text-xs font-semibold text-muted hover:text-fg hover:bg-fg/5 cursor-pointer disabled:opacity-40 disabled:cursor-default"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {options.length > OPTION_SEARCH_THRESHOLD && (
                  <div className="relative px-1 pb-2">
                    <Search size={15} className="pointer-events-none absolute left-4 top-[1.15rem] -translate-y-1/2 text-subtle" />
                    <input
                      type="text"
                      value={optionQuery}
                      onChange={(e) => setOptionQuery(e.target.value)}
                      placeholder={`Find ${title.toLowerCase()}...`}
                      className="field h-9 pl-9 text-sm"
                      autoFocus
                    />
                  </div>
                )}

                <ul role="listbox" aria-multiselectable="true" aria-label={title} className="max-h-72 overflow-y-auto pr-0.5">
                  {visibleOptions.map((option: FilterOption) => {
                    const isChecked: boolean = selected.includes(option.value);

                    return (
                      <li key={option.value} role="option" aria-selected={isChecked}>
                        <button
                          type="button"
                          onClick={() => toggle(option.value)}
                          className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left text-sm cursor-pointer transition-colors
                          ${isChecked ? "bg-indigo-500/10 text-fg" : "text-muted hover:bg-fg/5 hover:text-fg"}`}
                        >
                          <span
                            className={`grid place-items-center size-5 shrink-0 rounded-md border transition-colors ${isChecked
                              ? "bg-brand border-transparent text-white"
                              : "border-subtle/60"}`}
                          >
                            {isChecked && <Check size={13} strokeWidth={3} />}
                          </span>
                          {option.icon && (
                            <span className="grid place-items-center size-7 shrink-0 rounded-lg bg-fg/5">{option.icon}</span>
                          )}
                          <span className="grow font-medium truncate">{option.label}</span>
                          <span className="text-xs font-semibold tabular-nums text-subtle">{option.count}</span>
                        </button>
                      </li>
                    );
                  })}
                  {visibleOptions.length === 0 && (
                    <li className="px-3 py-4 text-center text-sm text-subtle">No match</li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


      {/* active filters + result count */}
      <div className="flex flex-wrap items-center gap-2 min-h-8">
        <span className="text-xs md:text-sm text-subtle mr-1">
          Showing <span className="font-semibold text-fg tabular-nums">{shownCount}</span> of{" "}
          <span className="tabular-nums">{totalCount}</span>
        </span>

        <AnimatePresence initial={false}>
          {selected.map((value: string) => {
            const option: FilterOption | undefined = optionByValue.get(value);
            return (
              <motion.button
                key={value}
                type="button"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => toggle(value)}
                aria-label={`Remove ${option?.label ?? value}`}
                className="group inline-flex items-center gap-1.5 h-8 pl-1.5 pr-2 rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/25
                text-xs font-semibold text-indigo-700 dark:text-indigo-200 cursor-pointer hover:bg-indigo-500/20 transition-colors"
              >
                {option?.icon && <span className="grid place-items-center size-5">{option.icon}</span>}
                {option?.label ?? value}
                <X size={13} className="opacity-60 group-hover:opacity-100" />
              </motion.button>
            );
          })}
        </AnimatePresence>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto text-xs md:text-sm font-semibold text-muted hover:text-fg underline-offset-4 hover:underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

export default MultiSelectFilter;
