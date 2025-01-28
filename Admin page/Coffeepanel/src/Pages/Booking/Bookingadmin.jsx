import React, { useState, useEffect } from 'react';

function BookingAdmin() {
  const templateTables = [
    { id: 'template-2', seats: 2, isTV: false, shape: 'square', width: 50, height: 50 },
    { id: 'template-4', seats: 4, isTV: false, shape: 'square', width: 50, height: 50 },
    { id: 'template-6', seats: 6, isTV: false, shape: 'square', width: 80, height: 60 },
  ];

  const [tables, setTables] = useState([]);

  useEffect(() => {
    // Fetch tables from database if needed (example)
    const fetchTables = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tablePositions'); // Modify to the correct endpoint
        if (response.ok) {
          const data = await response.json();
          setTables(data); // Set fetched tables to state
        } else {
          console.error('Failed to fetch tables');
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
    

    fetchTables();
  }, []);

  const TableWithChairs = ({ table }) => {
    const baseColor = '#FEF3C7';
    const borderColor = '#D97706';
    const chairWidth = 30;
    const chairHeight = 20;
    const spacing = 10;

    const renderChairs = () => {
      if (table.seats === 2) {
        return (
          <>
            <rect x={65} y={5} width={chairWidth} height={chairHeight} fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x={65} y={135} width={chairWidth} height={chairHeight} fill={baseColor} stroke={borderColor} strokeWidth="2" />
          </>
        );
      }
      if (table.seats === 4) {
        return (
          <>
            <rect x={65} y={5} width={chairWidth} height={chairHeight} fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x={135} y={65} width={chairHeight} height={chairWidth} fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x={65} y={135} width={chairWidth} height={chairHeight} fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x={5} y={65} width={chairHeight} height={chairWidth} fill={baseColor} stroke={borderColor} strokeWidth="2" />
          </>
        );
      }
      if (table.seats === 6) {
        const tableX = 80 - (table.width / 2);
        const tableY = 80 - (table.height / 2);
        
        const topChairX = tableX + (table.width / 2) - (chairWidth / 2);
        const topChairY = tableY - chairHeight - spacing;
        
        const bottomChairX = tableX + (table.width / 2) - (chairWidth / 2);
        const bottomChairY = tableY + table.height + spacing;
        
        const leftChairX = tableX - chairHeight - spacing;
        const rightChairX = tableX + table.width + spacing;
        const sideChairY1 = tableY + (table.height / 4) - (chairWidth / 2);
        const sideChairY2 = tableY + (3 * table.height / 4) - (chairWidth / 2);

        return (
          <>
            <rect x={topChairX} y={topChairY} width={chairWidth} height={chairHeight} fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x={rightChairX} y={sideChairY1} width={chairHeight} height={chairWidth} fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x={rightChairX} y={sideChairY2} width={chairHeight} height={chairWidth} fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x={bottomChairX} y={bottomChairY} width={chairWidth} height={chairHeight} fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x={leftChairX} y={sideChairY1} width={chairHeight} height={chairWidth} fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x={leftChairX} y={sideChairY2} width={chairHeight} height={chairWidth} fill={baseColor} stroke={borderColor} strokeWidth="2" />
          </>
        );
      }
    };

    return (
      <svg width="100" height="160" viewBox="0 0 160 160">
        <g>{renderChairs()}</g>
        <rect 
          x={80 - (table.width / 2)} 
          y={80 - (table.height / 2)} 
          width={table.width} 
          height={table.height} 
          fill={baseColor} 
          stroke={borderColor} 
          strokeWidth="3" 
        />
        <rect 
          x={80 - (table.width / 2) + 5} 
          y={80 - (table.height / 2) + 5} 
          width={table.width - 10} 
          height={table.height - 10} 
          fill="none" 
          stroke={borderColor} 
          strokeWidth="1" 
        />
        <text x="80" y="85" textAnchor="middle" fill="#444" fontSize="14" fontWeight="bold">
          {table.seats}
        </text>
      </svg>
    );
  };

  return (
    <div className="bg-amber-30 min-h-screen p-4">
      {/* Table Models Section */}
      <div className="flex justify-center mt-4 space-x-4">
        {templateTables.map((table) => (
          <div
            key={table.id}
            className="cursor-pointer p-4 border rounded-md bg-white shadow-md"
            style={{ width: '150px', height: '160px' }}
          >
            <TableWithChairs table={table} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingAdmin;
