import { faker } from '@faker-js/faker';
import Cryptr from "cryptr"
import bcrypt from "bcrypt";

import * as employeeRepository from "../repositories/employeeRepository.js"
import * as companyRepository from "../repositories/companyRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"

export async function cardsService(
  employeeId: number,
  type: cardRepository.TransactionTypes,
  password: string,
  x_api_key: string
) {
  await validateApiKey(x_api_key);
  await validadeCardByTypeAndEmployee(type, employeeId);
  const employee = await findEmployee(employeeId);
  const cardholderName = generateCardName(employee.fullName);
  const cardNumber = generateCardNumber();
  const expirationDate = generateExpirationDate();
  const encryptedCVV = generateCardCVV();
  const passwordHash = encryptPassword(password);

  const cardData = {
    employeeId,
    number: cardNumber,
    cardholderName,
    securityCode: encryptedCVV,
    expirationDate,
    password: passwordHash,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type
  }

  console.log(cardData)

  await cardRepository.insert(cardData);
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
  const middlesNames: any = fullNameUpper
    .split(" ")
    .slice(1, -1);

  middlesNames.map((middleName: string, index: number) => {
    const middleNameModified = (middleName.length > 3) ? middleName.charAt(0) : ""
    middlesNames[index] = middleNameModified;
  });

  const fullNameSpit = fullNameUpper.split(" ")

  const cardholderName =
    `${fullNameSpit[0]} 
    ${middlesNames.join(" ")} 
    ${fullNameSpit[fullNameSpit.length - 1]}`

  return cardholderName;
};

function generateCardNumber() {
  const cardNumber = faker.finance.creditCardNumber();
  return cardNumber;
};

function generateExpirationDate() {
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

function encryptPassword(password: string) {
  const passwordHash = bcrypt.hashSync(password, 10);
  return passwordHash;
};