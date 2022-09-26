import db from "../Firebase";
import { Timestamp, collection, addDoc, getDocs } from "firebase/firestore";

const tableName = "bodyMassModelTest02";
const bodyMassollection = collection(db, tableName);

interface BodyMassModel {
  created: Timestamp;
  mass: number;
}

const add = (mass: number): BodyMassModel => {
  const newBodyMass = {
    created: Timestamp.fromDate(new Date()),
    mass,
  };
  void addDoc(bodyMassollection, newBodyMass);
  return newBodyMass;
};

const all = async (): Promise<BodyMassModel[]> => {
  const queryShapShot = await getDocs(bodyMassollection);
  const bodyMasses: BodyMassModel[] = queryShapShot.docs.map((doc) => {
    const d = doc.data();
    return {
      created: d.created,
      mass: d.mass,
    };
  });
  return bodyMasses;
};

export default BodyMassModel;
export { add, all };
