import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { useMediaQuery } from 'react-responsive';

const AnimeInfoSkeleton = (props: JSX.IntrinsicAttributes & IContentLoaderProps) => {
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 590px)' });
  return (
    <ContentLoader
      speed={1}
      width={isPhoneScreen ? '100%' : 400}
      height={30}
      viewBox="0 0 400 30"
      backgroundColor="#333333"
      foregroundColor="#a0a0a0"
      {...props}
    >
      <rect x="25" y="15" rx="5" ry="5" width="220" height="10" />
    </ContentLoader>
  );
};

export default AnimeInfoSkeleton;
