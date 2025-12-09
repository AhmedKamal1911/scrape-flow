"use server";
import { getUserAvailableCreditsUsecase } from "@/lib/dal";

export async function getUserAvailableCredits() {
  const balance = await getUserAvailableCreditsUsecase();
  if (!balance) return -1;
  return balance.credits;
}
