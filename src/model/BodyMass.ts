import db from "../Firebase";
import {
  Timestamp,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

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
  const q = query(bodyMassollection, orderBy("created"));
  const queryShapShot = await getDocs(q);
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
