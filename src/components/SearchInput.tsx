"use client";
import React, { useState, useEffect } from "react";
import { AutoComplete, type Option } from "@/components/AutoComplete";
import { PROGRAMMING_LANGUAGES } from "@/utils/constants";
import { Button } from "./ui/button";
import { ArrowRightIcon, LoaderCircleIcon, XIcon, ArrowUpIcon } from "lucide-react";
import RepoCard from "./RepoCard";
import Lenis from "./Lenis";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type Repo = {
	id: number;
	name: string;
	full_name: string;
	description: string | null;
	html_url: string;
	language: string;
	stargazers_count: number;
	forks_count: number;
	topics: string[];
};

const SearchInput = () => {
	const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [isDisabled, setDisbled] = useState(false);
	const [topics, setTopics] = useState<any>([]);
	const [repos, setRepos] = useState<Repo[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [showScrollButton, setShowScrollButton] = useState(false); 

	const handleLanguagesChange = (newSelectedLanguages: Option[]) => {
		setSelectedLanguages(newSelectedLanguages);
	};

	const handleRemoveLanguage = (value: string) => {
		setSelectedLanguages(
			selectedLanguages.filter((lang) => lang.value !== value),
		);
	};

	async function searchRepositories(language: string) {
		try {
			const query =
				"q=" +
				encodeURIComponent(
					`template:false archived:false fork:false stars:100..500 forks:>=3 is:public topics:>=3 topic:hacktoberfest license:0bsd license:mit license:apache-2.0 license:gpl license:MPL-2.0 license:Unlicense license:AGPL-3.0 license:WTFPL license:CC language:${language}`,
				);
			const response = await fetch(
				`https://api.github.com/search/repositories?${query}&per_page=110`,
			);
			const data = await response.json();
			return data.items || [];
		} catch (error) {
			console.error("Error fetching repositories:", error);
			return [];
		}
	}

	async function searchRepositoriesCombined(languages: Option[]) {
		const results: Repo[] = [];
		for (const language of languages) {
			const repos = await searchRepositories(language.value);
			results.push(...repos);
		}
		return results;
	}

	async function handleSubmit() {
		if (selectedLanguages.length === 0) return;
		setLoading(true);
		setDisbled(true);
		setError(null);
		setRepos([]);

		try {
			const combinedRepos = await searchRepositoriesCombined(selectedLanguages);
			if (combinedRepos.length > 0) {
				// Sort combined results by stars
				const sortedRepos = combinedRepos.sort(
					(a, b) => b.stargazers_count - a.stargazers_count,
				);
				setRepos(sortedRepos);
			} else {
				setError("No repositories found matching the criteria.");
			}
		} catch (error) {
			console.error("Error searching repositories:", error);
			setError(
				"An error occurred while fetching repositories. Please try again later.",
			);
		} finally {
			setLoading(false);
			setDisbled(false);
		}
	}

	const handleSort = (value: string) => {
		if (value === "Fork") {
			const sortedByForks = [...repos].sort((a, b) => b.forks_count - a.forks_count);
			setRepos(sortedByForks);
		} else if (value === "Stars") {
			const sortedByStars = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
			setRepos(sortedByStars);
		}
	};

	// Scroll-to-top logic
	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const repoThreshold = document.getElementById("repo-list")?.offsetTop ?? 0;
			const hasScrolledPastThreshold = scrollY > repoThreshold;

			if (hasScrolledPastThreshold) {
				setShowScrollButton(true);
			} else {
				setShowScrollButton(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [repos]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<section className="flex gap-4 flex-col items-center px-6">
			<div className="space-y-6">
				<div className="flex gap-4">
					<AutoComplete
						options={PROGRAMMING_LANGUAGES.map(({ value, label }) => ({
							value,
							label,
						}))}
						emptyMessage="No results."
						placeholder="Search for a language..."
						isLoading={isLoading}
						selectedValues={selectedLanguages}
						onValueChange={handleLanguagesChange}
						className="w-full"
					/>
					<Button
						variant={isLoading ? "default" : "expandIcon"}
						Icon={ArrowRightIcon}
						iconPlacement="right"
						onClick={handleSubmit}
						disabled={isLoading || selectedLanguages.length === 0}
						className="shrink-0">
						{isLoading ? (
							<LoaderCircleIcon className="animate-spin" />
						) : (
							"Search"
						)}
					</Button>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{selectedLanguages.map((lang) => (
						<Button
							key={lang.value}
							variant="outline"
							size="sm"
							className="flex items-center justify-between border-gray-900 hover:bg-gray-50 dark:border-gray-100 dark:hover:bg-gray-900"
							onClick={() => handleRemoveLanguage(lang.value)}>
							{lang.label}
							<XIcon className="ml-2 h-4 w-4 text-gray-500 dark:text-gray-300" />
						</Button>
					))}
				</div>
			</div>
			{repos.length > 0 && (
				<div id="repo-list" className="self-end w-fit">
					<Select onValueChange={handleSort}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Fork">Fork</SelectItem>
							<SelectItem value="Stars">Stars</SelectItem>
						</SelectContent>
					</Select>
				</div>
			)}
			{error && <div className="text-red-500 mt-4">{error}</div>}
			<div className=" mt-10 grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3  gap-4">
				{repos.map((item: Repo, index: number) => {
					return <RepoCard key={index} data={item} />;
				})}
			</div>

			{/* Scroll to top button */}
			{showScrollButton && (
				<Button
					className="fixed bottom-5 right-5 p-3 rounded-full bg-primary text-white shadow-lg"
					onClick={scrollToTop}>
					<ArrowUpIcon className="w-5 h-5" />
				</Button>
			)}
		</section>
	);
};

export default SearchInput;
