import * as utils from "../utils/utils.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"

export async function rechargeCardService(cardId: number, amount: number) {
  const card = await utils.findCardById(cardId);
  await utils.validateCardExpirationDate(card);
  await utils.validateActiveCard(card);

  await rechargeRepository.insert({ cardId, amount });
};

