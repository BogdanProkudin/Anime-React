import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { useMediaQuery } from 'react-responsive';
import { JSX } from 'react/jsx-runtime';
const AnimeListSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => {
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 362px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 475px)' });

  return (
    <ContentLoader
      speed={2}
      width={isPhoneScreen ? 134 : isSmallScreen ? 164 : 210}
      height={isPhoneScreen ? 205 : isSmallScreen ? 257 : 306}
      viewBox="0 0 210 300"
      backgroundColor="#333333"
      foregroundColor="#333333"
      {...props}
    >
      <rect x="0" y="0" rx="40" ry="40" width="210" height="300" />
    </ContentLoader>
  );
};

export default AnimeListSkeleton;
