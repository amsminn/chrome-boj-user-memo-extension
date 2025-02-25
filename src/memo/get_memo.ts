import { Storage } from "@plasmohq/storage";

export async function getAllMemos(): Promise<Record<string, string>> {
    const storage: Storage = new Storage();
    const data: Record<string, string> = await storage.get("BojUserMemo");
    return data;
}

export async function getMemo(key: string): Promise<string> {
    const data: Record<string, string> = await getAllMemos();
    console.log("getMemo: ", key || "empty ", data[key] || "empty");
    return data[key] || "";
}