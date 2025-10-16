import { useEffect, useRef, useState } from "react";

const OTP_DIGITS_COUNT = 5;

function OtpInput() {
  const [inputArr, setInputArr] = useState<string[]>(
    new Array(OTP_DIGITS_COUNT).fill("")
  );
  const refArr = useRef<HTMLInputElement[]>([]);

  const handleOnChange = (value: string, index: number) => {
    if (isNaN(+value)) {
      return;
    }
    const newArr = [...inputArr];
    newArr[index] = value.trim().slice(-1);
    setInputArr(newArr);
    if (newArr[index].length > 0) {
      refArr.current[index + 1]?.focus();
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) =>{
    if(!e.currentTarget.value && e.key === 'Backspace'){
        refArr.current[index - 1]?.focus();
    }
  }

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  return (
    <div>
      <h1>Validate OTP</h1>
      {inputArr.map((item, index) => (
        <input
          key={index}
          ref={(input) => {
            if (input) {
              refArr.current[index] = input;
            }
          }}
          type="text"
          style={{ height: 40, width: 40, margin: 10, fontSize: 40 }}
          value={inputArr[index]}
          onChange={(e) => handleOnChange(e.target.value, index)}
          onKeyDown={(e)=>handleOnKeyDown(e, index)}
        />
      ))}
    </div>
  );
}

export default OtpInput;
