import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const AnimeVideoSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => (
  <ContentLoader
    speed={1}
    width={600}
    height={350}
    viewBox="0 0 600 350"
    backgroundColor="#333333"
    foregroundColor="#a0a0a0"
    {...props}
  >
    <rect x="0" y="" rx="0" ry="0" width="600" height="350" />
  </ContentLoader>
);

export default AnimeVideoSkeleton;
