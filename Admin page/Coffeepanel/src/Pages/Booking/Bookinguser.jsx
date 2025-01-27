import React, { useState } from 'react';

function Bookinguser() {
  const [tables, setTables] = useState([
    { id: 1, seats: 4, isTV: false, shape: 'round', position: { x: 40, y: 40 }, reserved: false, reservedBy: null },
    { id: 2, seats: 4, isTV: true, shape: 'square', position: { x: 40, y: 220 }, reserved: false, reservedBy: null },
    { id: 3, seats: 2, isTV: false, shape: 'round', position: { x: 220, y: 40 }, reserved: false, reservedBy: null },
    { id: 4, seats: 2, isTV: false, shape: 'square', position: { x: 220, y: 220 }, reserved: false, reservedBy: null },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleTableClick = (tableId) => {
    if (!tables.find(t => t.id === tableId).reserved) {
      setSelectedTable(tableId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTables(tables.map(table => 
      table.id === selectedTable 
        ? { ...table, reserved: true, reservedBy: formData }
        : table
    ));
    setFormData({ name: '', phone: '' });
    setSelectedTable(null);
  };

  const TableWithChairs = ({ table }) => {
    const isSelected = selectedTable === table.id;
    const baseColor = table.reserved ? '#FCA5A5' : isSelected ? '#BBF7D0' : '#FEF3C7';
    const borderColor = table.reserved ? '#EF4444' : isSelected ? '#22C55E' : '#D97706';
    
    // Round Table and Chairs
    if (table.shape === 'round') {
      return (
        <div className="position-absolute" style={{ left: table.position.x, top: table.position.y }} onClick={() => handleTableClick(table.id)}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Chairs */}
            <g>
              <path d="M70 10 L90 10 L95 25 L65 25 Z" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
              <rect x="75" y="5" width="10" height="15" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
              
              <path d="M135 70 L135 90 L120 95 L120 65 Z" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
              <rect x="140" y="75" width="15" height="10" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
              
              <path d="M90 135 L70 135 L65 120 L95 120 Z" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
              <rect x="75" y="140" width="10" height="15" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
              
              <path d="M10 90 L10 70 L25 65 L25 95 Z" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
              <rect x="5" y="75" width="15" height="10" fill={baseColor} stroke={borderColor} strokeWidth="2"/>
            </g>
            
            {/* Table */}
            <circle cx="80" cy="80" r="25" fill={baseColor} stroke={borderColor} strokeWidth="3"/>
            <circle cx="80" cy="80" r="20" fill="none" stroke={borderColor} strokeWidth="1"/>
            
            {/* Table Number */}
            <text x="80" y="85" textAnchor="middle" fill="#444" fontSize="14" fontWeight="bold">
              {table.id}
            </text>
          </svg>
        </div>
      );
    }
    
    // Square Table and Chairs
    return (
      <div className="position-absolute" style={{ left: table.position.x, top: table.position.y }} onClick={() => handleTableClick(table.id)}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Chairs */}
          <g>
            <rect x="65" y="5" width="30" height="20" fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x="75" y="25" width="10" height="15" fill={baseColor} stroke={borderColor} strokeWidth="2" />
            
            <rect x="135" y="65" width="20" height="30" fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x="120" y="75" width="15" height="10" fill={baseColor} stroke={borderColor} strokeWidth="2" />
            
            <rect x="65" y="135" width="30" height="20" fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x="75" y="120" width="10" height="15" fill={baseColor} stroke={borderColor} strokeWidth="2" />
            
            <rect x="5" y="65" width="20" height="30" fill={baseColor} stroke={borderColor} strokeWidth="2" />
            <rect x="25" y="75" width="15" height="10" fill={baseColor} stroke={borderColor} strokeWidth="2" />
          </g>
          
          {/* Table */}
          <rect x="55" y="55" width="50" height="50" fill={baseColor} stroke={borderColor} strokeWidth="3" />
          <rect x="60" y="60" width="40" height="40" fill="none" stroke={borderColor} strokeWidth="1" />
          
          {/* Table Number */}
          <text x="80" y="85" textAnchor="middle" fill="#444" fontSize="14" fontWeight="bold">
            {table.id}
          </text>
          
          {/* TV Icon if applicable */}
          {table.isTV && (
            <g transform="translate(95, 45)">
              <rect x="0" y="0" width="16" height="12" fill="#3B82F6" rx="2"/>
              <rect x="6" y="12" width="4" height="4" fill="#3B82F6"/>
            </g>
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 font-weight-bold text-amber-800">Coffee Shop Seating</h1>
        <p className="text-muted mt-3">Select a table to make your reservation</p>
      </div>

      <div className="position-relative w-100 h-500px bg-amber-50 border-8 border-amber-900 rounded-xl mb-5">
        {/* Decorative elements */}
        
        
        {/* Entrance */}
        <div className="position-absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-amber-900 mb-8">
          <div className="text-center text-white text-xs mt-1">Entrance</div>
        </div>

        {/* Tables */}
        {tables.map((table) => (
          <TableWithChairs key={table.id} table={table} />
        ))}
      </div>

      {selectedTable && (
        <div className="mx-auto" style={{ maxWidth: '400px' }}>
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="h4 font-weight-bold text-amber-800 mb-4">Reserve Table {selectedTable}</h2>
            <div className="form-group">
              <label className="form-label">Name:</label>
              <input
                type="text"
                required
                className="form-control"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone:</label>
              <input
                type="tel"
                required
                className="form-control"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="btn btn-amber w-100"
            >
              Confirm Reservation
            </button>
          </form>
        </div>
      )}

      <div className="mt-6 text-center text-muted">
        <div className="d-flex justify-content-center">
          <div className="d-flex align-items-center mr-4">
            <div className="w-3 h-3 bg-amber-50 border-2 border-amber-600 rounded mr-2"></div>
            <span>Available</span>
          </div>
          <div className="d-flex align-items-center mr-4">
            <div className="w-3 h-3 bg-green-200 border-2 border-green-600 rounded mr-2"></div>
            <span>Selected</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="w-3 h-3 bg-red-200 border-2 border-red-600 rounded mr-2"></div>
            <span>Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookinguser;