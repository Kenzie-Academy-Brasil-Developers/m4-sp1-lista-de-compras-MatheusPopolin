import { Request, Response, NextFunction } from "express";
import { database } from "./database";

export const ensureIdExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id = +request.params.id;

  const indexOfList = database.findIndex((list) => list.id === id);

  if (indexOfList === -1) {
    return response
      .status(404)
      .json({ message: `List with id ${id} does not exist` });
  }

  request.indexOfList = indexOfList;

  next();
};

export const ensureItemNameExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const indexOfList = request.indexOfList;

  const list = database[indexOfList];

  const { itemName } = request.params;

  const indexOfItem = list.data.findIndex((item) => item.name === itemName);

  if (indexOfItem === -1) {
    return response
      .status(404)
      .json({ message: `Item with name ${itemName} does not exist` });
  }

  request.indexOfItem = indexOfItem;

  next();
};
