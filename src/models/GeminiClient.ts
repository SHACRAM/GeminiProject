// TODO: Importez les types et utilitaires nécessaires
import { Statistics } from "../types/gemini.types"
import { RequestOptions } from "../types/gemini.types"
import { ApiResponse } from "../types/gemini.types"
import { ErrorResponse } from "../types/gemini.types"
import { SuccessResponse } from "../types/gemini.types"
import {isSuccessResponse} from "../types/gemini.types"
import { ResponseMetaData } from "../types/gemini.types"




export class GeminiClient{
    private apiKey : string;
    private modelName? : string;
    private baseUrl : string;
    private stats : Statistics;
    public debug? : boolean;
    

    public constructor( apiKey : string, modelName? : string, debug?: boolean){
        this.apiKey = apiKey;
        this.modelName = modelName;
        this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/";
        this.stats = {
            totalRequests :0,
            successfulRequests :0,
            failedRequests :0,
            averageResponseTime :0
        }
    }


    private buildUrl (endpoint : string) : string{
        return `${this.baseUrl}${endpoint}`
    }

    public async ask  ( options: RequestOptions) : Promise<ApiResponse>{
        const url = this.buildUrl(`${this.modelName}:generateContent?key=${this.apiKey}`);
        const startTime = Date.now();

        try{
            let finalResponse : ApiResponse;

            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: options.prompt }
                        ]
                    }
                ],
                
                generationConfig: options.config || {
                    temperature: 0.7,
                    maxOutputTokens: 2048
                } 
            })
            });
        console.log(response);


            if (!response.ok){
                const responseTime = Date.now() - startTime;
                this.stats.totalRequests += 1;
                this.stats = {
                    totalRequests: this.stats.totalRequests,
                    successfulRequests: this.stats.successfulRequests,
                    failedRequests: this.stats.failedRequests + 1,
                    averageResponseTime: (this.stats.averageResponseTime * (this.stats.totalRequests - 1) + responseTime) 
                                        / this.stats.totalRequests
                }

                const errorData: any = await response.json();
                const errorResponse: ErrorResponse = {
                    success: false,
                    error: errorData.error.message,
                    code: response.status
                };
                finalResponse = errorResponse;
            }
            else {
                const data: any = await response.json();
                const responseTime = Date.now() - startTime;
                this.stats.totalRequests += 1;

                this.stats = {
                    totalRequests: this.stats.totalRequests,
                    successfulRequests: this.stats.successfulRequests + 1,
                    failedRequests: this.stats.failedRequests,
                    averageResponseTime: (this.stats.averageResponseTime * (this.stats.totalRequests - 1) + responseTime) 
                                        / this.stats.totalRequests
                }
                let metadata : ResponseMetaData = {
                    model : data.modelVersion,
                    tokenUsed : data.candidates[0].tokenCount,
                    finishReason : data.candidates[0].finishReason,
                }

                const successResponse: SuccessResponse = {
                    success: true,
                    data: data.candidates[0].content.parts[0].text,
                    metadata: metadata
                };
                
                finalResponse = successResponse;

                }

            return finalResponse;


        }catch (error){
            throw (error as Error).message;
        }
    }






    public getStats(): Statistics {
        return this.stats;
    }


    public resetStats() : void {
        this.stats = {
            totalRequests :0,
            successfulRequests :0,
            failedRequests :0,
            averageResponseTime :0
        }
    }


    public get modelInfo(): string{
        return `Model : ${this.modelName}`;
    }

}
// TODO: Importez les types et utilitaires nécessaires

// TODO: Créez une classe GeminiClient
// Propriétés privées :
// - apiKey: string
// - modelName: string
// - baseUrl: string (readonly)
// - stats: Statistics

// Propriété publique :
// - debug: boolean

// Constructeur :
// - Paramètres : apiKey: string, modelName?: string, debug?: boolean
// - Initialise toutes les propriétés
// - baseUrl = "https://generativelanguage.googleapis.com/v1beta"
// - Initialise stats à 0
// L'url finale doit être https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=APIKEY

// Méthodes à implémenter :

// 1. Méthode privée buildUrl
// Paramètres : endpoint: string
// Retour : string
// Construit l'URL complète avec la clé API

// 2. Méthode publique async ask
// Paramètres : options: RequestOptions
// Retour : Promise<ApiResponse>
// Envoie une requête à l'API Gemini
// Gère les erreurs et met à jour les statistiques
// La requête doit être un POST sur l'URL avec comme body :
/* 	{
       contents: [
          {
            parts: [{ text: "" }],
          },
        ],
       generationConfig: options.config || {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
    };
*/
// Référence de la réponse : https://ai.google.dev/api/generate-content#generatecontentresponse

// 3. Méthode publique getStats
// Retour : Statistics
// Retourne une copie des statistiques

// 4. Méthode publique resetStats
// Retour : void
// Remet les statistiques à zéro

// 5. Getter modelInfo
// Retour : string
// Retourne "Model: {modelName}"

// Votre code ici