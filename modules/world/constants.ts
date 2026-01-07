import newDataJson from '../../public/1.json';
import ielts18DataJson from '../../public/1_1.json';
import { Conversation } from './types';

const processedNewData: Conversation[] = (newDataJson as Conversation[]).map(item => ({
    ...item,
    id: item.id.replace(/^chapter_/, 'chapter_eazy_')
}));

const processedIelts18Data: Conversation[] = (ielts18DataJson as Conversation[]);

const existingData: Conversation[] = [
    {
        "id": "chapter_0",
        "title": "Chapter 1",
        "audio_source": "theLittlePrince.mp3",
        "full_audio_range": {
            "start": 5.245,
            "end": 247.388
        },
        "sentences": [
            {
                "text": "Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest.",
                "start": 5.245,
                "end": 25.43,
                "words": [
                    { "word": "Once", "start": 5.245, "end": 5.766 },
                    { "word": "when", "start": 5.886, "end": 6.026 },
                    { "word": "I", "start": 6.086, "end": 6.126 },
                    { "word": "was", "start": 6.186, "end": 6.326 },
                    { "word": "six", "start": 6.446, "end": 6.707 },
                    { "word": "years", "start": 6.747, "end": 6.947 },
                    { "word": "old,", "start": 7.127, "end": 7.308 },
                    { "word": "I", "start": 7.328, "end": 7.348 },
                    { "word": "saw", "start": 7.988, "end": 8.309 },
                    { "word": "a", "start": 8.649, "end": 8.669 },
                    { "word": "magnificent", "start": 8.689, "end": 9.33 },
                    { "word": "picture", "start": 9.41, "end": 9.831 },
                    { "word": "in", "start": 9.871, "end": 10.271 },
                    { "word": "a", "start": 10.371, "end": 10.391 },
                    { "word": "book", "start": 10.431, "end": 10.692 },
                    { "word": "called", "start": 11.232, "end": 11.513 },
                    { "word": "True", "start": 11.553, "end": 12.013 },
                    { "word": "Stories", "start": 12.073, "end": 12.514 },
                    { "word": "from", "start": 12.774, "end": 12.935 },
                    { "word": "Nature", "start": 12.975, "end": 13.395 },
                    { "word": "about", "start": 13.415, "end": 14.917 },
                    { "word": "the", "start": 14.957, "end": 15.177 },
                    { "word": "primeval", "start": 15.217, "end": 15.738 },
                    { "word": "forest.", "start": 15.798, "end": 16.219 }
                ],
                "img": "imgs/chapter_0/s0000.png"
            },
            {
                "text": "In the book it said: Boa constrictors swallow their prey whole, without chewing it.",
                "start": 26.591,
                "end": 40.489,
                "words": [
                    { "word": "In", "start": 26.591, "end": 26.672 },
                    { "word": "the", "start": 26.732, "end": 26.832 },
                    { "word": "book,", "start": 26.892, "end": 27.152 },
                    { "word": "it", "start": 27.332, "end": 27.412 },
                    { "word": "said,", "start": 27.513, "end": 27.713 },
                    { "word": "Boa", "start": 28.173, "end": 28.494 },
                    { "word": "constrictors", "start": 28.534, "end": 29.175 },
                    { "word": "swallow", "start": 29.215, "end": 29.916 },
                    { "word": "their", "start": 29.976, "end": 30.136 },
                    { "word": "prey", "start": 30.236, "end": 30.556 },
                    { "word": "whole,", "start": 30.697, "end": 30.997 },
                    { "word": "without", "start": 31.478, "end": 31.958 },
                    { "word": "chewing", "start": 32.158, "end": 32.499 },
                    { "word": "it.", "start": 32.559, "end": 33.48 }
                ],
                "img": "imgs/chapter_0/s0001.png"
            }
        ],
        "coverImg": "imgs/chapter_0/s0000.png"
    }
];

export const CONVERSATION_DATA: Conversation[] = [
    // ...existingData,
    ...processedNewData,
    ...processedIelts18Data
];
