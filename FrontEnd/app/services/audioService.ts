import { setToken, getToken } from '../utils/auth';
import { BackendResponse } from '../utils/backEndRespons';


interface userAudioData {
    id: number;
    file_url: string;
    title: string;
    description: string;
    duration: number;
    status: string;
    mood : string;
    tags: tag[];
    transcription: transcription | null;
    summary: summary | null;
    created_at: Date;
}
interface tag {
    id: number;
    name: string;
}
interface transcription {
    id: number;
    text: string;
}
interface summary {
    id: number;
    summary_text: string;
}
interface stats {
    audioToday: number;
    audioTotal: number;
    audioPending: number;
    audioThisWeek: number;
}

class AudioService {
    private baseUrl = 'https://echo-backend-w51u.onrender.com/api/audio';

    async userAudio(): Promise<BackendResponse<userAudioData[]>> {
        try {
            const token = getToken();
            const response = await fetch(`${this.baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user audio');
            }

            const data: BackendResponse<userAudioData[]> = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to fetch user audio');
        }
    }
    async audioStats(): Promise<BackendResponse<stats>> {
        try {
            const token = getToken();
            const response = await fetch(`${this.baseUrl}/stats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch audio stats');
            }

            const data: BackendResponse<stats> = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to fetch audio stats');
        }
    }
    async fetchAudioById(id: number): Promise<BackendResponse<userAudioData>> {
        try {
            const token = getToken();
            const response = await fetch(`${this.baseUrl}/audById/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch audio by ID');
            }

            const data: BackendResponse<userAudioData> = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to fetch audio by ID');
        }
    }
    async create(formData: FormData): Promise<BackendResponse<userAudioData>> {
        try {
            const token = getToken();
            const response = await fetch(`${this.baseUrl}/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to create audio');
            }

            const data: BackendResponse<userAudioData> = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to create audio');
        }
    }

}
export const audioService = new AudioService();
export type { userAudioData, tag, stats , transcription, summary};