import { SafeAreaProviderProps } from "react-native-safe-area-context";
import { GenerationConfig } from "../types/gemini.types";
import { Message } from "../types/gemini.types";
import { ApiResponse } from "../types/gemini.types";
import { ErrorResponse } from "../types/gemini.types";
import {MessageRole} from "../types/gemini.types";
import {Statistics} from "../types/gemini.types";
// TODO: Créez une fonction qui valide une clé API
// Nom : validateApiKey
// Paramètres : apiKey: string
// Retour : boolean
// La clé doit commencer par "AI" et faire au moins 20 caractères
export function validateApiKey(apiKey : string) : boolean {
    if (!apiKey.startsWith("AI") || apiKey.length < 20){
        return false;
    } else {
        return true;
    }
}

// TODO: Créez une fonction qui formate un prompt
// Nom : formatPrompt
// Paramètres : prompt: string, maxLength?: number (défaut 1000)
// Retour : string
// Coupe le prompt si trop long et ajoute "..."
export function formatPrompt(prompt: string, maxLength : number = 1000) : string{
    if (prompt.length > maxLength) {
        return "..."
    } else {
        return prompt;
    }
}

// TODO: Créez une fonction avec paramètres par défaut
// Nom : createDefaultConfig
// Paramètres : temperature?: number, maxTokens?: number
// Retour : GenerationConfig
// Valeurs par défaut : temperature = 0.7, maxTokens = 2048
export function createDefaultConfig(temperature: number = 0.7, maxTokens: number = 2048) : GenerationConfig {
    let temperatureValue : GenerationConfig = {
        temperature: temperature,
        maxOutputTokens: maxTokens
    };
    return temperatureValue;
}

// TODO: Créez une fonction fléchée qui calcule le temps écoulé
// Nom : calculateElapsedTime
// Paramètres : startTime: number
// Retour : number (en millisecondes)
export const calculateElapsedTime = (startTime :number) : number => Date.now() - startTime;


// TODO: Créez une fonction avec rest parameters
// Nom : logMessages
// Paramètres : prefix: string, ...messages: string[]
// Retour : void
// Affiche chaque message avec le préfix
export function logMessages(prefix : string, ...messages : string[]): void {
    messages.forEach(message => console.log(prefix + ' ' + message))
}




// TODO: Créez un type guard pour vérifier si une valeur est un Message
// Nom : isMessage
// Paramètre : value: unknown
// Retour : value is Message
// Vérifie la présence de role, content et timestamp
// Votre code ici
export function isMessage(value: object): value is Message{
    if ('role' in value && 'content' in value && 'timestamp' in value){
        return true;
    }else {
        return false;
    }
} 

// TODO: Créez un type guard pour vérifier si c'est une ErrorResponse
// Nom : isErrorResponse
// Paramètre : response: ApiResponse
// Retour : response is ErrorResponse
// Vérifie success === false
// Votre code ici
export function isErrorResponse(response: ApiResponse) : response is ErrorResponse {
    if (response.success === false){
        return true;
    } else{
        return false;
    }
}

// TODO: Créez un type guard pour vérifier un tableau de messages
// Nom : isMessageArray
// Paramètre : value: unknown
// Retour : value is Message[]
// Vérifie que c'est un tableau et que chaque élément est un Message
// Votre code ici
export function isMessageArray(value: unknown): value is Message[] {
    return Array.isArray(value) && value.every(isMessage);
}

// TODO: Créez un type guard pour différencier les types de MessageRole
// Nom : isUserMessage
// Paramètre : message: Message
// Retour : boolean
// Vérifie si role === MessageRole.USER
// Votre code ici
export function isUserMessage(message : Message): boolean {
    if (message.role === MessageRole.USER){
        return true;
    }else {
        return false;
    }
}


// TODO: Créez une fonction générique qui récupère une propriété d'un objet
// Nom : getProperty
// Type générique : T, K extends keyof T
// Paramètres : obj: T, key: K
// Retour : T[K]
// Votre code ici
export function getProperty<T, K extends keyof T>(obj : T, key:K) : T[K]{
    return obj[key];
}

// TODO: Créez une fonction qui vérifie si une clé existe dans Statistics
// Nom : isStatKey
// Paramètre : key: string
// Retour : key is keyof Statistics
// Votre code ici
export function isStatKey(key: string): key is keyof Statistics{
    const statKeys: Array<keyof Statistics> = ["totalRequests", "successfulRequests", "failedRequests", "averageResponseTime"];
    return statKeys.includes(key as keyof Statistics);
}

// TODO: Créez un type pour les clés d'un GenerationConfig
// Nom : ConfigKeys
// Utilise keyof
// Votre code ici
export type ConfigKeys = keyof GenerationConfig;

// TODO: Créez une fonction qui met à jour une propriété des statistiques
// Nom : updateStat
// Type générique : K extends keyof Statistics
// Paramètres : stats: Statistics, key: K, value: Statistics[K]
// Retour : Statistics
// Retourne un nouvel objet avec la propriété mise à jour
// Votre code ici
export function updateStat<K extends keyof Statistics>(stats : Statistics, key: K, value : Statistics[K]): Statistics{
    return {
        ...stats,
        [key]: value
    }
}

// TODO: Créez un type qui rend toutes les clés string de Message optionnelles
// Nom : PartialStringFields
// Utilise keyof et types conditionnels
// Votre code ici
export type PartialStringFields<T> = 
    { [K in keyof T as T[K] extends string ? K : never]?: T[K] } 
    & 
    { [K in keyof T as T[K] extends string ? never : K]: T[K] };

