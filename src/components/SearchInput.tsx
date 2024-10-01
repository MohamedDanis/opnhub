"use client";
import React, { useState, useEffect } from "react";
import { AutoComplete, type Option } from "@/components/AutoComplete";
import { PROGRAMMING_LANGUAGES } from "@/utils/constants";
import { Button } from "./ui/button";
import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react";
import RepoCard from "./RepoCard";
import Lenis from "./Lenis";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<Option | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [repo, setRepo] = useState<any>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const matchedLanguage = PROGRAMMING_LANGUAGES.find(
      (lang) => lang.label.toLowerCase() === value.toLowerCase()
    );
    if (matchedLanguage) {
      setSelectedValue(matchedLanguage);
      setDisabled(false);
    } else {
      setSelectedValue(null);
      setDisabled(true);
      setRepo(null);
    }
  };

  const handleValueChange = (newValue: Option | null) => {
    setSelectedValue(newValue);
    setInputValue(newValue?.label || "");
    setDisabled(!newValue);
  };

  async function handleSubmit() {
    if (isDisabled || !selectedValue) return;

    setLoading(true);
    try {
      const query = `q=${encodeURIComponent(
        `template:false archived:false fork:false stars:100..500 forks:>=3 is:public topics:>=3 topic:hacktoberfest license:0bsd license:mit license:apache-2.0 license:gpl license:MPL-2.0 license:Unlicense license:AGPL-3.0 license:WTFPL license:CC language:${selectedValue.value}`
      )}`;
      const data = await fetch(
        `https://api.github.com/search/repositories?${query}&per_page=110`
      );
      const repos = await data.json();
      setRepo(repos);
    } catch (error) {
      console.log(error);
      setRepo(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex gap-4 flex-col items-center px-6">
      <div className="flex gap-4">
        <AutoComplete
          options={PROGRAMMING_LANGUAGES}
          emptyMessage="No results."
          placeholder="Type your language"
          spellCheck={false}
          isLoading={isLoading}
          onValueChange={handleValueChange}
          onInputChange={handleInputChange}
          value={selectedValue}
          inputValue={inputValue}
        />
        <Button
          variant={isLoading ? "default" : "expandIcon"}
          Icon={ArrowRightIcon}
          iconPlacement="right"
          onClick={handleSubmit}
          disabled={isDisabled || isLoading}
        >
          {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Search"}
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repo?.items?.map((item: any, index: number) => (
          <RepoCard key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default SearchInput;