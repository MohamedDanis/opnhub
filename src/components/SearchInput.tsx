"use client";
import React, { useState } from "react";
import { AutoComplete, type Option } from "@/components/AutoComplete";
import { PROGRAMMING_LANGUAGES } from "@/utils/constants";
import { Button } from "./ui/button";
import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react";
import RepoCard from "./RepoCard";
import Lenis from "./Lenis";

const SearchInput = () => {
  const [value, setValue] = useState<Option>();
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisbled] = useState(false);
  const [topics, setTopics] = useState<any>([]);
  const [repo, setRepo] = useState<any>();
  async function handleSubmit() {
    setLoading(true);
    try {
      const query =
        "q=" +
        encodeURIComponent(
          `template:false archived:false fork:false stars:100..500 forks:>=3 is:public topics:>=3 license:0bsd license:mit license:apache-2.0 license:gpl license:MPL-2.0 license:Unlicense license:AGPL-3.0 license:WTFPL license:CC language:${value?.value}`
        );
      const data = await fetch(
        `https://api.github.com/search/repositories?${query}&per_page=110`
      );
      const repos = await data.json();
      setRepo(repos);
    } catch (error) {
      console.log(error);
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
          isLoading={isLoading}
          onValueChange={setValue}
          value={value}
        />
        <Button
          variant={isLoading ? "default" : "expandIcon"}
          Icon={ArrowRightIcon}
          iconPlacement="right"
          onClick={handleSubmit}
        >
          {isLoading ? <LoaderCircleIcon className="animate-spin" /> : "Search"}
        </Button>
      </div>
      <div className=" mt-10 grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3  gap-4">
          {repo?.items?.map((item: any, index: any) => {
            return <RepoCard key={index} data={item} />;
          })}
      </div>
    </section>
  );
};

export default SearchInput;
