import React from 'react';
import plane1 from '../utils/166998-photos-aircraft-flying-free-hd-image.png';
import plane2 from '../utils/vecteezy_clear-background-passenger-aircraft_47308127.png';

const FlightDoodles = () => {
  return (  
    <>
      <img 
        src={plane1} 
        className="flight-doodle flight-1" 
        style={{width: '300px', height: 'auto', objectFit: 'contain'}}
        alt="airplane"
      />
      <img 
        src={plane2} 
        className="flight-doodle flight-2" 
        style={{width: '280px', height: 'auto', objectFit: 'contain'}}
        alt="airplane"
      />
      <img 
        src={plane1} 
        className="flight-doodle flight-3" 
        style={{width: '320px', height: 'auto', objectFit: 'contain'}}
        alt="airplane"
      />
      <img 
        src={plane2} 
        className="flight-doodle flight-4" 
        style={{width: '290px', height: 'auto', objectFit: 'contain'}}
        alt="airplane"
      />
      <img 
        src={plane1} 
        className="flight-doodle flight-5" 
        style={{width: '310px', height: 'auto', objectFit: 'contain'}}
        alt="airplane"
      />
    </>
  );
};

export default FlightDoodles;
