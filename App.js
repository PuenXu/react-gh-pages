import React, { useState } from 'react';

// Seat component representing a clickable seat
const Seat = ({ row, col, onClick, selected }) => (
  <div
    style={{
      border: '1px solid black',
      padding: '4px',
      margin: '2px',
      cursor: 'pointer',
      backgroundColor: selected ? 'lightblue' : 'white', // Change background color if selected
    }}
    onClick={() => onClick(row, col)}
  >
    {`${String.fromCharCode(64 + row).toUpperCase()}-${col}`}
  </div>
);

// Section component containing a grid of seats
const Section = ({ title, rows, cols, canSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (row, col) => {
    if (canSelect){
      setSelectedSeat({ row, col });
    }
  };

  return (
    <div style={{ padding: '4px' }}>
      <h4>{title}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: rows }, (_, rowIndex) => (
          Array.from({ length: cols }, (_, colIndex) => (
            <Seat
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex + 1}
              col={colIndex + 1}
              onClick={handleSeatClick}
              selected={selectedSeat && selectedSeat.row === rowIndex + 1 && selectedSeat.col === colIndex + 1}
            />
          ))
        ))}
      </div>
      {selectedSeat && (
        <div>
          <h3>Selected Seat</h3>
          <p>{`Row: ${selectedSeat.row}, Column: ${selectedSeat.col}`}</p>
        </div>
      )}
    </div>
  );
};

// Show component representing a rectangular block
const Show = ({ name, date, time, onClick }) => (
  <div style={{ 
    border: '1px solid black', 
    padding: '10px', 
    marginBottom: '10px', 
    cursor: 'pointer',
    width: '200px', // Set a fixed width for each block
    boxSizing: 'border-box', // Include padding and border in the width calculation
  }} onClick={onClick}>
    <p><strong>Show:</strong> {name}</p>
    <p><strong>Date:</strong> {date}</p>
    <p><strong>Time:</strong> {time}</p>
  </div>
);

// VenueManager component managing a list of shows
const VenueManager = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const [showCreating, setShowCreating] = useState(false);
  const [showCreated, setShowCreated] = useState(false);

  const [showName, setShowName] = useState('');
  const [showDate, setShowDate] = useState('');
  const [showTime, setShowTime] = useState('');
  const [showNum, setShowNum] = useState(0);

  const handleShowClick = (index) => {
    setSelectedShow(shows[index]);
  };

  const creatingShow = () => {
    setShowCreating(true);
  }

  const createShow = () => {
      setShowName('');
      setShowDate('');
      setShowTime('');
      setShowNum(prevNum => prevNum + 1);
      setShowCreating(false);
      setShowCreated(true);
  }

  const displayDate = (date) => {
    const month = parseInt(date / 10000, 10);
    const day = parseInt((date - month * 10000) / 100, 10);
    const year = date - month * 10000 - day * 100 + 2000;

    return <p>Date: Month {month} / Day {day} / Year {year}</p>
  }

  const displayTime = (time) => {
      const hour = parseInt(time / 100, 10);
      const minute = time - hour * 100

      return <p>Time: {hour} : {minute}</p>
  }

  return (
    <div>
      {!showCreating ? (
      <div>
        <button onClick={creatingShow}>Create show</button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <h3>Your list of shows</h3>
          {shows.map((show, index) => (
            <Show key={index} {...show} onClick={() => handleShowClick(index)} />
          ))}
          {selectedShow && (
            <div>
              <h2>Selected Show</h2>
              <p><strong>Show:</strong> {selectedShow.name}</p>
              <p><strong>Date:</strong> {selectedShow.date}</p>
              <p><strong>Time:</strong> {selectedShow.time}</p>
            </div>
          )}
        </div>
      </div>
      ) : (
      <div>
        <input type="text" value={showName} onChange={(e) => setShowName(e.target.value)} placeholder="Show Name"/> <p></p>
        <input type="number" value={showDate} onChange={(e) => setShowDate(parseInt(e.target.value, 10))} placeholder="Show Date in MMDDYY Format"/><p></p>
        <input type="number" value={showTime} onChange={(e) => setShowTime(parseInt(e.target.value, 10))} placeholder="Show Time in HHMM Format"/><p></p>
        <p>Confirm the information: </p>
        <p>Show Name: {showName}</p> {displayDate(showDate)} {displayTime(showTime)}
        <button onClick={createShow}>Submit</button>
      </div>
      )
      }
    </div>
  );
};

// App component combining sections
const App = () => {
  
  const [venueCreated, setVenueCreated] = useState(false);
  const [venueName, setVenueName] = useState('');
  const [leftRow, setLeftRow] = useState('');
  const [leftCol, setLeftCol] = useState('');
  const [rightRow, setRightRow] = useState('');
  const [rightCol, setRightCol] = useState('');
  const [centerRow, setCenterRow] = useState('');
  const [centerCol, setCenterCol] = useState('');

  const createVenue = () => {
    setVenueCreated(true);
    };

  const handleLeftRowChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value <= 26) {
      setLeftRow(value);
    }
  };

  const handleLeftColChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setLeftCol(value);
    }
  };

  const handleCenterRowChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value <= 26) {
      setCenterRow(value);
    }
  };

  const handleCenterColChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setCenterCol(value);
    }
  };

  const handleRightRowChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value <= 26) {
      setRightRow(value);
    }
  };

  const handleRightColChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0) {
      setRightCol(value);
    }
  };


  return (

    <div>
      {!venueCreated ? (
        <div>
          <div style={{ position: 'absolute', left: 100, top:100 }}>
              <input type="text" value={venueName} onChange={(e) => setVenueName(e.target.value)} placeholder="Venue Name"/> <p></p>
              <input type="number" value={leftRow} onChange={handleLeftRowChange} placeholder="left row number"/><p></p>
              <input type="number" value={leftCol} onChange={handleLeftColChange} placeholder="left col number"/><p></p>
              <input type="number" value={centerRow} onChange={handleCenterRowChange} placeholder="center row number"/><p></p>
              <input type="number" value={centerCol} onChange={handleCenterColChange} placeholder="center col number"/><p></p>
              <input type="number" value={rightRow} onChange={handleRightRowChange} placeholder="right row number"/><p></p>
              <input type="number" value={rightCol} onChange={handleRightColChange} placeholder="right col number"/><p></p>
              <p>Confirm the information: </p>
              <p>Venue Name: {venueName}</p> <p>Left Row: {leftRow}</p> <p>Left Col: {leftCol}</p> <p>Center Row: {centerRow}</p> 
              <p>Center Col: {centerCol}</p> <p>Right Row: {rightRow}</p> <p>Right Col: {rightCol}</p> 
              <button onClick={createVenue}>Submit</button>
          </div>
          <div style={{ position: 'absolute', right: 100, top:100 }}>
              <h3>Venue Layout</h3>
              <div style={{ display: 'flex' }}>
                <Section title="Left" rows={leftRow} cols={leftCol} canSelect={false}/>
                <Section title="Center" rows={centerRow} cols={centerCol} canSelect={false}/>
                <Section title="Right" rows={rightRow} cols={rightCol} canSelect={false}/>
              </div>
          </div>
        </div>)
      :(
        <div style={{ position: 'absolute', left: 100, top:50 }}>
          <VenueManager />
      </div>
      )
      }
    </div>
  )
};

export default App;
