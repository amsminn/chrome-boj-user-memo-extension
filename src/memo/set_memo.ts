// setter of memo storage
import { Storage } from "@plasmohq/storage"

// export async function clearMemo(): Promise<void> {
//     const storage: Storage = new Storage({ area: "sync" });
//     // clear storage data that starts with "Boj_"
//     // st
// }

// export async function setMemo(key: string, value: string): Promise<void> {
//     const storage: Storage = new Storage({ area: "sync" });
//     const data: Record<string, string> = await storage.get("Boj_" + key);
    
//     value = value.trim();
    
//     if(value === "") {
//         if(data) {
//             // delete key from storage
//             delete 
//         }
//     } else {
//         await storage.set("Boj_" + key, value);
//     }

//     await storage.set("Boj_" + key, data);
// }