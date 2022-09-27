import { db } from "../Firebase";
import {
  Timestamp,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const tableName = "bodyMass";
const bodyMassollection = collection(db, tableName);

type UserID = string | undefined;

interface BodyMassModel {
  created: Timestamp;
  mass: number;
  userID: UserID;
}

const add = (userID: UserID, mass: number): BodyMassModel => {
  const newBodyMass = {
    created: Timestamp.fromDate(new Date()),
    mass,
    userID,
  };
  void addDoc(bodyMassollection, newBodyMass);
  return newBodyMass;
};

const all = async (userID: UserID): Promise<BodyMassModel[]> => {
  const q = query(
    bodyMassollection,
    where("userID", "==", userID),
    orderBy("created")
  );
  const queryShapShot = await getDocs(q);
  const bodyMasses: BodyMassModel[] = queryShapShot.docs.map((doc) => {
    const d = doc.data();
    return {
      created: d.created,
      mass: d.mass,
      userID,
    };
  });
  return bodyMasses;
};

export default BodyMassModel;
export { add, all };
