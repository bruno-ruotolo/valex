import { faker } from '@faker-js/faker';
import Cryptr from "cryptr";
import bcrypt from "bcrypt";

import * as employeeRepository from "../repositories/employeeRepository.js"
import * as companyRepository from "../repositories/companyRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import chalk from 'chalk';

export async function createCardsService(
  employeeId: number,
  type: cardRepository.TransactionTypes,
  x_api_key: string
) {
  await validateApiKey(x_api_key);
  await validadeCardByTypeAndEmployee(type, employeeId);
  const employee = await findEmployee(employeeId);
  const cardholderName = generateCardName(employee.fullName);
  const cardNumber = generateCardNumber();
  const expirationDate = generateTodayDate();
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
  }

  await cardRepository.insert(cardData);
};

export async function activateCardsService(cardId: number, password: string, securityCode: string) {
  const card = await findCardById(cardId);
  await validateCardExpirationDate(card);
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
  await findCardById(cardId);
};

async function validateApiKey(x_api_key: string) {
  const apiKey = await companyRepository.findByApiKey(x_api_key);

  if (!apiKey) throw { statusCode: 401, message: "Invalid Company ApiKey" };
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
  const middlesNamesArray: any = fullNameUpper
    .split(" ")
    .slice(1, -1);

  middlesNamesArray.map((middleNameString: string, index: number) => {
    const middleNameAbbreviate = (middleNameString.length > 3) ? middleNameString.charAt(0) : ""
    middlesNamesArray[index] = middleNameAbbreviate;
  });

  const fullNameSplit = fullNameUpper.split(" ")

  const cardholderName =
    `${fullNameSplit[0]} 
    ${middlesNamesArray.join(" ")} 
    ${fullNameSplit[fullNameSplit.length - 1]}`

  return cardholderName;
};

function generateCardNumber() {
  const cardNumber = faker.finance.creditCardNumber();
  return cardNumber;
};

function generateTodayDate() {
  const today = new Date();
  const yy = parseInt(today.getFullYear().toString().slice(2)) + 5
  const month = today.getMonth() + 1
  const mm = month < 10 ? ("0" + month.toString()) : month;
  const expirationDate = `${mm}/${yy}`;
  return expirationDate;
};

function generateCardCVV() {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const cvcNumber = faker.finance.creditCardCVV();
  const encryptedCVV = cryptr.encrypt(cvcNumber);
  return encryptedCVV;
};

async function findCardById(cardId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) throw { statusCode: 404, message: "Card Not Found" };
  return card;
};

async function validateCardExpirationDate(card: any) {
  const currentDate = generateTodayDate();
  const currentYear = parseInt(currentDate.slice(3));
  const expirationYear = parseInt(card.expirationDate.slice(3));
  const currentMonth = parseInt(currentDate.slice(0, 2));
  const expirationMonth = parseInt(card.expirationDate.slice(0, 2));

  if (currentYear >= expirationYear && currentMonth > expirationMonth) {
    throw { statusCode: 401, message: "Expired Card" };
  }
};

async function validateCardActivation(card: any) {
  if (card.password) throw { statusCode: 401, message: "Card Already Actived" };
};

async function validateCVV(card: any, securityCode: string) {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const decryptedCVV = cryptr.decrypt(card.securityCode);

  if (securityCode !== decryptedCVV) throw { statusCode: 401, message: "Wrong Security Code" };
};

function encryptPassword(password: string) {
  const passwordHash = bcrypt.hashSync(password, 10);
  return passwordHash;
};
