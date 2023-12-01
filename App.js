import React, { useState, useEffect } from 'react';

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
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [blocks, setBlocks] = useState([]);

  const handleSeatClick = (row, col) => {
    if (canSelect) {
      // Check if the seat is already selected
      const isSeatSelected = selectedSeats.some(seat => seat.row === row && seat.col === col);

      if (!isSeatSelected) {
        // Add the selected seat to the list
        setSelectedSeats(prevSeats => [...prevSeats, { row, col }]);
      } else {
        // Remove the selected seat from the list if it's already selected
        setSelectedSeats(prevSeats => prevSeats.filter(seat => !(seat.row === row && seat.col === col)));
      }
    }
  };

  // const addBlock = () => {
  //   // Check if selectedSeats is not empty before adding it to blocks
  //   if (selectedSeats.length > 0) {
  //     console.log(selectedSeats);
  //     setBlocks(prevBlocks => [...prevBlocks, selectedSeats]);
  //     // Clear selectedSeats after adding it to a block
  //     console.log(blocks);
  //     setSelectedSeats([]);
  //     console.log(selectedSeats);
  //   }
  // };  

  const addBlock = () => {
    if (selectedSeats.length > 0) {
      console.log(selectedSeats);
      setBlocks(prevBlocks => [...prevBlocks, selectedSeats]);
      setSelectedSeats([]);
    }
  };
  
  useEffect(() => {
    // This will log the updated blocks state
    console.log(blocks);
  }, [blocks]);
  

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
              onClick={() => handleSeatClick(rowIndex + 1, colIndex + 1)}
              selected={selectedSeats.some(seat => seat.row === rowIndex + 1 && seat.col === colIndex + 1)}
            />
          ))
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <div>
          <h3>Selected Seats</h3>
          {selectedSeats.map((seat, index) => (
            <p key={index}>{`Row: ${seat.row}, Column: ${seat.col}`}</p>
          ))}
          <button onClick={addBlock}>Add block</button>
        </div>
      )}
      {blocks.length > 0 && blocks.map((block, index) => (
          <div>
            <p>Block</p>
            <span key={index}>
              {block.length > 0 &&
                block.map((seat, j) => (
                  <p key={j}>{`${seat.row}-${seat.col}`}</p>
                ))}
            </span>
          </div>
        ))}
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

// App component combining sections
const App = () => {
  
  // venues
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

  // shows
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const addShow = (newShow) => {
    setShows((prevShows) => [...prevShows, newShow]);
  };

  const [showCreating, setShowCreating] = useState(false);

  const [showName, setShowName] = useState('');
  const [showDate, setShowDate] = useState('');
  const [showTime, setShowTime] = useState('');
  const [showNum, setShowNum] = useState(0);

  const handleShowClick = (index) => {
    setSelectedShow(shows[index]);
  };

  const handleUnselectShow = () => {
    setSelectedShow(null);
  };

  const handleDeleteShow = () => {
    setShows(prevShows => prevShows.filter(show => show !== selectedShow));
    setSelectedShow(null);
    setShowNum(prevNum => prevNum - 1);
  };

  const creatingShow = () => {
    setShowCreating(true);
  }

  const createShow = () => {
    const month = parseInt(showDate / 10000, 10);
    const day = parseInt((showDate - month * 10000) / 100, 10);
    const year = showDate - month * 10000 - day * 100 + 2000;
    const hour = parseInt(showTime / 100, 10);
    const minute = showTime - hour * 100
    addShow({ name: showName, date: `${year}-${month}-${day}`, time: `${hour}:${minute}` });
    setShowName('');
    setShowDate('');
    setShowTime('');
    setShowNum(prevNum => prevNum + 1);
    setShowCreating(false);
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
        </div>
      ):(
        <div>
          <div>
          <div>
          {!showCreating ? (
            <div>
              <div>
                {!selectedShow && (
                  <div style={{ position: 'absolute', left: 100, top:50 }}>
                    <h3>Your list of shows</h3>
                    <p>You have {showNum} shows</p>
                    <button onClick={creatingShow}>Create show</button>
                  </div>)
                }
                <div style={{ position: 'absolute', left: 100, top:200 }}>
                  {!selectedShow && shows.map((show, index) => (
                    <Show key={index} {...show} onClick={() => handleShowClick(index)} />
                  ))}
                </div>
                {selectedShow && (
                  <div>
                    <div style={{ position: 'absolute', left: 100, top:50 }}>
                      <h2>Selected Show</h2>
                      <p><strong>Show:</strong> {selectedShow.name}</p>
                      <p><strong>Date:</strong> {selectedShow.date}</p>
                      <p><strong>Time:</strong> {selectedShow.time}</p>
                      <button onClick={handleUnselectShow}>unselectShow</button>
                      <button onClick={handleDeleteShow}>deleteShow</button>
                    </div>
                    <div style={{ position: 'absolute', right: 100, top:100 }}>
                      <h3>Venue Layout</h3>
                      <div style={{ display: 'flex' }}>
                        <Section title="Left" rows={leftRow} cols={leftCol} canSelect={true}/>
                        <Section title="Center" rows={centerRow} cols={centerCol} canSelect={true}/>
                        <Section title="Right" rows={rightRow} cols={rightCol} canSelect={true}/>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
          <div>
            <div style={{ position: 'absolute', left: 100, top:50 }}>
              <input type="text" value={showName} onChange={(e) => setShowName(e.target.value)} placeholder="Show Name"/> <p></p>
              <input type="number" value={showDate} onChange={(e) => setShowDate(parseInt(e.target.value, 10))} placeholder="Show Date in MMDDYY Format"/><p></p>
              <input type="number" value={showTime} onChange={(e) => setShowTime(parseInt(e.target.value, 10))} placeholder="Show Time in HHMM Format"/><p></p>
              <p>Confirm the information: </p>
              <p>Show Name: {showName}</p> {displayDate(showDate)} {displayTime(showTime)}
              <button onClick={createShow}>Submit</button>
            </div>
            <div style={{ position: 'absolute', right: 100, top:100 }}>
              <h3>Venue Layout</h3>
              <div style={{ display: 'flex' }}>
                <Section title="Left" rows={leftRow} cols={leftCol} canSelect={false}/>
                <Section title="Center" rows={centerRow} cols={centerCol} canSelect={false}/>
                <Section title="Right" rows={rightRow} cols={rightCol} canSelect={false}/>
              </div>
            </div>
          </div>
          )
          }
        </div>
      </div>
          
    </div>
      )
    }
  </div>
  )
};

export default App;
