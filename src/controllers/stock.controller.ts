import { Request, Response } from 'express';

interface Stock {
  id: number;
  name: string;
  price: number;
  ticker: string;
}

const stocks: Stock[] = [
  { id: 1, name: 'Apple Inc.', price: 150, ticker: 'AAPL' },
  { id: 2, name: 'Microsoft Corp.', price: 250, ticker: 'MSFT' },
  { id: 3, name: 'Amazon.com Inc.', price: 3300, ticker: 'AMZN' },
];

//Controller Methods

/**
 *  @description Get all stocks
 * @route GET /stocks
 */

export const getAll = (req: Request, res: Response): void => {
  res.status(200).json(stocks);
};

/**
 *  @description Get stock by ID
 * @route GET /stocks/:id
 */

export const getById = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const stock = stocks.find((s) => s.id === id);

  if (stock) {
    res.status(200).json(stock);
  } else {
    res.status(404).json({ message: 'Stock not found' });
  }
};

/**
 *  @description Create a new stock
 * @route POST /api/stocks
 */

export const add = (req: Request, res: Response): void => {
  const { ticker, name, price } = req.body;

  if (!ticker || !name || !price) {
    res.status(400).json({ message: 'Invalid stock data' });
    return;
  }

  const newStock: Stock = {
    id: stocks.length > 0 ? Math.max(...stocks.map((s) => s.id)) + 1 : 1,
    ticker,
    name,
    price,
  };

  stocks.push(newStock);
  res.status(201).json(newStock);
};

/**
 *  @description Update an existing stock
 * @route PUT /stocks/:id
 */

export const update = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const updatedStock = req.body as Stock;
  const stockIndex = stocks.findIndex((s) => s.id === id);

  if (stockIndex !== -1) {
    stocks[stockIndex] = { ...stocks[stockIndex], ...updatedStock, id };
    res.status(200).json(stocks[stockIndex]);
  } else {
    res.status(404).json({ message: 'Stock not found' });
  }
};

/**  @description Delete a stock
 * @route DELETE /stocks/:id
 */

export const remove = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const stockIndex = stocks.findIndex((s) => s.id === id);
  if (stockIndex !== -1) {
    stocks.splice(stockIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Stock not found' });
  }
};
