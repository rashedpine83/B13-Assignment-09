import SearchBar from "./SearchBar";

const TutorHeader = () => {
  return (
    <header className="bg-white border-b border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Find the Right{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#8B6508] to-[#D4A017]">
            Tutor
          </span>{" "}
          for You
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Choose from professional tutors in various subjects and start learning
          at your own pace with flexible online and offline sessions.
        </p>

        <div className="max-w-2xl mx-auto pt-4">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default TutorHeader;
