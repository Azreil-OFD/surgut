import React from 'react';

const InfoText: React.FC<{ element: any }> = ({ element }) => (
    <p className="m-0 text-white">
        <span style={{ color: element.titleColor }}>{element.title}</span>
        &nbsp;{element.content}
    </p>
);

export default InfoText;