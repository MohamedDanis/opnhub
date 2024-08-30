"use client"
import { useState } from "react";
import { AutoComplete,type Option } from "@/components/AutoComplete";
const PROGRAMMING_LANGUAGES = [
    {
      value: "javascript",
      label: "JavaScript",
    },
    {
      value: "python",
      label: "Python",
    },
    {
      value: "java",
      label: "Java",
    },
    {
      value: "csharp",
      label: "C#",
    },
    {
      value: "c",
      label: "C",
    },
    {
      value: "cpp",
      label: "C++",
    },
    {
      value: "ruby",
      label: "Ruby",
    },
    {
      value: "go",
      label: "Go",
    },
    {
      value: "swift",
      label: "Swift",
    },
    {
      value: "kotlin",
      label: "Kotlin",
    },
    {
      value: "php",
      label: "PHP",
    },
    {
      value: "typescript",
      label: "TypeScript",
    },
    {
      value: "rust",
      label: "Rust",
    },
    {
      value: "scala",
      label: "Scala",
    },
    {
      value: "perl",
      label: "Perl",
    },
    {
      value: "haskell",
      label: "Haskell",
    },
    {
      value: "elixir",
      label: "Elixir",
    },
    {
      value: "dart",
      label: "Dart",
    },
    {
      value: "r",
      label: "R",
    },
    {
      value: "objective-c",
      label: "Objective-C",
    },
    {
      value: "shell",
      label: "Shell",
    },
    {
      value: "lua",
      label: "Lua",
    },
    {
      value: "clojure",
      label: "Clojure",
    },
    {
      value: "fsharp",
      label: "F#",
    },
    {
      value: "erlang",
      label: "Erlang",
    },
    {
      value: "vbnet",
      label: "VB.NET",
    },
    {
      value: "matlab",
      label: "MATLAB",
    },
    {
      value: "julia",
      label: "Julia",
    },
    {
      value: "groovy",
      label: "Groovy",
    },
    {
      value: "assembly",
      label: "Assembly",
    },
  ];
const Page = () => {
    const [value, setValue] = useState<Option>()
  const [isLoading, setLoading] = useState(false)
  const [isDisabled, setDisbled] = useState(false)
  return (
    <div>
         <AutoComplete
          options={PROGRAMMING_LANGUAGES}
          emptyMessage="No results."
          placeholder="Type your language"
          isLoading={isLoading}
          onValueChange={setValue}
          value={value}
          />
    </div>
  )
}

export default Page