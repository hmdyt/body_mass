import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

export type BodyMassInputValue = string;
interface BodyMassInputProps {
  value: BodyMassInputValue;
  handleChange: (value: BodyMassInputValue) => void;
  hancleClick: () => void;
}

const BodyMassInput = (props: BodyMassInputProps): JSX.Element => {
  return (
    <>
      <FormControl>
        <OutlinedInput
          value={props.value}
          onChange={(e: any) =>
            props.handleChange(e.target.value as BodyMassInputValue)
          }
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={props.hancleClick}
        >
          send
        </Button>
      </FormControl>
    </>
  );
};

export default BodyMassInput;
