import React, { useEffect, useState } from "react";
// import BodyMassModel from "./model/BodyMass";
import BodyMassModel, * as BodyMass from "./model/BodyMass";

const App: React.FC = () => {
  const [bodyMasses, setBodyMasses] = useState<BodyMassModel[]>([]);

  useEffect(() => {
    void (async () => {
      const bodyMassesResponse = await BodyMass.all();
      setBodyMasses(bodyMassesResponse);
    })();
  }, []);

  return (
    <div className="App">
      {bodyMasses.map((bodyMass) => (
        <>
          {bodyMass.created.toDate().toLocaleString()} {bodyMass.mass}
          <br />
        </>
      ))}
    </div>
  );
};

export default App;
