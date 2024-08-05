import React from 'react'
import InfoPage from '../components/InfoPage';
import FullPageLink from '../components/FullPageLink/FullPageLink';

const Info: React.FC = () => {
  return (
    <FullPageLink to="/">
      <InfoPage />
    </FullPageLink>
  );
};

export default Info;
