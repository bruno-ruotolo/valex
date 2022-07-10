import bcrypt from "bcrypt";

import * as cardRepository from "../repositories/cardRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"

export async function findCardById(cardId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) throw { statusCode: 404, message: "Card Not Found" };
  return card;
};

export function generateTodayDate() {
  const today = new Date();
  const yy = parseInt(today.getFullYear().toString().slice(2)) + 5;
  const month = today.getMonth() + 1;
  const mm = month < 10 ? ("0" + month.toString()) : month;
  const expirationDate = `${mm}/${yy}`;
  return expirationDate;
};

export async function validateCardExpirationDate(card: any) {
  const currentDate = generateTodayDate();
  const currentYear = parseInt(currentDate.slice(3));
  const expirationYear = parseInt(card.expirationDate.slice(3));
  const currentMonth = parseInt(currentDate.slice(0, 2));
  const expirationMonth = parseInt(card.expirationDate.slice(0, 2));

  if (currentYear >= expirationYear && currentMonth > expirationMonth) {
    throw { statusCode: 401, message: "Expired Card" };
  };
};

export async function validateActiveCard(card: any) {
  if (!card.password) throw { statusCode: 401, message: "Card Inactive" };
};

export async function validatePassword(card: any, password: string) {
  if (!bcrypt.compareSync(password, card.password)) {
    throw { statusCode: 401, message: "Invalid Password" };
  };
};

export async function calculateCardBalance(cardId: number) {
  const { rechargeSum } = await rechargeRepository.sumByCardId(cardId);
  const { paymentSum } = await paymentRepository.sumByCardId(cardId);

  const balance = rechargeSum - paymentSum;
  return balance;
};