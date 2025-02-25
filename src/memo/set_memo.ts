// setter of memo storage
import { Storage } from "@plasmohq/storage"

export async function clearMemo(): Promise<void> {
    const storage: Storage = new Storage();
    await storage.set("BojUserMemo", {});
}

export async function setMemo(key: string, value: string): Promise<void> {
    console.log("setMemo");
    const storage: Storage = new Storage();
    const data: Record<string, string> = await storage.get("BojUserMemo");
    data[key] = value.trim();
    
    try {
        await storage.set("BojUserMemo", data);
        console.log("setMemo success: ", key, value);
    } catch (error) {
        console.error("setmemo error: ", error);
    }
}