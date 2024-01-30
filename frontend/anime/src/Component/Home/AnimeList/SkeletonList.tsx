import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { JSX } from 'react/jsx-runtime';
const AnimeListSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={134}
    height={191}
    viewBox="0 0 134 191"
    backgroundColor="#333333"
    foregroundColor="#a0a0a0"
    {...props}
  >
    <rect x="0" y="0" rx="40" ry="40" width="134" height="191" />
  </ContentLoader>
);

export default AnimeListSkeleton;
