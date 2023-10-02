import PropTypes from "prop-types";
import "./currencyInput.css";
import { REGEX } from "../constants/common";
import { useState } from "react";
import { TYPE_FORM_INPUT } from "../constants/enum";

interface CurrentInputProps {
  amount: number;
  currency: string;
  currencies: any[];
  onAmountChange: Function;
  onCurrencyChange: Function;
}

interface IClassInput {
  nameClass: string;
  typeFormInput: TYPE_FORM_INPUT | "";
}

function CurrencyInput(props: CurrentInputProps) {
  const [classInput, setClassInput] = useState<IClassInput>({
    nameClass: "",
    typeFormInput: "",
  });
  const handleAmountChange = (value: string) => {
    const onlyDigits = value.replace(REGEX.ONLY_NUMBER, "");
    props.onAmountChange(onlyDigits);
  };
  const handleCurrencyChange = (value: string) => {
    const onlyDigits = value.replace(REGEX.ONLY_NUMBER, "");
    props.onCurrencyChange(onlyDigits);
  };

  return (
    <div className={`group ${classInput.nameClass}`}>
      <input
        type="text"
        value={props.amount || ""}
        onChange={(ev) => handleAmountChange(ev.target.value)}
        onMouseEnter={() =>
          setClassInput({
            nameClass: "group-active-hover",
            typeFormInput: TYPE_FORM_INPUT.AMOUNT,
          })
        }
        onMouseLeave={() =>
          setClassInput({
            nameClass: "",
            typeFormInput: "",
          })
        }
        onFocus={() =>
          setClassInput({
            nameClass: "group-active",
            typeFormInput: TYPE_FORM_INPUT.AMOUNT,
          })
        }
        onBlur={() =>
          setClassInput({
            nameClass: "",
            typeFormInput: "",
          })
        }
      />
      <select
        value={props.currency}
        onChange={(ev) => handleCurrencyChange(ev.target.value)}
      >
        {props.currencies.map((currency) => (
          <option value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
}

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
