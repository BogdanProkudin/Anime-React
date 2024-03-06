import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { useMediaQuery } from 'react-responsive';

const AnimeTitleSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => {
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 425px)' });
  return (
    <ContentLoader
      speed={1}
      width={isPhoneScreen ? 300 : 420}
      height={184}
      viewBox="-50 -30 340 115"
      backgroundColor="#333333"
      foregroundColor="#a0a0a0"
      {...props}
    >
      <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
      <rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
      <rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
      <rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
      <rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
      <rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
      <rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
      <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
    </ContentLoader>
  );
};

export default AnimeTitleSkeleton;
