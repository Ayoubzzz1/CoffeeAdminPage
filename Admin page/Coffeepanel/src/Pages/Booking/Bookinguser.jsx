import React, { useEffect, useState } from 'react';
import interact from 'interactjs';

function BookingUser() {
  const templateTables = [
    { id: 'template-2', seats: 2, isTV: false, shape: 'square', width: 50, height: 50 },
    { id: 'template-4', seats: 4, isTV: false, shape: 'square', width: 50, height: 50 },
    { id: 'template-6', seats: 6, isTV: false, shape: 'square', width: 80, height: 60 },
  ];

  const [tables, setTables] = useState([]);

  useEffect(() => {
    interact('.draggable')
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: '.container', // Restrict dragging within the container
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
          })
        ],
        autoScroll: true,
        listeners: {
          move: dragMoveListener,
        }
      });

    function dragMoveListener(event) {
      var target = event.target;
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  }, []);
  const saveTablesPosition = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/saveTablePositions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tables: tables.map(table => ({
            id: table.id,
            seats: table.seats,
            x_position: table.left,
            y_position: table.top,
          }))
        })
      });
  
      if (response.ok) {
        alert('Table positions saved successfully!');
      } else {
        alert('Failed to save table positions.');
      }
    } catch (error) {
      console.error('Error saving positions:', error);
      alert('An error occurred while saving positions.');
    }
  };
  
  const handleTableClick = (table) => {
    // Duplicate the table and add it to the tables array
    const newTable = { ...table, id: `drag-${tables.length + 1}`, left: 50, top: 50 };
    setTables([...tables, newTable]);
  };

  const removeTable = (id) => {
    // Remove the table with the specified id
    setTables(tables.filter((table) => table.id !== id));
  };

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

  const boxStyle = {
    backgroundColor: 'transparent',
    touchAction: 'none',
    userSelect: 'none',
    transform: 'translate(0px, 0px)',
    position: 'absolute',
  };

  return (
    <div className="bg-amber-30 min-h-screen p-4 relative">
      <div className="container" style={{ border: '2px solid black', width: '800px', height: '600px', position: 'relative' }}>
        <div className="absolute inset-0 overflow-visible">
          {tables.map((table) => (
            <div
              key={table.id}
              className="draggable"
              style={{
                ...boxStyle,
                left: `${table.left}px`,
                top: `${table.top}px`,
              }}
            >
              <button
                onClick={() => removeTable(table.id)}
                style={{
                  position: 'absolute',
                  top: 30,
                  right: 10,
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  width: '10px',
                  height: '10px',
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                -
              </button>
              <TableWithChairs table={table} />
            </div>
          ))}
        </div>
      </div>

      {/* Table Models Section */}
      <div className="flex justify-center mt-4 space-x-4">
        {templateTables.map((table) => (
          <div
            key={table.id}
            onClick={() => handleTableClick(table)}
            className="cursor-pointer p-4 border rounded-md bg-white shadow-md"
            style={{ width: '150px', height: '160px' }}
          >
            <TableWithChairs table={table} />
          </div>
        ))}
      </div>
      <button
  onClick={saveTablesPosition}
  className="mt-4 p-2 bg-green-500 text-white rounded"
>
  Save Table Positions
</button>

    </div>
  );
}

export default BookingUser;
