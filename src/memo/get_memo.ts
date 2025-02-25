import { Storage } from "@plasmohq/storage"
import { useEffect } from "react";
import useStorage from "../hooks/useStorage";

export async function getAllMemos(): Promise<Record<string, string>> {
    const storage: Storage = new Storage();
    const data: Record<string, string> = await storage.get("BojUserMemo");
    return data;
}

export async function getMemo(key: string): Promise<string> {
    const data: Record<string, string> = await getAllMemos();
    return data[key] || "";
}