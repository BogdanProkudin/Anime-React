type AnimeGenresProps = {
  name: string;
};
export type AnimeTypes = {
  AnimePoster: string | undefined;
  AnimeTitle: string | undefined;
  AnimeGenres: AnimeGenresProps | undefined;
  AnimeYear: number | undefined;
};
interface UserModelTypes {
  Email: string;
  UserName: string;
  Password: string;
  ToWatch: AnimeTypes[] | [];
}

export default UserModelTypes;
