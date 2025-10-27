import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useEffect, useState } from "react";

type Props = {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export default function DatePicker({ date, onChange }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  useEffect(() => {
    onChange(selectedDate);
  }, [selectedDate, onChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          className="w-full justify-start text-left font-base"
        >
          <CalendarIcon />
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Choisir une date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full border-0! p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </PopoverContent>
    </Popover>
  );
}
