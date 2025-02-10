import ResultCard from "../components/ResultCard";
import Separator from "../components/Separator";
import { useEffect, useRef, useState } from "react";
import { getLocalBusinesses } from "@/utils/getLocalBusinesses";
import { LocalBusiness } from "@/interfaces";
import SearchInput from "../components/SearchInput";
import FilterInput from "../components/FilterInput";
import Mapbox from "../components/Mapbox";
import BusinessCard from "../components/BusinessCard";
import { defaultLocalBusiness } from "@/data";
import BtnCustom from "../components/BtnCustom";

interface ICategory {
  fields: {
    Categories: string;
  };
}

const ResultsPanel = () => {
  const [localBusinesses, setLocalBusinesses] = useState<LocalBusiness[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string>("");
  const [selectedCard, setSelectedCard] =
    useState<LocalBusiness>(defaultLocalBusiness);
  const [drobdownIsOpen, setDrobdownIsOpen] = useState<boolean>(false);

  // Fetch Categories from Airtable when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://api.airtable.com/v0/applSSNZaJMDtrUdz/tblkDj7TJ5qFpdsfj?view=viwVlXbK0UXeipklF";
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN
            }`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const industries: string[] = Array.from(
          new Set(
            data.records.map(
              (category: ICategory) => category.fields.Categories
            )
          )
        );
        setCategories(industries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch local Businesses from Airtable
  useEffect(() => {
    const fetchData = async () => {
      const data = await getLocalBusinesses(searchValue, selectedCategories);
      setLocalBusinesses(data);
    };

    fetchData();
  }, [searchValue, selectedCategories]);

  useEffect(() => {
    if (selectedCard)
      localBusinesses.forEach((item) => {
        if (item.id == activeCardId) setSelectedCard(item);
      });
  }, [activeCardId]);

  // close card buss when click outside self
  const cardref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardref.current && !cardref.current.contains(event.target as Node)) {
        setSelectedCard(defaultLocalBusiness);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle click on ResultCard
  const handleCardClick = (id: string, localBusinesse: LocalBusiness) => {
    setActiveCardId(id);
    setSelectedCard(localBusinesse);
  };

  // Automatically hide the map on medium screens and above
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMapVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-0 md:p-[24px] bg-customSecondaryDark relative h-[calc(100vh-132px)] md:h-[95vh] ">
      {/* left side */}
      <div className="p-[12px] flex flex-col gap-[12px] bg-customSecondary rounded-[6px_0_0_6px] w-full lg:w-[30%] md:w-[45%] relative h-full flex-1 ">
        {/* Search */}
        <div className="p-[12px] ">
          <div className="flex gap-0 items-center ">
            <SearchInput
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <FilterInput
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              setDrobdownIsOpen={setDrobdownIsOpen}
              categories={categories}
            />
          </div>

          <span
            className={`flex items-center gap-[4px] font-semibold mt-[12px] ${
              selectedCategories.length ? "block" : "hidden"
            }`}
            onClick={() => setSelectedCategories("")}
          >
            <svg
              className="cursor-pointer"
              width="11"
              height="14"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.43359 1.49609L6.15234 4.75L9.40625 8.00391L9.87109 8.46875L8.96875 9.39844L8.50391 8.93359L5.25 5.67969L1.99609 8.93359L1.53125 9.39844L0.601562 8.46875L1.06641 8.00391L4.32031 4.75L1.06641 1.49609L0.601562 1.03125L1.53125 0.101562L1.99609 0.566406L5.25 3.84766L8.50391 0.59375L8.96875 0.128906L9.89844 1.03125L9.43359 1.49609Z"
                className="fill-customPrimaryDark"
              />
            </svg>
            Clear filters
          </span>
        </div>

        {/* Search Result */}
        <div
          className={`bg-customSecondary custom-scrollbar overflow-x-hidden overflow-auto h-[100%] md:h-auto flex-grow-1 relative ${
            isMapVisible && "hidden"
          }`}
        >
          <p className="mb-[12px] text-[14px] text-customPrimaryLight font-medium px-[12px]">
            Over {localBusinesses.length} local businesses in selected area
          </p>

          {localBusinesses.length ? (
            localBusinesses.map((localBusinesse, index) => (
              <div key={localBusinesse.id}>
                <ResultCard
                  localBusinesseData={localBusinesse}
                  onClick={() =>
                    handleCardClick(localBusinesse.id, localBusinesse)
                  }
                />

                {index !== localBusinesses.length - 1 && (
                  <div className="my-[12px]">
                    <Separator width="100%" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="mt-[12px] text-[14px] font-bold px-[12px]">
              loading ...
            </p>
          )}
        </div>
      </div>

      {/* Map */}
      <div
        className={`h-[100%] lg:w-[70%] md:w-[55%] flex flex-col ${
          isMapVisible ? "block" : "h-0 hidden md:h-[100%] md:block"
        }`}
      >
        <div className="flex-grow md:h-[100%]">
          <Mapbox
            localBusinesses={localBusinesses}
            activeCardId={activeCardId}
            setActiveCardId={setActiveCardId}
          />
        </div>

        {isMapVisible && (
          <div
            className={`md:hidden p-[8px_8px_30px_8px] bg-customSecondary rounded-[12px_12px_0_0] border-b-2 border-customAccent`}
          >
            <p className="mb-[12px] text-[14px] text-customPrimaryLight font-medium px-[12px] pt-[12px]">
              Over {localBusinesses.length} local businesses in selected area
            </p>

            {localBusinesses.slice(0, 2).map((localBusinesse, index) => (
              <div key={localBusinesse.id}>
                <ResultCard
                  localBusinesseData={localBusinesse}
                  onClick={() =>
                    handleCardClick(localBusinesse.id, localBusinesse)
                  }
                />
                {index !== 1 && (
                  <div className="my-[12px]">
                    <Separator width="100%" />
                  </div>
                )}
              </div>
            ))}
            <div className="mx-[12px] mt-[12px]">
              <BtnCustom
                txt="Show more"
                bgColor="#E3E3DE"
                width="100%"
                padding="6px 0"
                txtColor="#132527"
                onClick={() => setIsMapVisible(!isMapVisible)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Business Card */}
      <div
        ref={cardref}
        className="fixed md:absolute bottom-0 md:bottom-[40px] left-0 md:left-[calc(45%+16px)] lg:left-[calc(30%+22px)] z-40 w-full md:w-[320px] rounded-[12px]"
      >
        <BusinessCard
          SelectedCard={selectedCard}
          setActiveCardId={setActiveCardId}
          setSelectedCard={setSelectedCard}
        />
      </div>

      {/* Button to toggle map visibility on small screens */}
      {!isMapVisible && !drobdownIsOpen && (
        <button
          className={`md:hidden absolute z-30 bottom-[24px] left-[50%] translate-x-[-50%] bg-customPrimaryDark text-customSecondary font-semibold px-[16px] py-[6px] rounded-[4px] shadow-lg`}
          onClick={() => {
            setIsMapVisible(!isMapVisible);
          }}
        >
          Show Map
        </button>
      )}
    </div>
  );
};

export default ResultsPanel;
