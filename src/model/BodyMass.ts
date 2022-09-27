import { db } from "../Firebase";
import {
  Timestamp,
  collection,
  doc,
  deleteDoc,
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
  id: string;
  created: Timestamp;
  mass: number;
  userID: UserID;
}

const add = async (userID: UserID, mass: number): Promise<BodyMassModel> => {
  const newBodyMass = {
    created: Timestamp.fromDate(new Date()),
    mass,
    userID,
  };
  const docRef = await addDoc(bodyMassollection, newBodyMass);
  return { ...newBodyMass, id: docRef.id };
};

const allByUserID = async (userID: UserID): Promise<BodyMassModel[]> => {
  const q = query(
    bodyMassollection,
    where("userID", "==", userID),
    orderBy("created")
  );
  const queryShapShot = await getDocs(q);
  const bodyMasses: BodyMassModel[] = queryShapShot.docs.map((doc) => {
    return {
      id: doc.id,
      created: doc.data().created,
      mass: doc.data().mass,
      userID,
    };
  });
  return bodyMasses;
};

const del = async (bodyMass: BodyMassModel): Promise<void> => {
  await deleteDoc(doc(db, tableName, bodyMass.id));
};

const delelteMultiple = async (
  bodyMassList: BodyMassModel[]
): Promise<void> => {
  bodyMassList.map(async (bodyMass) => await del(bodyMass));
};

export default BodyMassModel;
export { add, allByUserID, delelteMultiple };
