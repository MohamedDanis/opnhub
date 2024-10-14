"use client";
import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, type KeyboardEvent } from "react";

import { Skeleton } from "./ui/skeleton";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  selectedValues?: Option[];
  onValueChange?: (value: Option[]) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  selectedValues = [],
  onValueChange,
  disabled,
  isLoading = false,
  className
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      if (!isOpen) {
        setOpen(true);
      }

      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label.toLowerCase() === input.value.toLowerCase()
        );
        if (optionToSelect) {
          handleSelectOption(optionToSelect);
        }
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, selectedValues]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue("");
  }, []);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      const isAlreadySelected = selectedValues.some(
        (value) => value.value === selectedOption.value
      );
      let newSelectedValues;
      if (isAlreadySelected) {
        newSelectedValues = selectedValues.filter(
          (value) => value.value !== selectedOption.value
        );
      } else {
        newSelectedValues = [...selectedValues, selectedOption];
      }
      onValueChange?.(newSelectedValues);
      setInputValue("");
      inputRef.current?.focus();
    },
    [selectedValues, onValueChange]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown} className={cn(className)}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={isLoading ? undefined : setInputValue}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className="text-base bg-white text-black placeholder:text-gray-500 dark:text-black dark:placeholder:text-gray-400"
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none",
            isOpen ? "block" : "hidden"
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200 dark:ring-gray-600">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.some(
                    (value) => value.value === option.value
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "flex w-full items-center gap-2",
                        !isSelected ? "pl-8" : null,
                        isSelected ? "dark:bg-gray-600 bg-muted dark:text-white" : ""
                      )}
                    >
                      {isSelected ? <Check className="w-4" /> : null}
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading && options.length === 0 ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};

