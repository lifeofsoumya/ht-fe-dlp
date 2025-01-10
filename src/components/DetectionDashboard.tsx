'use client';

import { useState } from 'react';
import RowDetailsCard from './RowDetailsCard';
import styles from '@/styles/detectionDashboard.module.css'; // CSS Module

const DetectionDashboard = ({ logs }: { logs: any }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [dateSortOrder, setDateSortOrder] = useState<string>('Latest'); // Date sort order state
  const [severityFilter, setSeverityFilter] = useState<string>(''); // Severity filter state
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search query state

  const handleDateSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateSortOrder(event.target.value);
  };

  const handleSeverityFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeverityFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Helper to determine severity level
  const getSeverityLevel = (score: number): string => {
    if (score < 0.5) return 'Low';
    if (score >= 0.5 && score < 0.8) return 'Medium';
    return 'High';
  };

  const filterAndSortData = () => {
    let sortedLogs = [...logs];

    // Sorting logic based on dateSortOrder
    if (dateSortOrder === 'Latest') {
      sortedLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (dateSortOrder === 'Oldest') {
      sortedLogs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }

    return sortedLogs.filter((row: any) => {
      let severityMatch = true;
      let searchMatch = true;

      // Severity filter logic
      const rowSeverity = getSeverityLevel(row.score);
      if (severityFilter && rowSeverity !== severityFilter) {
        severityMatch = false;
      }

      // Search query logic (checks if search term is in the title)
      if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        searchMatch = row.title?.toLowerCase().includes(lowerCaseSearchQuery);
      }

      return severityMatch && searchMatch;
    });
  };

  const handleRowClick = (rowData: any) => {
    setSelectedRow(rowData);
  };

  return (
    <div className={styles.mainContent}> {/* Apply styles from CSS module */}
      <div className={styles.filters}>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by title..."
          className={styles.searchBar}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Date Sort Order */}
        <select className={styles.filterSelect} value={dateSortOrder} onChange={handleDateSortOrderChange}>
          <option value="Latest">Latest First</option>
          <option value="Oldest">Oldest First</option>
        </select>

        {/* Severity Filter */}
        <select className={styles.filterSelect} value={severityFilter} onChange={handleSeverityFilterChange}>
          <option value="">Select Severity Filter</option>
          <option value="Low">Low Severity</option>
          <option value="Medium">Medium Severity</option>
          <option value="High">High Severity</option>
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Event Type</th>
            <th>Score</th>
            <th>Severity</th>
            <th>System ID</th>
          </tr>
        </thead>
        <tbody>
          {filterAndSortData().map((row: any) => (
            <tr key={row.id} onClick={() => handleRowClick(row)}>
              <td>{row.id}</td>
              <td>{new Date(row.timestamp).toLocaleString('en-In')}</td>
              <td>{row.eventType}</td>
              <td>{row.score}</td>
              <td>{getSeverityLevel(row.score)}</td>
              <td>{row.systemId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRow && <RowDetailsCard data={selectedRow} />}
    </div>
  );
};

export default DetectionDashboard;
