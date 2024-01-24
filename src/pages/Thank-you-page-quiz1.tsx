import { Button } from '@mantine/core';
import React, { useState } from 'react';

const ThankYouQuiz1 = () => {
  const [isPresentOpened, setIsPresentOpened] = useState(false);

  const openPresent = () => {
    setIsPresentOpened(true);
  };

  const downloadPicture = () => {
    const link = document.createElement('a');
    link.href = '6829.png';
    link.download = '6829.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        window.location.href = '/';
      }, 2000);
  };

  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
      <h1>Grattis! Du klarade quiz 1 </h1>
      {!isPresentOpened ? (
        <img
          src='whitePresent.png'
          alt="whitePresent"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      ) : (
        <div>
          <img
            src='6829.png'
            alt="quiz1rewardpic"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
          <div>
            <Button style={{marginBottom: '3vh'}}onClick={downloadPicture}>Ladda ned bild</Button>
          </div>
        </div>
      )}
      {!isPresentOpened && (
        <div>
          <Button onClick={openPresent}>Öppna present</Button>
        </div>
      )}
    </div>
  );
};

export default ThankYouQuiz1;
