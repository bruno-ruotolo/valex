import * as utils from "../utils/utils.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"


export async function rechargeCardService(cardId: number, amount: number) {
  const card: cardRepository.Card = await utils.findCardById(cardId);
  await utils.validateCardExpirationDate(card);
  await validateBlockCard(card);
  await utils.validateActiveCard(card);

  await rechargeRepository.insert({ cardId, amount });
};

async function validateBlockCard(card: cardRepository.Card) {
  if (card.isBlocked) throw { statusCode: 401, message: "Card Blocked" };
};
