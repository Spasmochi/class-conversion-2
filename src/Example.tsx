import React, {
  FocusEvent,
  useState,
  ReactElement,
  useRef,
  forwardRef
} from "react";
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";

const dateDisplayFormat = "dd/mm/yyy";

const formatDate = (date: Date, _: string, locale: string): string =>
  new Date(date).toLocaleDateString(locale);

export type Range = {
  from: Date | undefined;
  to: Date | undefined;
};

const Input = React.forwardRef((props, ref) => (
  <input className="my-input" ref={ref} type="text" />
));

export type Props = {
  label: string;
  name: string;
  onChange?(event: FocusEvent<HTMLDivElement>): void;
  placeholder: string;
  value: string | null;
};

export const Example = ({ label, name, onChange }: Props): ReactElement => {
  const [range, setRange] = useState<Range>({ from: undefined, to: undefined });
  const toInput = useRef(null);
  const toThing = useRef(null);
  const handleTo = (to: Date): void => {
    setRange((prevState) => ({ ...prevState, to }));
  };
  const handleFrom = (from: Date): void => {
    setRange((prevState) => ({ ...prevState, from }));
  };
  const modifiers = { start: range.from, end: range.to };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <DayPickerInput
        dayPickerProps={{
          selectedDays: [range.from, range],
          fromMonth: new Date(),
          modifiers,
          toMonth: range.to,
          disabledDays: {
            before: new Date(),
            after: range.to
          }
        }}
        format={dateDisplayFormat}
        formatDate={formatDate}
        hideOnDayClick={false}
        inputProps={{
          name
        }}
        onChange={onChange}
        onDayChange={handleFrom}
        placeholder="From"
        value={range.from}
      />
      -
      <DayPickerInput
        component={Input}
        dayPickerProps={{
          selectedDays: [range.to, range],
          fromMonth: new Date(),
          modifiers,
          disabledDays: {
            before: range.from
          }
        }}
        format={dateDisplayFormat}
        formatDate={formatDate}
        hideOnDayClick={false}
        inputProps={{
          name: "to"
        }}
        onChange={onChange}
        onDayChange={handleTo}
        placeholder="To"
        ref={toThing}
        value={range.to}
      />
    </div>
  );
};
