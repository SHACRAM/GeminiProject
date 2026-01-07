// TODO: Importez GeminiClient et les types nécessaires
import 'dotenv/config';
import { GeminiClient } from "./models/GeminiClient.js";
import { isSuccessResponse } from './types/gemini.types.js';

// TODO: Créez une fonction principale async
async function main() {
  // 1. Initialisez le client avec votre clé API
  

  // const apiKey = "VOTRE_CLE_API"; // À remplacer
    const apiKey = process.env.GEMINI_API_KEY as string;

  
  // 2. Créez une instance de GeminiClient avec le modèle "gemini-2.5-flash-lite"
    const newGeminiClient = new GeminiClient(apiKey, "gemini-2.5-flash-lite", true);

  
  // 3. Testez plusieurs requêtes avec différentes configurations
  try{
    const response1 = await newGeminiClient.ask(
        {
            prompt: "quelle est la capitale de la france ?"
        }
    )
    if(isSuccessResponse(response1)){
        console.log(response1.data);
    } else {
        throw new Error("code :" + response1.code + " message : "+ response1.error);
    }

    const response2 = await newGeminiClient.ask(
        {
            prompt: ""
        }
    )
    if(isSuccessResponse(response2)){
        console.log(response2.data);
    } else {
        throw new Error("code :" + response2.code + " message : "+ response2.error);
    }

  }catch (error) {
  console.error("Erreur lors de l'execution des requêtes :", error);

  

}

  
  // 4. Affichez les statistiques
  console.log("Statistiques du client :", newGeminiClient.getStats());
  
  // 5. Gérez les erreurs
}

// TODO: Appelez la fonction main
// Votre code ici

main();