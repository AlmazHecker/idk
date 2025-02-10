// react-day-picker doesn't have generic like type for props
// that's why I implemented my own.
"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DateRange,
  DayPicker,
  Mode,
  PropsBase,
  PropsMulti,
  PropsRange,
  PropsSingle,
} from "react-day-picker";

import { cn } from "@shared/lib/utils";
import { buttonVariants } from "@ui/button";

export type DayPickerProps<M extends Mode> = M extends "single"
  ? PropsBase & PropsSingle
  : M extends "multiple"
    ? PropsBase & PropsMulti
    : M extends "range"
      ? PropsBase & PropsRange
      : PropsSingle;

export const Calendar = <T extends Mode>({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: DayPickerProps<T>) => {
  return (
    <DayPicker
      defaultMonth={getDefaultMonth(props.selected)}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        month: "space-y-4",
        months: "flex flex-col sm:flex-row space-y-4 sm:space-y-0 relative",
        month_caption: "flex justify-center pt-1 relative items-center",
        month_grid: "w-full border-collapse space-y-1",
        caption_label: "text-sm font-medium",
        nav: "flex items-center justify-between absolute inset-x-0",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10"
        ),
        weeks: "w-full border-collapse space-y-",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day_button:
          "h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ className, ...props }) => {
          if (props.orientation === "left") {
            return (
              <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
            );
          }
          return (
            <ChevronRight className={cn("h-4 w-4", className)} {...props} />
          );
        },
      }}
      {...(props as DayPickerProps<"single">)}
    />
  );
};
Calendar.displayName = "Calendar";

// go to month with selected date
const getDefaultMonth = (
  value: Date | Date[] | DateRange | undefined
): Date | undefined => {
  if ((value as DateRange)?.from) return (value as DateRange).from;
  if (Array.isArray(value)) return value[0];
  if (value instanceof Date) return value;

  return undefined;
};
