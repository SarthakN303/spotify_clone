import { Error, SongCard, Loader } from "../components";
import { useDispatch,useSelector } from "react-redux";
import { genres } from "../assets/constants";

import { useGetTopChartsQuery } from "../redux/services/shazamCore";


const Discover = () => {
    
    const dispatch = useDispatch()
    const {activeSong, isPlaying} = useSelector((state) => state.player)

  const { data, isFetching, error } = useGetTopChartsQuery();

  const genreTitle = 'Pop';
  if (isFetching) return <Loader title="Loading Songs..." />;

  if (error) return <Error />
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
        <select
          className="bg-black text-gray-300 p-3 rounded-lg outline-none text-sm sm:mt-0 mt-5"
          onChange={() => {}}
          value=""
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start gap-8 justify-center">
        {data?.map((song, i) => (
          <SongCard key={song.key} i={i} song={song} 
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};
export default Discover;
