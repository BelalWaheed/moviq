import { ChevronRight } from "lucide-react";

function NextArrow({ onClick }) {
  return (
    <button
      aria-label="Next slide"
      onClick={onClick}
      className="arrow-btn absolute right-4 top-1/2 -translate-y-1/2 z-30 
                 bg-background-elevated hover:bg-background-elevated/60 
                 p-1.5 sm:p-2 md:p-3 rounded-full text-white transition-shadow shadow-md
                 max-[500px]:hidden"
    >
      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
    </button>
  );
}

export default NextArrow;
