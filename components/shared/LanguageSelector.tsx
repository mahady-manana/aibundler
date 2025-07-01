import { usePathname, useRouter } from "@/i18n/navigation";
import { languageOptions } from "@/lib/language";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentOption = languageOptions.find(
    (option) => option.code === locale
  );
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  function onSelectChange(lc: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: lc }
      );
    });
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
        aria-label="Select language"
      >
        <img
          src={currentOption?.flag}
          alt={currentOption?.label}
          className="w-5 h-5 object-cover rounded-full"
        />
        <span className="text-sm font-medium text-gray-700">
          {currentOption?.code.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden transition-all duration-200 transform origin-top scale-100 opacity-100">
          <div className="py-1">
            {languageOptions.map((option) => (
              <button
                key={option.code}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors duration-150 ${
                  locale === option.code ? "bg-gray-50" : ""
                }`}
                onClick={() => onSelectChange(option.code)}
              >
                <img
                  src={option.flag}
                  alt={option.label}
                  className="w-5 h-5 object-cover rounded-full"
                />
                <span className="font-medium text-gray-700">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
