import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker, labelNext, labelPrevious, useDayPicker, type DayPickerProps } from "react-day-picker";

export type CalendarProps = DayPickerProps & {
  yearRange?: number;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  yearRange = 12,
  numberOfMonths,
  onNextClick,
  onPrevClick,
  ...props // Ensure any extra props like `previousMonth` or `nextMonth` don’t leak to DOM
}: CalendarProps) {
  const [navView, setNavView] = React.useState<"days" | "years">("days");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayYears, setDisplayYears] = React.useState<{
    from: number;
    to: number;
  }>(
    React.useMemo(() => {
      const currentYear = new Date().getFullYear();
      return {
        from: currentYear - Math.floor(yearRange / 2 - 1),
        to: currentYear + Math.ceil(yearRange / 2),
      };
    }, [yearRange])
  );

  const columnsDisplayed = navView === "years" ? 1 : numberOfMonths;

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 ", className)}
      classNames={{
        months: "flex  relative",
        month_caption: "flex w-32 justify-center h-7 mx-10 relative items-center",
        weekdays: "flex flex-row",
        weekday: "text-muted-foreground w-8 font-normal text-[0.8rem]",
        month: "gap-y-4 px-2 overflow-x-hidden w-full",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium truncate",
        button_next: cn(
          buttonVariants({
            variant: "outline",
            className:
              "absolute right-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          })
        ),
        button_previous: cn(
          buttonVariants({
            variant: "outline",
            className:
              "absolute left-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          })
        ),
        nav: "flex items-start",
        month_grid: "mt-4",
        week: "flex w-full mt-2",
        day: "p-0 size-5 md:size-8 text-sm flex-1 flex items-center justify-center has-[button]:hover:!bg-accent rounded-md has-[button]:hover:aria-selected:!bg-primary has-[button]:hover:text-accent-foreground has-[button]:hover:aria-selected:text-primary-foreground",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal transition-none hover:bg-transparent hover:text-inherit aria-selected:opacity-100"
        ),
        range_start: "day-range-start rounded-s-md",
        range_end: "day-range-end rounded-e-md",
        selected:
          "bg-primary text-primary-foreground hover:!bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent hover:aria-selected:!bg-accent rounded-none aria-selected:text-accent-foreground hover:aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
        Nav: ({ className }) => {
          const { nextMonth, previousMonth, goToMonth } = useDayPicker();

          const isPreviousDisabled = !previousMonth;
          const isNextDisabled = !nextMonth;

          const handlePreviousClick = React.useCallback(() => {
            if (!previousMonth) return;
            goToMonth(previousMonth);
            onPrevClick?.(previousMonth); // Only pass down to the function, not to DOM
          }, [previousMonth, goToMonth]);

          const handleNextClick = React.useCallback(() => {
            if (!nextMonth) return;
            goToMonth(nextMonth);
            onNextClick?.(nextMonth); // Only pass down to the function, not to DOM
          }, [goToMonth, nextMonth]);

          return (
            <nav className={cn("flex items-center", className)}>
              <Button
                variant="outline"
                className="absolute left-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                type="button"
                disabled={isPreviousDisabled}
                aria-label={labelPrevious(previousMonth)}
                onClick={handlePreviousClick}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="absolute right-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                type="button"
                disabled={isNextDisabled}
                aria-label={labelNext(nextMonth)}
                onClick={handleNextClick}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          );
        },
        CaptionLabel: ({ children }) => (
          <Button
            className="h-7 w-full truncate text-sm font-medium"
            variant="ghost"
            size="sm"
            onClick={() =>
              setNavView((prev) => (prev === "days" ? "years" : "days"))
            }
          >
            {navView === "days"
              ? children
              : `${displayYears.from} - ${displayYears.to}`}
          </Button>
        ),
        MonthGrid: ({ className, ...gridProps }) => {
          const { goToMonth } = useDayPicker();
          if (navView === "years") {
            return (
              <div className={cn("grid grid-cols-4 gap-y-2", className)}>
                {Array.from({ length: displayYears.to - displayYears.from + 1 }, (_, i) => (
                  <Button
                    key={i}
                    className={cn("h-7 w-full text-sm font-normal text-foreground")}
                    variant="ghost"
                    onClick={() => {
                      setNavView("days");
                      goToMonth(new Date(displayYears.from + i, new Date().getMonth()));
                    }}
                  >
                    {displayYears.from + i}
                  </Button>
                ))}
              </div>
            );
          }
          return <table className={className} {...gridProps} />;
        },
      }}
      numberOfMonths={columnsDisplayed}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
