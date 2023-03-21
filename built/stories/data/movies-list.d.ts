export interface Movie {
    id: number;
    title: string;
    year: string;
    runtime: string;
    genres: string[];
    director: string;
    actors: string;
    plot: string;
    posterUrl: string;
}
declare const moviesList: Movie[];
export default moviesList;
