import React, { useState, useEffect } from 'react';
import { SpotlightGrid } from './SpotlightGrid';
import { ballotService } from '../../services/ballotService';

// Fallback images in case the dynamic record lacks an avatar_path
import defaultBg from '../../assets/image/img1.jpg';

export const RegistrySpotlightSection = ({ 
  title = "Impact Endorsements & Allocations", 
  tag = "Global Nomination Registry", 
  columns = 4 
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0
  });

  useEffect(() => {
    loadRegistryQueue(pagination.currentPage);
  }, [pagination.currentPage]);

  const loadRegistryQueue = async (page) => {
    setLoading(true);
    try {
      const result = await ballotService.getPublicRegistryQueue(page);
      
      if (result.status === 'success') {
     const formattedItems = result.data.map(nominee => {
                const statusTag = nominee.status === 'shortlisted' ? ' [Shortlisted]' : ' [Pending Approval]';

                return {
                    id: nominee.id.toString(),
                    title: nominee.nominate_name,
                    subtitle: `Category: ${nominee.category_name}${statusTag}`,
                    description: nominee.reason || "No validation performance dossier notes provided.",
                    image: nominee.avatar_path ? `${nominee.avatar_path}` : defaultBg,
                    metrics: nominee.metrics // 👈 Seamless mapping injection layer passing down
                };
                });
        
        setItems(formattedItems);
        setPagination({
          currentPage: result.meta.current_page,
          lastPage: result.meta.last_page,
          total: result.meta.total
        });
      }
    } catch (error) {
      console.error("Failed to hydrate premium registry ledger:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.lastPage) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  return (
    <div className="relative z-10 w-full">
      {loading ? (
        /* The Skeleton Loading view you originally had */
        <div className="max-w-7xl mx-auto px-4 py-20 space-y-4 animate-pulse">
          <div className="h-8 bg-zinc-800 rounded w-1/4 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => <div key={n} className="h-72 bg-zinc-800/50 rounded-2xl" />)}
          </div>
        </div>
      ) : (
        <>
          {/* Reuse the unchanged base SpotlightGrid with custom data */}
          <SpotlightGrid 
            title={title}
            tag={tag}
            items={items}
            columns={columns}
          />

          {/* Pagination Controls */}
          {pagination.lastPage > 1 && (
            <div className="max-w-7xl mx-auto px-4 pb-20 flex items-center justify-between border-t border-zinc-800/60 pt-6 mt-4 relative z-10">
              <span className="text-sm text-zinc-400">
                Showing entries <span className="text-white font-medium">{items.length}</span> of <span className="text-white font-medium">{pagination.total}</span>
              </span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg font-medium text-white transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none hover:bg-zinc-800"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-1 px-2 text-sm text-zinc-400">
                  <span className="text-white font-medium">{pagination.currentPage}</span>
                  <span>/</span>
                  <span>{pagination.lastPage}</span>
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.lastPage}
                  className="px-4 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg font-medium text-white transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none hover:bg-zinc-800"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};