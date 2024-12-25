import * as React from "react";
import { useDebounce } from "use-debounce";

import { Command, CommandInput, CommandItem, CommandList } from "@ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@shared/lib/utils";
import useSWR from "swr";
import { Subject } from "@prisma/client";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Button } from "@ui/button";
import fetcher from "@shared/api/fetch";
import { useToggle } from "@shared/hooks/useToggle";

interface SearchProps {
  value: Subject;
  onChange: (value: Subject) => void;
}

export function SelectSubject({ onChange, value }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const popover = useToggle();

  const handleSelectResult = (subj: Subject) => {
    onChange(subj);
    setSearchQuery("");
    popover.toggle(false);
  };

  const onOpenChange = (isOpen: boolean) => {
    popover.toggle(isOpen);
    setSearchQuery("");
  };

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const enabled = !!debouncedSearchQuery;

  const {
    data,
    isLoading: isLoadingOrig,
    error,
  } = useSWR<{ content: Subject[] }>(
    popover.isOpen ? `/api/subjects?search=${debouncedSearchQuery}` : null,
    fetcher,
  );

  const isLoading = enabled && isLoadingOrig;

  return (
    <Popover modal open={popover.isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div>
          <label className="flex mb-0.5 text-sm">Subject</label>
          <Button
            variant="outline"
            type="button"
            role="combobox"
            className="w-full justify-between px-3"
          >
            {value ? value?.title : "Select subject..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput
            value={searchQuery}
            onValueChange={setSearchQuery}
            placeholder="Search for subject"
          />

          <CommandList>
            {/* TODO: these should have proper loading aria */}
            {isLoading && <div className="p-4 text-sm">Searching...</div>}
            {!error && !isLoading && !data?.content.length && (
              <div className="p-4 text-sm">Not found</div>
            )}
            {!!error && <div className="p-4 text-sm">Something went wrong</div>}

            {data?.content.map((item) => {
              return (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelectResult(item)}
                  value={item.title}
                >
                  <Check
                    className={cn(
                      value?.id === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.title}
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
