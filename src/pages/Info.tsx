import React from 'react'
import InfoPage from '../components/InfoPage';
import FullPageLink from '../components/FullPageLink';

const Info: React.FC = () => {
  return (
    <FullPageLink to="/game">
      <InfoPage />
    </FullPageLink>
  );
};

export default Info;
