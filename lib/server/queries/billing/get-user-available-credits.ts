"use server";
import { getUserAvailableCreditsUsecase } from "@/lib/dal";

export async function getUserAvailableCredits() {
  const balance = await getUserAvailableCreditsUsecase();
  if (!balance) return 0;
  return balance.credits;
}
