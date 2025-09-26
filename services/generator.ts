
import { GoogleGenAI } from '@google/genai';
import type { Student, University, CountryCode } from '../types';
import { COUNTRY_DATA } from '../constants/data';

function getRandomElement<T,>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const generateRandomUniversity = (country: CountryCode): University => getRandomElement(COUNTRY_DATA[country].universities);
export const generateRandomId = (): string => String(Math.floor(100000000 + Math.random() * 900000000));

export const generateRandomName = (country: CountryCode, gender: 'male' | 'female' | 'random' = 'random'): string => {
    const data = COUNTRY_DATA[country];
    let firstNames = (gender === 'male') ? data.firstNamesMale : (gender === 'female') ? data.firstNamesFemale : [...data.firstNamesMale, ...data.firstNamesFemale];
    return `${getRandomElement(firstNames)} ${getRandomElement(data.lastNames)}`.toUpperCase();
};

export const generateRandomDob = (): string => {
    const startYear = new Date().getFullYear();
    const birthYear = startYear - Math.floor(18 + Math.random() * 5);
    const birthMonth = Math.floor(Math.random() * 12);
    const birthDay = Math.floor(Math.random() * 28) + 1;
    const dobDate = new Date(birthYear, birthMonth, birthDay);
    return formatDate(dobDate);
};

export const generateRandomMajor = (country: CountryCode): string => getRandomElement(COUNTRY_DATA[country].majors);

export const generateRandomPhotoUrl = async (country: CountryCode, gender: 'male' | 'female' | 'random' = 'random'): Promise<string> => {
    const fallbackUrl = () => {
        const seed = (gender === 'male') ? 'male' + Math.random() : (gender === 'female') ? 'female' + Math.random() : Math.random();
        return `https://picsum.photos/seed/${seed}/300/400`;
    };

    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

        if (!apiKey) {
            console.warn('Missing Gemini API key. Falling back to placeholder photo URLs.');
            return fallbackUrl();
        }

        const ai = new GoogleGenAI({ apiKey });
        const determinedGender = gender === 'random' ? (Math.random() > 0.5 ? 'male' : 'female') : gender;
        const nationality = COUNTRY_DATA[country].nationality;
        const prompt = `A professional studio portrait of a young ${determinedGender} ${nationality} university student. They are looking at the camera with a neutral to friendly expression. Plain, out-of-focus background. High quality photograph.`;

        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '3:4',
            },
        });

        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error("AI photo generation failed, using fallback:", error);
        return fallbackUrl();
    }
};


export const generateRandomValidYears = (): string => {
    const startYear = new Date().getFullYear();
    const endYear = startYear + 4;
    return `${startYear} - ${endYear}`;
};

export const generateEmail = (id: string, domain: string): string => `${id}@${domain}`;

export async function generateRandomStudent(country: CountryCode): Promise<Student> {
  const university = generateRandomUniversity(country);
  const id = generateRandomId();
  const gender = getRandomElement(['male', 'female'] as const);
  const photoUrl = await generateRandomPhotoUrl(country, gender);

  const student: Student = {
    university: university,
    id: id,
    name: generateRandomName(country, gender),
    dob: generateRandomDob(),
    major: generateRandomMajor(country),
    photoUrl: photoUrl,
    validYears: generateRandomValidYears(),
    email: generateEmail(id, university.domain),
    gender: gender,
  };
  
  return student;
}