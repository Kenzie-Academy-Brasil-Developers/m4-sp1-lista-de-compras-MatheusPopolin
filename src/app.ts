import express, { Application, json} from "express";
import { createNewList, deleteList, deleteListItem, readAllLists, readOneList, updateListItem } from "./logic";
import { validateId, validateItemName } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/purchaseList", createNewList);

app.get("/purchaseList", readAllLists);

app.get("/purchaseList/:id", validateId, readOneList);

app.patch("/purchaseList/:id/:itemName", validateId, validateItemName, updateListItem);

app.delete("/purchaseList/:id/:itemName", validateId, validateItemName, deleteListItem);

app.delete("/purchaseList/:id", validateId, deleteList);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
