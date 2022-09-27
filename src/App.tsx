import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import BodyMassInput, { BodyMassInputValue } from "./components/BodyMassInput";
import BodyMassPlot from "./components/BodyMassPlot";

import { Timestamp } from "firebase/firestore";
import BodyMassModel, * as BodyMass from "./model/BodyMass";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

const App: React.FC = () => {
  const [user, loading, _error] = useAuthState(auth);

  const [bodyMassInpputValue, setBodyMassInputValue] =
    useState<BodyMassInputValue>("");
  const [bodyMasses, setBodyMasses] = useState<BodyMassModel[]>([]);

  const fetchData = async (): Promise<void> => {
    const bodyMassesResponse = await BodyMass.all(user?.uid);
    setBodyMasses(bodyMassesResponse);
  };

  useEffect(() => {
    // login処理が終わり次第データをとりにいく
    if (user?.uid !== undefined) {
      void fetchData();
    }
  }, [user]);

  const handleClickBodyMassInput = (): void => {
    const isNumber = (n: any): boolean => !isNaN(n);
    if (!isNumber(bodyMassInpputValue) || bodyMassInpputValue === "") {
      alert(`invalid input ${bodyMassInpputValue}`);
    } else {
      const newBodyMass: BodyMassModel = {
        created: Timestamp.fromDate(new Date()),
        mass: parseFloat(bodyMassInpputValue),
        userID: user?.uid,
      };
      setBodyMassInputValue("");
      BodyMass.add(user?.uid, newBodyMass.mass);
      setBodyMasses([...bodyMasses, newBodyMass]);
    }
  };

  return (
    <div className="App">
      <Login isLogin={user?.uid !== undefined} />
      {user?.uid !== undefined ? (
        <>
          <UserInfo user={user} />
          <BodyMassPlot bodyMassList={bodyMasses} />
          <BodyMassInput
            value={bodyMassInpputValue}
            handleChange={setBodyMassInputValue}
            hancleClick={handleClickBodyMassInput}
          />
          {bodyMasses.map((bodyMass) => (
            <>
              <br />
              {bodyMass.created.toDate().toLocaleString()} {bodyMass.mass}
            </>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
