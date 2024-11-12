import { SearchIcon } from "../Icons/SvgIcons";

type HandleSearch = {
  handleSearch: (event: React.MouseEvent<HTMLButtonElement>) => void;
  clearAll: ()=> void;
};

export default function SearchButton({ handleSearch, clearAll }: HandleSearch) {
  return (
    <div className="w-32 flex justify-end overflow-hidden ">
      <button
        className="bg-accentRed w-14 h-14 hover:w-24 rounded-full text-lg text-white hover:bg-accentRed  transition-all duration-300 group flex items-center justify-center relative  shadow-2xl"
        onClick={handleSearch}>
        <SearchIcon isWhite/> 
        <span className="absolute left-11 group-hover:left-11 opacity-0 transition-all duration-300 whitespace-nowrap group-hover:opacity-100 ">
          Find
        </span>
      </button>
      <button className="underline pl-5 text-lg absolute -bottom-9 right-12" onClick={clearAll}>
        Clear All
      </button>
    </div>
  );
}
