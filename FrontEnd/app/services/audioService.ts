import { setToken, getToken } from '../utils/auth';
import { BackendResponse } from '../utils/backEndRespons';

interface userAudioData {
    id: number;
    title: string;
    description: string;
    tags: tag[];
    created_at: Date;
}
interface tag {
    id: number;
    name: string;
}
interface stats {
    audioToday: number;
    audioTotal: number;
    audioPending: number;
    audioThisWeek: number;
}

class AudioService {
    private baseUrl = 'http://localhost:5000/api/audio';

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

}
export const audioService = new AudioService();
export type { userAudioData, tag, stats };