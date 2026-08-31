import { revalidatePath } from "next/cache";

export async function revalidatePortfolio(): Promise<void> {
  revalidatePath("/");
  revalidatePath("/", "layout");
}
