import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { JSX } from 'react/jsx-runtime';
const AnimeListSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    width={224}
    height={300}
    viewBox="0 0 224 300"
    backgroundColor="#333333"
    foregroundColor="#a0a0a0"
    {...props}
  >
    <rect x="0" y="0" rx="40" ry="40" width="224" height="300" />
  </ContentLoader>
);

export default AnimeListSkeleton;
