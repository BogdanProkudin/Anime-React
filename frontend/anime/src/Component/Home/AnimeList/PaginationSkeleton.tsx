import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { JSX } from 'react/jsx-runtime';

const PaginationSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={1}
    width={40}
    height={40}
    viewBox="0 0 40 40"
    backgroundColor="white"
    foregroundColor="#333333"
    {...props}
  >
    <rect x="263" y="147" rx="0" ry="0" width="43" height="40" />
  </ContentLoader>
);

export default PaginationSkeleton;
