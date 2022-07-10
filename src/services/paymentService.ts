import * as utils from "../utils/utils.js"
import * as businessRepository from "../repositories/businessRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"

export async function makePurchaseService(cardId: number, businessId: number, password: string, amount: number) {
  const card = await utils.findCardById(cardId);
  await utils.validateCardExpirationDate(card);
  await utils.validateActiveCard(card);
  await validateCardIsLocked(card);
  await utils.validatePassword(card, password);
  const business = await validateBusiness(businessId);
  await validateBusinessAndCardType(business, card);
  await validateCardBalance(cardId, amount);

  await paymentRepository.insert({ cardId, businessId, amount });
};

async function validateCardIsLocked(card: any) {
  if (card.isBlocked) throw { statusCode: 401, message: "Card is Blocked" };
};

async function validateBusiness(businessId: number) {
  const business = await businessRepository.findById(businessId);
  if (!business) throw { statusCode: 404, message: "Business Not Found" };
  return business;
};

async function validateBusinessAndCardType(business: any, card: any) {
  if (business.type !== card.type) throw { statusCode: 401, message: "Business Type Invalid" };
};

async function validateCardBalance(cardId: any, amount: number) {
  const balance = await utils.calculateCardBalance(cardId);

  if (amount > balance) throw { statusCode: 401, message: "Insufficient Balance" };
};