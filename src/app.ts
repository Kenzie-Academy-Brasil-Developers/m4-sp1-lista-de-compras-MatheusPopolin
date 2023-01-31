import express, { Application, json} from "express";
import { createNewList, deleteList, deleteListItem, readAllLists, readOneList, updateListItem } from "./logic";
import { ensureIdExist, ensureItemNameExist } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/purchaseList", createNewList);

app.get("/purchaseList", readAllLists);

app.get("/purchaseList/:id", ensureIdExist, readOneList);

app.patch("/purchaseList/:id/:itemName", ensureIdExist, ensureItemNameExist, updateListItem);

app.delete("/purchaseList/:id/:itemName", ensureIdExist, ensureItemNameExist, deleteListItem);

app.delete("/purchaseList/:id", ensureIdExist, deleteList);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
