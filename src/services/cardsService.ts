import { faker } from '@faker-js/faker';
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as utils from "../utils/utils.js"

export async function createCardsService(
  employeeId: number,
  type: cardRepository.TransactionTypes
) {
  await validadeCardByTypeAndEmployee(type, employeeId);
  const employee = await findEmployee(employeeId);
  const cardholderName = generateCardName(employee.fullName);
  const cardNumber = generateCardNumber();
  const expirationDate = utils.generateExpirationDate();
  const encryptedCVV = generateCardCVV();

  const cardData = {
    employeeId,
    number: cardNumber,
    cardholderName,
    securityCode: encryptedCVV,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: true,
    type
  };

  await cardRepository.insert(cardData);
};

export async function activateCardsService(cardId: number, password: string, securityCode: string) {
  const card: cardRepository.Card = await utils.findCardById(cardId);
  await utils.validateCardExpirationDate(card);
  await validateCardActivation(card);
  await validateCVV(card, securityCode);
  const passwordHash = encryptPassword(password);

  const cardUpdateDate = {
    password: passwordHash,
    isBlocked: false
  };

  await cardRepository.update(cardId, cardUpdateDate);
};

export async function infosCardsService(cardId: number) {
  await utils.findCardById(cardId);
  const recharges = await rechargeRepository.findByCardId(cardId);
  const payments = await paymentRepository.findByCardId(cardId);
  const balance = await utils.calculateCardBalance(cardId);

  const infoData = {
    balance,
    transactions: payments,
    recharges: recharges
  };

  return infoData;
};

export async function blockCardsService(cardId: number, password: string, blockStatus: boolean) {
  const card = await utils.findCardById(cardId);
  await utils.validateCardExpirationDate(card);
  await validateBlockCards(card, blockStatus);
  await utils.validatePassword(card, password);
  await cardRepository.update(cardId, { isBlocked: blockStatus });
};

async function validadeCardByTypeAndEmployee(type: cardRepository.TransactionTypes, employeeId: number) {
  const cardTypeByEmployee = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
  if (cardTypeByEmployee) throw { statusCode: 409, message: "Employee Already Has This Type of Card" };
};

async function findEmployee(employeeId: number) {
  const employee = await employeeRepository.findById(employeeId);
  if (!employee) throw { statusCode: 404, message: "Employee Not Found" };
  return employee;
};

function generateCardName(fullName: string) {
  const fullNameUpper: string = fullName.toUpperCase();
  const middlesNamesArray: string[] = fullNameUpper
    .split(" ")
    .slice(1, -1);

  middlesNamesArray.map((middleNameString: string, index: number) => {
    const middleNameAbbreviate = (middleNameString.length > 3) ? middleNameString.charAt(0) : "";
    middlesNamesArray[index] = middleNameAbbreviate;
  });

  const fullNameSplit = fullNameUpper.split(" ");

  const cardholderName =
    `${fullNameSplit[0]} 
    ${middlesNamesArray.join(" ")} 
    ${fullNameSplit[fullNameSplit.length - 1]}`;

  return cardholderName;
};

function generateCardNumber() {
  const cardNumber = faker.finance.creditCardNumber();
  return cardNumber;
};

function generateCardCVV() {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const cvcNumber = faker.finance.creditCardCVV();
  const encryptedCVV = cryptr.encrypt(cvcNumber);
  return encryptedCVV;
};

async function validateCardActivation(card: cardRepository.Card) {
  if (card.password) throw { statusCode: 401, message: "Card Already Actived" };
};

async function validateCVV(card: cardRepository.Card, securityCode: string) {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const decryptedCVV = cryptr.decrypt(card.securityCode);

  if (securityCode !== decryptedCVV) throw { statusCode: 401, message: "Wrong Security Code" };
};

function encryptPassword(password: string) {
  const passwordHash = bcrypt.hashSync(password, 10);
  return passwordHash;
};

async function validateBlockCards(card: cardRepository.Card, blockStatus: boolean) {
  if (card.isBlocked === blockStatus) throw { statusCode: 401, message: "Card Already Blocked/Unblocked" };
};


