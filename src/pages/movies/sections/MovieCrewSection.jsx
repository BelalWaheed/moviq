import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotFound from "../../notFound/NotFound";
import MovieLoader from "../../loading/MovieLoader";
import { GetPersonDetails } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonDetails";
import { GetPersonCombinedCredits } from "../../../redux/SharedSlices/GetRequest/Person/GetPersonCombinedCredits";

const MovieCrewSection = () => {
  const {
    MovieCreditsDetails,
    MovieCreditsDetailsLoading,
    MovieCreditsDetailsError,
  } = useSelector((state) => state.MovieCreditsReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {MovieCreditsDetailsError ? (
        <NotFound />
      ) : MovieCreditsDetailsLoading ? (
        <MovieLoader />
      ) : (
        MovieCreditsDetails?.crew?.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Crew</h2>
            <div className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-indicator pb-3">
              {MovieCreditsDetails.crew.slice(0, 10).map((worker, index) => (
                <div
                  onClick={() => {
                    dispatch(
                      GetPersonDetails({
                        personId: worker.id,
                      })
                    );
                    dispatch(
                      GetPersonCombinedCredits({
                        personId: worker.id,
                      })
                    );
                    localStorage.setItem("personId", worker.id);
                    navigate("/PersonalInfo");
                  }}
                  key={index}
                  className="min-w-[150px] bg-zinc-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={
                        worker.profile_path
                          ? `https://image.tmdb.org/t/p/w500${worker.profile_path}`
                          : "./Image-not-found.png"
                      }
                      alt={worker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-semibold truncate">
                      {worker.name}
                    </h3>
                    <p className="text-gray-400 text-xs truncate">
                      {worker.job || "Unknown Role"}
                    </p>
                  </div>
                </div>
              ))}

              {MovieCreditsDetails.crew.length > 10 && (
                <button
                  onClick={() => navigate("/AllCrewMovie")}
                  className="min-w-[150px] flex flex-col justify-center items-center bg-zinc-800 rounded-2xl cursor-pointer hover:scale-105 hover:bg-red-600 transition-all duration-300"
                >
                  <span className="text-white text-lg font-bold">
                    +{MovieCreditsDetails.crew.length - 10}
                  </span>
                  <span className="text-sm text-gray-300">Show More</span>
                </button>
              )}
            </div>
          </section>
        )
      )}
    </>
  );
};

export default MovieCrewSection;
