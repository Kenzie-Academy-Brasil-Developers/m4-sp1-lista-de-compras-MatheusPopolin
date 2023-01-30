import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      indexOfList: number;
      indexOfItem: number;
    }
  }
}
