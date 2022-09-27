import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";
import BodyMassInput, { BodyMassInputValue } from "./components/BodyMassInput";
import BodyMassPlot from "./components/BodyMassPlot";

import BodyMassModel, * as BodyMass from "./model/BodyMass";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";
import BodyMassTable from "./components/BodyMassTable";
import { GridSelectionModel } from "@mui/x-data-grid";

const App: React.FC = () => {
  const [user, _loading, _error] = useAuthState(auth);

  const [bodyMassInpputValue, setBodyMassInputValue] =
    useState<BodyMassInputValue>("");
  const [bodyMassList, setBodyMassList] = useState<BodyMassModel[]>([]);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const fetchData = async (): Promise<void> => {
    const bodyMassesResponse = await BodyMass.allByUserID(user?.uid);
    setBodyMassList(bodyMassesResponse);
  };

  useEffect(() => {
    // login処理が終わり次第データをとりにいく
    // userの中身が変更されたら発火 (null -> User)
    if (user?.uid !== undefined) {
      void fetchData();
    }
  }, [user]);

  const handleClickBodyMassInput = (): void => {
    const isNumber = (n: any): boolean => !isNaN(n);
    if (!isNumber(bodyMassInpputValue) || bodyMassInpputValue === "") {
      alert(`invalid input ${bodyMassInpputValue}`);
    } else {
      void (async () => {
        const newBodyMass = await BodyMass.add(
          user?.uid,
          parseFloat(bodyMassInpputValue)
        );
        setBodyMassList([...bodyMassList, newBodyMass]);
        setBodyMassInputValue("");
      })();
    }
  };

  const onSelectionModelChange = (selectionModel: GridSelectionModel): void => {
    setSelectionModel(selectionModel);
  };

  const onDeleteButtonClick = (): void => {
    if (confirm(`delete selected ${selectionModel.length} rows`)) {
      const selectionModelSet = new Set(selectionModel);
      const deletingBodyMassList = bodyMassList.filter((bodyMass) =>
        selectionModelSet.has(bodyMass.id)
      );
      const remainingBodyMassList = bodyMassList.filter(
        (bodyMass) => !selectionModelSet.has(bodyMass.id)
      );
      void BodyMass.delelteMultiple(deletingBodyMassList);
      setBodyMassList(remainingBodyMassList);
    }
  };

  return (
    <div className="App" key={"App"}>
      <Login isLogin={user?.uid !== undefined} />
      {user?.uid !== undefined ? (
        <>
          <UserInfo user={user} />
          <BodyMassPlot bodyMassList={bodyMassList} />
          <BodyMassInput
            value={bodyMassInpputValue}
            handleChange={setBodyMassInputValue}
            hancleClick={handleClickBodyMassInput}
          />
          <BodyMassTable
            bodyMassList={bodyMassList}
            selectionModel={selectionModel}
            onSelectionModelChange={onSelectionModelChange}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
