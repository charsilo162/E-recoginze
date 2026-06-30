import React from 'react';

export default function PaginationControls({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-4 sm:px-6 mt-8">
      <div className="flex flex-1 justify-between sm:hidden">
        <button 
          disabled={meta.current_page === 1}
          onClick={() => onPageChange(meta.current_page - 1)}
          className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
        >
          Previous
        </button>
        <button 
          disabled={meta.current_page === meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          Showing page <span className="font-semibold">{meta.current_page}</span> of <span className="font-semibold">{meta.last_page}</span>
        </p>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white" aria-label="Pagination">
          {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                page === meta.current_page 
                  ? 'z-10 bg-slate-900 text-white' 
                  : 'text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}