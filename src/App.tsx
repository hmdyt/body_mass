import React, { useEffect, useState } from "react";
import BodyMassInput, { BodyMassInputValue } from "./components/BodyMassInput";

import { Timestamp } from "firebase/firestore";
import BodyMassModel, * as BodyMass from "./model/BodyMass";

const App: React.FC = () => {
  const [bodyMassInpputValue, setBodyMassInputValue] =
    useState<BodyMassInputValue>("");
  const [bodyMasses, setBodyMasses] = useState<BodyMassModel[]>([]);

  useEffect(() => {
    void (async () => {
      const bodyMassesResponse = await BodyMass.all();
      setBodyMasses(bodyMassesResponse);
    })();
  }, []);

  const handleClick = (): void => {
    const isNumber = (n: any): boolean => !isNaN(n);
    if (!isNumber(bodyMassInpputValue) || bodyMassInpputValue === "") {
      alert(`invalid input ${bodyMassInpputValue}`);
    } else {
      const newBodyMass: BodyMassModel = {
        created: Timestamp.fromDate(new Date()),
        mass: parseFloat(bodyMassInpputValue),
      };
      setBodyMassInputValue("");
      BodyMass.add(newBodyMass.mass);
      setBodyMasses([...bodyMasses, newBodyMass]);
    }
  };

  return (
    <div className="App">
      <BodyMassInput
        value={bodyMassInpputValue}
        handleChange={setBodyMassInputValue}
        hancleClick={handleClick}
      />
      {bodyMasses.map((bodyMass) => (
        <>
          <br />
          {bodyMass.created.toDate().toLocaleString()} {bodyMass.mass}
        </>
      ))}
    </div>
  );
};

export default App;
