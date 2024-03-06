import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { useMediaQuery } from 'react-responsive';

const AnimeEpisodeImageSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => {
  const isPhoneScreen = useMediaQuery({ query: '(min-width: 425px)' });
  return (
    <ContentLoader
      speed={1}
      width={isPhoneScreen ? 230 : 180}
      height={isPhoneScreen ? 300 : 240}
      viewBox="0 0 230 300"
      backgroundColor="#333333"
      foregroundColor="#a0a0a0"
      {...props}
    >
      <rect x="9" y="23" rx="10" ry="10" width="230" height="300" />
    </ContentLoader>
  );
};

export default AnimeEpisodeImageSkeleton;
