import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import type { ExportFormat } from '../types';

interface ExportButtonProps {
  data: unknown[];
  filename: string;
}

export default function ExportButton({ data, filename }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const convertToCSV = (items: unknown[]): string => {
    if (items.length === 0) return '';

    const headers = Object.keys(items[0] as Record<string, unknown>);
    const rows = items.map((item) =>
      headers
        .map((header) => {
          const value = (item as Record<string, unknown>)[header];
          if (value === null || value === undefined) return '';
          if (typeof value === 'object') return JSON.stringify(value);
          return String(value);
        })
        .join(',')
    );

    return [headers.join(','), ...rows].join('\n');
  };

  const downloadFile = (content: string, extension: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const handleExport = (format: ExportFormat) => {
    if (data.length === 0) return;

    switch (format) {
      case 'csv':
        downloadFile(convertToCSV(data), 'csv', 'text/csv;charset=utf-8;');
        break;
      case 'excel':
        downloadFile(
          convertToCSV(data),
          'xlsx',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        break;
      case 'pdf':
        alert('Exportación a PDF disponible en versión Pro');
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="dropdown dropdown-end" ref={dropdownRef}>
      <button
        type="button"
        className="btn btn-outline btn-sm gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Download className="w-4 h-4" />
        Exportar
      </button>

      {isOpen && (
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50 mt-2">
          <li>
            <button onClick={() => handleExport('csv')} className="gap-2">
              <FileText className="w-4 h-4" />
              Exportar como CSV
            </button>
          </li>
          <li>
            <button onClick={() => handleExport('excel')} className="gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Exportar como Excel
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
