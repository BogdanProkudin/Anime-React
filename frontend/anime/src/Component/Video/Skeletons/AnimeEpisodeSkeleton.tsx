import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { useMediaQuery } from 'react-responsive';

const AnimeEpisodeImageSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => {
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 590px)' });
  return (
    <ContentLoader
      speed={1}
      width={isPhoneScreen ? '100%' : 400}
      height={isPhoneScreen ? '100%' : 400}
      viewBox="0 0 400 460"
      backgroundColor="#333333"
      foregroundColor="#a0a0a0"
      {...props}
    >
      <rect x="9" y="23" rx="10" ry="10" width="300" height="400" />
    </ContentLoader>
  );
};

export default AnimeEpisodeImageSkeleton;
