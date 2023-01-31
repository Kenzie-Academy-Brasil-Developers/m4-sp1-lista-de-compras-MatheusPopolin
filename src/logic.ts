import { database } from "./database";
import { Request, Response } from "express";
import { DataRequiredKeys, ListRequiredKeys } from "./interfaces";

let listId = 1;

export const createNewList = (
  request: Request,
  response: Response
): Response => {
  const requiredListKeys: ListRequiredKeys[] = ["listName", "data"];

  const requestListKeys = Object.keys(request.body);

  const hasAllListKeys: boolean = requiredListKeys.every((requiredKey) =>
    requestListKeys.includes(requiredKey)
  );

  if (!hasAllListKeys) {
    return response
      .status(400)
      .json({ message: `Required keys are: ${requiredListKeys}` });
  }

  if (requestListKeys.length > 2) {
    return response
      .status(400)
      .json({ message: `Required keys are: ${requiredListKeys}` });
  }

  if (typeof request.body.listName !== "string") {
    return response
      .status(400)
      .json({ message: "The list name need to be a string" });
  }

  request.body.data.forEach((item: any, index: number) => {
    const requiredDataKeys: DataRequiredKeys[] = ["name", "quantity"];
    const requestDataKeys = Object.keys(item);

    const hasAllDataKeys: boolean = requiredDataKeys.every((requiredKey) =>
      requestDataKeys.includes(requiredKey)
    );

    if (requestDataKeys.length > 2) {
      return response.status(400).json({
        message: `Required keys data's object are: ${requiredDataKeys}`,
      });
    }

    if (!hasAllDataKeys) {
      return response.status(400).json({
        message: `Required keys data's object are: ${requiredDataKeys}`,
      });
    }

    if (
      request.body.data[index].name &&
      typeof request.body.data[index].name !== "string"
    ) {
      return response
        .status(400)
        .json({ message: `The item name need to be a string` });
    }

    if (
      request.body.data[index].quantity &&
      typeof request.body.data[index].quantity !== "string"
    ) {
      return response
        .status(400)
        .json({ message: `The item quantity need to be a string` });
    }
  });

  const newList = { ...request.body, id: listId };
  database.push(newList);
  listId++;
  return response.status(201).json(newList);
};

export const readAllLists = (
  request: Request,
  response: Response
): Response => {
  return response.status(200).json(database);
};

export const readOneList = (request: Request, response: Response): Response => {
  return response.status(200).json(database[request.indexOfList]);
};

export const updateListItem = (
  request: Request,
  response: Response
): Response => {
  const indexOfList = request.indexOfList;
  const indexOfItem = request.indexOfItem;

  const requiredDataKeys: DataRequiredKeys[] = ["name", "quantity"];
  const requestDataKeys = Object.keys(request.body);

  const hasAllDataKeys: boolean = requiredDataKeys.every((requiredKey) =>
    requestDataKeys.includes(requiredKey)
  );

  if (requestDataKeys.length > 2) {
    return response.status(400).json({
      message: `Updatable fields are: ${requiredDataKeys}`,
    });
  }

  const hasSomeDataKeys: boolean = requiredDataKeys.some((requiredKey) =>
    requestDataKeys.includes(requiredKey)
  );

  if (!hasSomeDataKeys) {
    return response.status(400).json({
      message: `Updatable fields are: ${requiredDataKeys}`,
    });
  }

  if (requestDataKeys.length > 1 && !hasAllDataKeys) {
    return response.status(400).json({
      message: `Updatable fields are: ${requiredDataKeys}`,
    });
  }

  if (request.body.name && typeof request.body.name !== "string") {
    return response
      .status(400)
      .json({ message: `The item name need to be a string` });
  }

  if (request.body.quantity && typeof request.body.quantity !== "string") {
    return response
      .status(400)
      .json({ message: `The item quantity need to be a string` });
  }

  database[indexOfList].data[indexOfItem] = {
    ...database[indexOfList].data[indexOfItem],
    ...request.body,
  };

  return response.status(200).json(database[indexOfList].data[indexOfItem]); 
};

export const deleteListItem = (
  request: Request,
  response: Response
): Response => {
  const indexOfList = request.indexOfList;

  const indexOfItem = request.indexOfItem;

  database[indexOfList].data.splice(indexOfItem, 1);

  return response.status(204).send();
};

export const deleteList = (request: Request, response: Response): Response => {
  const indexOfList = request.indexOfList;

  database.splice(indexOfList, 1);

  return response.status(204).json();
};
