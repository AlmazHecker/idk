import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange, PropsRangeRequired } from "react-day-picker";
import { Button } from "./button";

import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../lib/utils";

type DateRangePickerProps = Omit<
  PropsRangeRequired,
  "mode" | "required" | "selected"
> & {
  value?: DateRange;
  onChange?: (date: DateRange | undefined) => void;
  placeholder?: string;
  buttonClassName?: string;
  calendarClassName?: string;
  numberOfMonths?: number;
  disabled?: boolean;
  dateFormat?: string;
  label?: string;
  align?: "start" | "center" | "end";
  defaultOpen?: boolean;
  allowPastDates?: boolean;
  maxDate?: Date;
  minDate?: Date;
  className?: string;
};

export function DateRangePicker({
  className,
  value,
  placeholder = "Pick a date",
  buttonClassName,
  calendarClassName,
  numberOfMonths = 2,
  disabled = false,
  dateFormat = "LLL dd, y",
  label,
  align = "start",
  defaultOpen = false,
  allowPastDates = true,
  maxDate,
  minDate,
  onChange,
  ...props
}: DateRangePickerProps) {
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "";
    if (!range.to) return format(range.from, dateFormat);
    return `${format(range.from, dateFormat)} - ${format(range.to, dateFormat)}`;
  };

  const today = new Date();
  const disabledDays = React.useMemo(() => {
    const disabled = [];
    if (!allowPastDates) {
      disabled.push({ before: today });
    }
    if (maxDate) {
      disabled.push({ after: maxDate });
    }
    if (minDate) {
      disabled.push({ before: minDate });
    }
    return disabled;
  }, [allowPastDates, maxDate, minDate]);

  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <Popover defaultOpen={defaultOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              buttonClassName
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? formatDateRange(value) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-auto p-0", calendarClassName)}
          align={align}
        >
          <Calendar
            {...props}
            autoFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={numberOfMonths}
            disabled={disabledDays}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
