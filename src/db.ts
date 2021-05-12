import Dexie from "dexie";
import ICounterModel from "./counter/CounterModel";

class MoodyDb extends Dexie {
  counters: Dexie.Table<ICounterModel>;

  constructor() {
    super("moody_db");

    		this.version(1).stores({
      counters: "++id,value",
    });

    this.counters = this.table("counters");
  }
}

const db = new MoodyDb();

export default db;
