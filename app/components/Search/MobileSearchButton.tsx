
import { SearchIcon } from "../Icons/SvgIcons";

type HandleSearch = {
  handleSearch: (event: React.MouseEvent<HTMLButtonElement>) => void;
  clearAll: ()=> void;
};

export default function SearchButton({ handleSearch, clearAll }: HandleSearch) {
  return (
    <div className="flex items-center justify-between w-full mt-7">
      <button className="underline pl-5 text-lg" onClick={clearAll}>
        Clear All
      </button>

    <button
      className="bg-accentRed w-40 h-14 rounded-full text-lg text-white  shadow-2xl flex items-center justify-center gap-3 "
      onClick={handleSearch}>
      <SearchIcon isWhite/> Find
    </button>
    </div>
  );
}
