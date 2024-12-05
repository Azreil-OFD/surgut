import React from 'react';
import { Link, LinkProps } from 'react-router';
import styles from "./FullPageLink.module.css"

interface FullPageLinkProps extends LinkProps {
  children: React.ReactNode;
}

const FullPageLink: React.FC<FullPageLinkProps> = ({ to, children }) => {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
};

export default FullPageLink;
