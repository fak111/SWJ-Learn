import { Conversation, Sentence, Word } from './types';
import newDataJson from './public/1.json';
import ielts18DataJson from './public/1_1.json';

// 处理新数据：重命名 ID 以避免冲突
const processedNewData: Conversation[] = (newDataJson as Conversation[]).map(item => ({
    ...item,
    id: item.id.replace(/^chapter_/, 'chapter_eazy_')
}));

// 处理 IELTS 18 数据
const processedIelts18Data: Conversation[] = (ielts18DataJson as Conversation[]);

// 原始的对话数据（可能包含较长的句子）
const existingData: Conversation[] = [
    {
        "id": "chapter_0",
        "title": "Chapter 1",
        // 服务器上实际文件名为 1.mp3，这里保持一致，方便通过 CDN 或本地加载
        "audio_source": "theLittlePrince.mp3",
        "full_audio_range": {
            "start": 5.245,
            "end": 247.388
        },
        "sentences": [
            {
                "text": "Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal. Here is a copy of the drawing.",
                "start": 5.245,
                "end": 25.43,
                "words": [
                    {
                        "word": "Once",
                        "start": 5.245,
                        "end": 5.766
                    },
                    {
                        "word": "when",
                        "start": 5.886,
                        "end": 6.026
                    },
                    {
                        "word": "I",
                        "start": 6.086,
                        "end": 6.126
                    },
                    {
                        "word": "was",
                        "start": 6.186,
                        "end": 6.326
                    },
                    {
                        "word": "six",
                        "start": 6.446,
                        "end": 6.707
                    },
                    {
                        "word": "years",
                        "start": 6.747,
                        "end": 6.947
                    },
                    {
                        "word": "old,",
                        "start": 7.127,
                        "end": 7.308
                    },
                    {
                        "word": "I",
                        "start": 7.328,
                        "end": 7.348
                    },
                    {
                        "word": "saw",
                        "start": 7.988,
                        "end": 8.309
                    },
                    {
                        "word": "a",
                        "start": 8.649,
                        "end": 8.669
                    },
                    {
                        "word": "magnificent",
                        "start": 8.689,
                        "end": 9.33
                    },
                    {
                        "word": "picture",
                        "start": 9.41,
                        "end": 9.831
                    },
                    {
                        "word": "in",
                        "start": 9.871,
                        "end": 10.271
                    },
                    {
                        "word": "a",
                        "start": 10.371,
                        "end": 10.391
                    },
                    {
                        "word": "book",
                        "start": 10.431,
                        "end": 10.692
                    },
                    {
                        "word": "called",
                        "start": 11.232,
                        "end": 11.513
                    },
                    {
                        "word": "True",
                        "start": 11.553,
                        "end": 12.013
                    },
                    {
                        "word": "Stories",
                        "start": 12.073,
                        "end": 12.514
                    },
                    {
                        "word": "from",
                        "start": 12.774,
                        "end": 12.935
                    },
                    {
                        "word": "Nature",
                        "start": 12.975,
                        "end": 13.395
                    },
                    {
                        "word": "about",
                        "start": 13.415,
                        "end": 14.917
                    },
                    {
                        "word": "the",
                        "start": 14.957,
                        "end": 15.177
                    },
                    {
                        "word": "primeval",
                        "start": 15.217,
                        "end": 15.738
                    },
                    {
                        "word": "forest.",
                        "start": 15.798,
                        "end": 16.219
                    },
                    {
                        "word": "It",
                        "start": 17.5,
                        "end": 17.58
                    },
                    {
                        "word": "was",
                        "start": 17.66,
                        "end": 17.841
                    },
                    {
                        "word": "a",
                        "start": 17.921,
                        "end": 17.961
                    },
                    {
                        "word": "picture",
                        "start": 18.021,
                        "end": 18.481
                    },
                    {
                        "word": "of",
                        "start": 18.521,
                        "end": 18.782
                    },
                    {
                        "word": "a",
                        "start": 18.862,
                        "end": 18.902
                    },
                    {
                        "word": "boa",
                        "start": 18.942,
                        "end": 19.262
                    },
                    {
                        "word": "constrictor",
                        "start": 19.322,
                        "end": 19.983
                    },
                    {
                        "word": "in",
                        "start": 20.324,
                        "end": 20.384
                    },
                    {
                        "word": "the",
                        "start": 20.424,
                        "end": 20.504
                    },
                    {
                        "word": "act",
                        "start": 20.744,
                        "end": 20.985
                    },
                    {
                        "word": "of",
                        "start": 21.285,
                        "end": 21.345
                    },
                    {
                        "word": "swallowing",
                        "start": 21.385,
                        "end": 21.986
                    },
                    {
                        "word": "an",
                        "start": 22.006,
                        "end": 22.046
                    },
                    {
                        "word": "animal.",
                        "start": 22.146,
                        "end": 22.647
                    },
                    {
                        "word": "Here",
                        "start": 23.548,
                        "end": 23.868
                    },
                    {
                        "word": "is",
                        "start": 23.908,
                        "end": 24.148
                    },
                    {
                        "word": "a",
                        "start": 24.209,
                        "end": 24.229
                    },
                    {
                        "word": "copy",
                        "start": 24.289,
                        "end": 24.669
                    },
                    {
                        "word": "of",
                        "start": 24.909,
                        "end": 24.949
                    },
                    {
                        "word": "the",
                        "start": 24.989,
                        "end": 25.07
                    },
                    {
                        "word": "drawing.",
                        "start": 25.11,
                        "end": 25.43
                    }
                ],
                "img": "imgs/chapter_0/s0000.png"
            },
            {
                "text": "In the book it said: \"Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion.\"",
                "start": 26.591,
                "end": 40.489,
                "words": [
                    {
                        "word": "In",
                        "start": 26.591,
                        "end": 26.672
                    },
                    {
                        "word": "the",
                        "start": 26.732,
                        "end": 26.832
                    },
                    {
                        "word": "book,",
                        "start": 26.892,
                        "end": 27.152
                    },
                    {
                        "word": "it",
                        "start": 27.332,
                        "end": 27.412
                    },
                    {
                        "word": "said,",
                        "start": 27.513,
                        "end": 27.713
                    },
                    {
                        "word": "Boa",
                        "start": 28.173,
                        "end": 28.494
                    },
                    {
                        "word": "constrictors",
                        "start": 28.534,
                        "end": 29.175
                    },
                    {
                        "word": "swallow",
                        "start": 29.215,
                        "end": 29.916
                    },
                    {
                        "word": "their",
                        "start": 29.976,
                        "end": 30.136
                    },
                    {
                        "word": "prey",
                        "start": 30.236,
                        "end": 30.556
                    },
                    {
                        "word": "whole",
                        "start": 30.697,
                        "end": 30.997
                    },
                    {
                        "word": "without",
                        "start": 31.478,
                        "end": 31.958
                    },
                    {
                        "word": "chewing",
                        "start": 32.158,
                        "end": 32.499
                    },
                    {
                        "word": "it.",
                        "start": 32.559,
                        "end": 33.48
                    },
                    {
                        "word": "After",
                        "start": 33.46,
                        "end": 33.961
                    },
                    {
                        "word": "that,",
                        "start": 34.021,
                        "end": 34.221
                    },
                    {
                        "word": "they",
                        "start": 34.601,
                        "end": 34.782
                    },
                    {
                        "word": "are",
                        "start": 34.882,
                        "end": 34.982
                    },
                    {
                        "word": "not",
                        "start": 35.062,
                        "end": 35.262
                    },
                    {
                        "word": "able",
                        "start": 35.463,
                        "end": 35.643
                    },
                    {
                        "word": "to",
                        "start": 35.703,
                        "end": 35.783
                    },
                    {
                        "word": "move,",
                        "start": 35.863,
                        "end": 36.163
                    },
                    {
                        "word": "and",
                        "start": 36.764,
                        "end": 36.864
                    },
                    {
                        "word": "they",
                        "start": 36.924,
                        "end": 37.065
                    },
                    {
                        "word": "sleep",
                        "start": 37.125,
                        "end": 37.585
                    },
                    {
                        "word": "through",
                        "start": 37.785,
                        "end": 38.006
                    },
                    {
                        "word": "the",
                        "start": 38.046,
                        "end": 38.146
                    },
                    {
                        "word": "six",
                        "start": 38.226,
                        "end": 38.446
                    },
                    {
                        "word": "months",
                        "start": 38.506,
                        "end": 38.747
                    },
                    {
                        "word": "that",
                        "start": 38.807,
                        "end": 38.967
                    },
                    {
                        "word": "they",
                        "start": 38.987,
                        "end": 39.147
                    },
                    {
                        "word": "need",
                        "start": 39.187,
                        "end": 39.508
                    },
                    {
                        "word": "for",
                        "start": 39.688,
                        "end": 39.848
                    },
                    {
                        "word": "digestion.",
                        "start": 39.908,
                        "end": 40.489
                    }
                ],
                "img": "imgs/chapter_0/s0001.png"
            },
            {
                "text": "I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing. My Drawing Number One. It looked like this:",
                "start": 41.49,
                "end": 57.19,
                "words": [
                    {
                        "word": "I",
                        "start": 41.49,
                        "end": 41.55
                    },
                    {
                        "word": "pondered",
                        "start": 41.75,
                        "end": 42.211
                    },
                    {
                        "word": "deeply",
                        "start": 42.231,
                        "end": 42.932
                    },
                    {
                        "word": "then",
                        "start": 42.952,
                        "end": 43.553
                    },
                    {
                        "word": "over",
                        "start": 43.593,
                        "end": 44.053
                    },
                    {
                        "word": "the",
                        "start": 44.093,
                        "end": 44.214
                    },
                    {
                        "word": "adventures",
                        "start": 44.334,
                        "end": 44.894
                    },
                    {
                        "word": "of",
                        "start": 44.914,
                        "end": 45.175
                    },
                    {
                        "word": "the",
                        "start": 45.215,
                        "end": 45.315
                    },
                    {
                        "word": "jungle,",
                        "start": 45.355,
                        "end": 45.796
                    },
                    {
                        "word": "and",
                        "start": 46.757,
                        "end": 46.877
                    },
                    {
                        "word": "after",
                        "start": 47.217,
                        "end": 47.538
                    },
                    {
                        "word": "some",
                        "start": 47.578,
                        "end": 47.898
                    },
                    {
                        "word": "work",
                        "start": 47.958,
                        "end": 48.259
                    },
                    {
                        "word": "with",
                        "start": 48.399,
                        "end": 48.539
                    },
                    {
                        "word": "a",
                        "start": 48.559,
                        "end": 48.579
                    },
                    {
                        "word": "coloured",
                        "start": 48.619,
                        "end": 49.18
                    },
                    {
                        "word": "pencil,",
                        "start": 49.3,
                        "end": 49.801
                    },
                    {
                        "word": "I",
                        "start": 50.482,
                        "end": 50.522
                    },
                    {
                        "word": "succeeded",
                        "start": 50.662,
                        "end": 51.182
                    },
                    {
                        "word": "in",
                        "start": 51.222,
                        "end": 51.623
                    },
                    {
                        "word": "making",
                        "start": 51.723,
                        "end": 52.023
                    },
                    {
                        "word": "my",
                        "start": 52.084,
                        "end": 52.224
                    },
                    {
                        "word": "first",
                        "start": 52.304,
                        "end": 52.604
                    },
                    {
                        "word": "drawing,",
                        "start": 52.744,
                        "end": 53.145
                    },
                    {
                        "word": "my",
                        "start": 53.926,
                        "end": 54.086
                    },
                    {
                        "word": "drawing",
                        "start": 54.126,
                        "end": 54.427
                    },
                    {
                        "word": "number",
                        "start": 54.487,
                        "end": 54.727
                    },
                    {
                        "word": "one.",
                        "start": 54.867,
                        "end": 55.007
                    },
                    {
                        "word": "It",
                        "start": 55.868,
                        "end": 55.948
                    },
                    {
                        "word": "looks",
                        "start": 56.089,
                        "end": 56.429
                    },
                    {
                        "word": "like",
                        "start": 56.569,
                        "end": 56.749
                    },
                    {
                        "word": "this.",
                        "start": 56.81,
                        "end": 57.19
                    }
                ],
                "img": "imgs/chapter_0/s0002.png"
            },
            {
                "text": "I showed my masterpiece to the grown-ups, and asked them whether the drawing frightened them.",
                "start": 58.3,
                "end": 64.829,
                "words": [
                    {
                        "word": "I",
                        "start": 58.3,
                        "end": 58.54
                    },
                    {
                        "word": "showed",
                        "start": 58.56,
                        "end": 59.041
                    },
                    {
                        "word": "my",
                        "start": 59.081,
                        "end": 59.361
                    },
                    {
                        "word": "masterpiece",
                        "start": 59.422,
                        "end": 60.122
                    },
                    {
                        "word": "to",
                        "start": 60.363,
                        "end": 60.483
                    },
                    {
                        "word": "the",
                        "start": 60.523,
                        "end": 60.583
                    },
                    {
                        "word": "grown-ups",
                        "start": 60.643,
                        "end": 61.224
                    },
                    {
                        "word": "and",
                        "start": 61.825,
                        "end": 61.925
                    },
                    {
                        "word": "asked",
                        "start": 61.965,
                        "end": 62.406
                    },
                    {
                        "word": "them",
                        "start": 62.446,
                        "end": 62.606
                    },
                    {
                        "word": "whether",
                        "start": 62.926,
                        "end": 63.247
                    },
                    {
                        "word": "the",
                        "start": 63.287,
                        "end": 63.507
                    },
                    {
                        "word": "drawing",
                        "start": 63.567,
                        "end": 63.968
                    },
                    {
                        "word": "frightened",
                        "start": 64.148,
                        "end": 64.609
                    },
                    {
                        "word": "them.",
                        "start": 64.669,
                        "end": 64.829
                    }
                ],
                "img": "imgs/chapter_0/s0003.png"
            },
            {
                "text": "But they answered: \"Frighten? Why should any one be frightened by a hat?\"",
                "start": 65.89,
                "end": 71.017,
                "words": [
                    {
                        "word": "But",
                        "start": 65.89,
                        "end": 66.011
                    },
                    {
                        "word": "they",
                        "start": 66.091,
                        "end": 66.271
                    },
                    {
                        "word": "answered,",
                        "start": 66.311,
                        "end": 66.852
                    },
                    {
                        "word": "frightened?",
                        "start": 67.573,
                        "end": 68.013
                    },
                    {
                        "word": "Why",
                        "start": 68.754,
                        "end": 68.995
                    },
                    {
                        "word": "should",
                        "start": 69.015,
                        "end": 69.295
                    },
                    {
                        "word": "anyone",
                        "start": 69.415,
                        "end": 69.716
                    },
                    {
                        "word": "be",
                        "start": 69.756,
                        "end": 69.836
                    },
                    {
                        "word": "frightened",
                        "start": 69.876,
                        "end": 70.216
                    },
                    {
                        "word": "by",
                        "start": 70.296,
                        "end": 70.457
                    },
                    {
                        "word": "a",
                        "start": 70.557,
                        "end": 70.617
                    },
                    {
                        "word": "hat?",
                        "start": 70.677,
                        "end": 71.017
                    }
                ],
                "img": "imgs/chapter_0/s0004.png"
            },
            {
                "text": "My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant. But since the grown-ups were not able to understand it, I made another drawing: I drew the inside of the boa constrictor, so that the grown-ups could see it clearly. They always need to have things explained. My Drawing Number Two looked like this:",
                "start": 72.6,
                "end": 99.293,
                "words": [
                    {
                        "word": "My",
                        "start": 72.6,
                        "end": 72.78
                    },
                    {
                        "word": "drawing",
                        "start": 72.84,
                        "end": 73.321
                    },
                    {
                        "word": "was",
                        "start": 73.581,
                        "end": 73.741
                    },
                    {
                        "word": "not",
                        "start": 73.861,
                        "end": 74.042
                    },
                    {
                        "word": "a",
                        "start": 74.162,
                        "end": 74.202
                    },
                    {
                        "word": "picture",
                        "start": 74.262,
                        "end": 74.682
                    },
                    {
                        "word": "of",
                        "start": 74.823,
                        "end": 74.863
                    },
                    {
                        "word": "a",
                        "start": 74.963,
                        "end": 75.003
                    },
                    {
                        "word": "hat,",
                        "start": 75.083,
                        "end": 75.444
                    },
                    {
                        "word": "it",
                        "start": 75.844,
                        "end": 75.904
                    },
                    {
                        "word": "was",
                        "start": 75.984,
                        "end": 76.104
                    },
                    {
                        "word": "a",
                        "start": 76.185,
                        "end": 76.205
                    },
                    {
                        "word": "picture",
                        "start": 76.265,
                        "end": 76.685
                    },
                    {
                        "word": "of",
                        "start": 76.725,
                        "end": 77.026
                    },
                    {
                        "word": "a",
                        "start": 77.106,
                        "end": 77.126
                    },
                    {
                        "word": "boa",
                        "start": 77.166,
                        "end": 77.486
                    },
                    {
                        "word": "constrictor",
                        "start": 77.506,
                        "end": 78.187
                    },
                    {
                        "word": "digesting",
                        "start": 78.528,
                        "end": 79.169
                    },
                    {
                        "word": "an",
                        "start": 79.349,
                        "end": 79.509
                    },
                    {
                        "word": "elephant.",
                        "start": 79.569,
                        "end": 80.19
                    },
                    {
                        "word": "But",
                        "start": 81.014,
                        "end": 81.174
                    },
                    {
                        "word": "since",
                        "start": 81.315,
                        "end": 81.575
                    },
                    {
                        "word": "the",
                        "start": 81.595,
                        "end": 81.736
                    },
                    {
                        "word": "grown-ups",
                        "start": 81.776,
                        "end": 82.357
                    },
                    {
                        "word": "were",
                        "start": 82.497,
                        "end": 82.637
                    },
                    {
                        "word": "not",
                        "start": 82.718,
                        "end": 82.938
                    },
                    {
                        "word": "able",
                        "start": 83.159,
                        "end": 83.339
                    },
                    {
                        "word": "to",
                        "start": 83.399,
                        "end": 83.459
                    },
                    {
                        "word": "understand",
                        "start": 83.579,
                        "end": 84.221
                    },
                    {
                        "word": "it,",
                        "start": 84.321,
                        "end": 84.421
                    },
                    {
                        "word": "I",
                        "start": 85.043,
                        "end": 85.103
                    },
                    {
                        "word": "made",
                        "start": 85.183,
                        "end": 85.403
                    },
                    {
                        "word": "another",
                        "start": 85.443,
                        "end": 85.945
                    },
                    {
                        "word": "drawing.",
                        "start": 85.985,
                        "end": 86.887
                    },
                    {
                        "word": "I",
                        "start": 86.907,
                        "end": 86.967
                    },
                    {
                        "word": "drew",
                        "start": 87.027,
                        "end": 87.227
                    },
                    {
                        "word": "the",
                        "start": 87.247,
                        "end": 87.468
                    },
                    {
                        "word": "inside",
                        "start": 87.608,
                        "end": 88.129
                    },
                    {
                        "word": "of",
                        "start": 88.45,
                        "end": 88.51
                    },
                    {
                        "word": "the",
                        "start": 88.55,
                        "end": 88.63
                    },
                    {
                        "word": "boa",
                        "start": 88.67,
                        "end": 88.991
                    },
                    {
                        "word": "constrictor,",
                        "start": 89.031,
                        "end": 89.672
                    },
                    {
                        "word": "so",
                        "start": 90.354,
                        "end": 90.534
                    },
                    {
                        "word": "that",
                        "start": 90.594,
                        "end": 90.775
                    },
                    {
                        "word": "the",
                        "start": 90.995,
                        "end": 91.096
                    },
                    {
                        "word": "grown-ups",
                        "start": 91.136,
                        "end": 91.657
                    },
                    {
                        "word": "could",
                        "start": 91.777,
                        "end": 91.977
                    },
                    {
                        "word": "see",
                        "start": 92.038,
                        "end": 92.198
                    },
                    {
                        "word": "it",
                        "start": 92.258,
                        "end": 92.298
                    },
                    {
                        "word": "clearly.",
                        "start": 92.559,
                        "end": 92.939
                    },
                    {
                        "word": "They",
                        "start": 93.42,
                        "end": 93.621
                    },
                    {
                        "word": "always",
                        "start": 93.641,
                        "end": 94.202
                    },
                    {
                        "word": "need",
                        "start": 94.242,
                        "end": 94.723
                    },
                    {
                        "word": "to",
                        "start": 94.743,
                        "end": 94.803
                    },
                    {
                        "word": "have",
                        "start": 94.844,
                        "end": 94.964
                    },
                    {
                        "word": "things",
                        "start": 95.004,
                        "end": 95.264
                    },
                    {
                        "word": "explained.",
                        "start": 95.305,
                        "end": 95.986
                    },
                    {
                        "word": "My",
                        "start": 96.708,
                        "end": 96.908
                    },
                    {
                        "word": "drawing",
                        "start": 96.928,
                        "end": 97.229
                    },
                    {
                        "word": "number",
                        "start": 97.289,
                        "end": 97.549
                    },
                    {
                        "word": "two",
                        "start": 97.589,
                        "end": 97.81
                    },
                    {
                        "word": "looked",
                        "start": 97.85,
                        "end": 98.511
                    },
                    {
                        "word": "like",
                        "start": 98.672,
                        "end": 98.852
                    },
                    {
                        "word": "this.",
                        "start": 98.912,
                        "end": 99.293
                    }
                ],
                "img": "imgs/chapter_0/s0005.png"
            },
            {
                "text": "The grown-ups' response, this time, was to advise me to lay aside my drawings of boa constrictors, whether from the inside or the outside, and devote myself instead to geography, history, arithmetic and grammar. That is why, at the age of six, I gave up what might have been a magnificent career as a painter. I had been disheartened by the failure of my Drawing Number One and my Drawing Number Two. Grown-ups never understand anything by themselves, and it is tiresome for children to be always and forever explaining things to them.",
                "start": 101.568,
                "end": 147.166,
                "words": [
                    {
                        "word": "The",
                        "start": 101.568,
                        "end": 101.788
                    },
                    {
                        "word": "grown-up's",
                        "start": 101.909,
                        "end": 102.53
                    },
                    {
                        "word": "response",
                        "start": 102.61,
                        "end": 103.071
                    },
                    {
                        "word": "this",
                        "start": 103.091,
                        "end": 103.331
                    },
                    {
                        "word": "time",
                        "start": 103.391,
                        "end": 103.632
                    },
                    {
                        "word": "was",
                        "start": 103.952,
                        "end": 104.152
                    },
                    {
                        "word": "to",
                        "start": 104.233,
                        "end": 104.373
                    },
                    {
                        "word": "advise",
                        "start": 104.393,
                        "end": 104.934
                    },
                    {
                        "word": "me",
                        "start": 105.014,
                        "end": 105.174
                    },
                    {
                        "word": "to",
                        "start": 105.455,
                        "end": 105.575
                    },
                    {
                        "word": "lay",
                        "start": 105.675,
                        "end": 105.936
                    },
                    {
                        "word": "aside",
                        "start": 105.976,
                        "end": 106.476
                    },
                    {
                        "word": "my",
                        "start": 106.517,
                        "end": 106.817
                    },
                    {
                        "word": "drawings",
                        "start": 106.877,
                        "end": 107.398
                    },
                    {
                        "word": "of",
                        "start": 107.839,
                        "end": 107.899
                    },
                    {
                        "word": "boa",
                        "start": 107.999,
                        "end": 108.3
                    },
                    {
                        "word": "constrictors,",
                        "start": 108.34,
                        "end": 109.081
                    },
                    {
                        "word": "whether",
                        "start": 109.822,
                        "end": 110.163
                    },
                    {
                        "word": "from",
                        "start": 110.323,
                        "end": 110.483
                    },
                    {
                        "word": "the",
                        "start": 110.503,
                        "end": 110.624
                    },
                    {
                        "word": "inside",
                        "start": 110.764,
                        "end": 111.285
                    },
                    {
                        "word": "or",
                        "start": 111.325,
                        "end": 111.706
                    },
                    {
                        "word": "the",
                        "start": 111.746,
                        "end": 111.926
                    },
                    {
                        "word": "outside,",
                        "start": 112.066,
                        "end": 112.547
                    },
                    {
                        "word": "and",
                        "start": 113.348,
                        "end": 113.469
                    },
                    {
                        "word": "devote",
                        "start": 113.509,
                        "end": 114.11
                    },
                    {
                        "word": "myself",
                        "start": 114.15,
                        "end": 114.691
                    },
                    {
                        "word": "instead",
                        "start": 114.851,
                        "end": 115.272
                    },
                    {
                        "word": "to",
                        "start": 115.312,
                        "end": 115.753
                    },
                    {
                        "word": "geography,",
                        "start": 115.833,
                        "end": 116.474
                    },
                    {
                        "word": "history,",
                        "start": 117.075,
                        "end": 117.516
                    },
                    {
                        "word": "arithmetic,",
                        "start": 118.157,
                        "end": 118.818
                    },
                    {
                        "word": "and",
                        "start": 119.459,
                        "end": 119.599
                    },
                    {
                        "word": "grammar.",
                        "start": 119.679,
                        "end": 120.08
                    },
                    {
                        "word": "That",
                        "start": 121.262,
                        "end": 121.482
                    },
                    {
                        "word": "is",
                        "start": 121.522,
                        "end": 121.743
                    },
                    {
                        "word": "why,",
                        "start": 121.843,
                        "end": 122.204
                    },
                    {
                        "word": "at",
                        "start": 122.244,
                        "end": 122.584
                    },
                    {
                        "word": "the",
                        "start": 122.624,
                        "end": 122.725
                    },
                    {
                        "word": "age",
                        "start": 122.905,
                        "end": 123.085
                    },
                    {
                        "word": "of",
                        "start": 123.145,
                        "end": 123.205
                    },
                    {
                        "word": "six,",
                        "start": 123.245,
                        "end": 124.167
                    },
                    {
                        "word": "I",
                        "start": 124.147,
                        "end": 124.468
                    },
                    {
                        "word": "gave",
                        "start": 124.488,
                        "end": 124.729
                    },
                    {
                        "word": "up",
                        "start": 124.829,
                        "end": 124.909
                    },
                    {
                        "word": "what",
                        "start": 125.15,
                        "end": 125.33
                    },
                    {
                        "word": "might",
                        "start": 125.451,
                        "end": 125.651
                    },
                    {
                        "word": "have",
                        "start": 125.731,
                        "end": 125.872
                    },
                    {
                        "word": "been",
                        "start": 125.952,
                        "end": 126.152
                    },
                    {
                        "word": "a",
                        "start": 126.172,
                        "end": 126.193
                    },
                    {
                        "word": "magnificent",
                        "start": 126.493,
                        "end": 127.296
                    },
                    {
                        "word": "career",
                        "start": 127.376,
                        "end": 127.757
                    },
                    {
                        "word": "as",
                        "start": 127.777,
                        "end": 128.198
                    },
                    {
                        "word": "a",
                        "start": 128.238,
                        "end": 128.298
                    },
                    {
                        "word": "painter.",
                        "start": 128.358,
                        "end": 128.719
                    },
                    {
                        "word": "I",
                        "start": 129.903,
                        "end": 129.963
                    },
                    {
                        "word": "had",
                        "start": 130.043,
                        "end": 130.163
                    },
                    {
                        "word": "been",
                        "start": 130.203,
                        "end": 130.444
                    },
                    {
                        "word": "disheartened",
                        "start": 130.564,
                        "end": 131.286
                    },
                    {
                        "word": "by",
                        "start": 131.326,
                        "end": 131.888
                    },
                    {
                        "word": "the",
                        "start": 131.928,
                        "end": 132.008
                    },
                    {
                        "word": "failure",
                        "start": 132.109,
                        "end": 132.53
                    },
                    {
                        "word": "of",
                        "start": 132.831,
                        "end": 132.891
                    },
                    {
                        "word": "my",
                        "start": 132.971,
                        "end": 133.091
                    },
                    {
                        "word": "drawing",
                        "start": 133.131,
                        "end": 133.472
                    },
                    {
                        "word": "number",
                        "start": 133.532,
                        "end": 133.833
                    },
                    {
                        "word": "one",
                        "start": 134.014,
                        "end": 134.114
                    },
                    {
                        "word": "and",
                        "start": 134.676,
                        "end": 134.836
                    },
                    {
                        "word": "my",
                        "start": 134.876,
                        "end": 135.016
                    },
                    {
                        "word": "drawing",
                        "start": 135.037,
                        "end": 135.357
                    },
                    {
                        "word": "number",
                        "start": 135.397,
                        "end": 135.618
                    },
                    {
                        "word": "two.",
                        "start": 135.658,
                        "end": 135.979
                    },
                    {
                        "word": "Grown-ups",
                        "start": 137.191,
                        "end": 137.912
                    },
                    {
                        "word": "never",
                        "start": 138.193,
                        "end": 138.473
                    },
                    {
                        "word": "understand",
                        "start": 138.593,
                        "end": 139.214
                    },
                    {
                        "word": "anything",
                        "start": 139.254,
                        "end": 139.855
                    },
                    {
                        "word": "by",
                        "start": 140.035,
                        "end": 140.156
                    },
                    {
                        "word": "themselves,",
                        "start": 140.216,
                        "end": 140.797
                    },
                    {
                        "word": "and",
                        "start": 141.598,
                        "end": 141.738
                    },
                    {
                        "word": "it",
                        "start": 141.778,
                        "end": 141.818
                    },
                    {
                        "word": "is",
                        "start": 141.998,
                        "end": 142.219
                    },
                    {
                        "word": "tiresome",
                        "start": 142.239,
                        "end": 142.9
                    },
                    {
                        "word": "for",
                        "start": 143.12,
                        "end": 143.26
                    },
                    {
                        "word": "children",
                        "start": 143.32,
                        "end": 143.761
                    },
                    {
                        "word": "to",
                        "start": 144.102,
                        "end": 144.202
                    },
                    {
                        "word": "be",
                        "start": 144.262,
                        "end": 144.342
                    },
                    {
                        "word": "always",
                        "start": 144.522,
                        "end": 144.903
                    },
                    {
                        "word": "and",
                        "start": 145.083,
                        "end": 145.243
                    },
                    {
                        "word": "forever",
                        "start": 145.283,
                        "end": 145.684
                    },
                    {
                        "word": "explaining",
                        "start": 145.724,
                        "end": 146.465
                    },
                    {
                        "word": "things",
                        "start": 146.525,
                        "end": 146.766
                    },
                    {
                        "word": "to",
                        "start": 146.826,
                        "end": 146.966
                    },
                    {
                        "word": "them.",
                        "start": 147.026,
                        "end": 147.166
                    }
                ],
                "img": "imgs/chapter_0/s0006.png"
            },
            {
                "text": "So then I chose another profession, and learned to pilot airplanes. I have flown a little over all parts of the world; and it is true that geography has been very useful to me. At a glance I can distinguish China from Arizona. If one gets lost in the night, such knowledge is valuable.",
                "start": 148.028,
                "end": 171.918,
                "words": [
                    {
                        "word": "So",
                        "start": 148.028,
                        "end": 148.308
                    },
                    {
                        "word": "then",
                        "start": 148.348,
                        "end": 148.749
                    },
                    {
                        "word": "I",
                        "start": 148.969,
                        "end": 149.029
                    },
                    {
                        "word": "chose",
                        "start": 149.109,
                        "end": 149.45
                    },
                    {
                        "word": "another",
                        "start": 149.49,
                        "end": 150.031
                    },
                    {
                        "word": "profession",
                        "start": 150.111,
                        "end": 150.612
                    },
                    {
                        "word": "and",
                        "start": 151.193,
                        "end": 151.353
                    },
                    {
                        "word": "learned",
                        "start": 151.393,
                        "end": 151.934
                    },
                    {
                        "word": "to",
                        "start": 151.954,
                        "end": 151.994
                    },
                    {
                        "word": "pilot",
                        "start": 152.274,
                        "end": 152.595
                    },
                    {
                        "word": "airplanes.",
                        "start": 152.715,
                        "end": 153.256
                    },
                    {
                        "word": "I",
                        "start": 154.277,
                        "end": 154.357
                    },
                    {
                        "word": "have",
                        "start": 154.418,
                        "end": 154.558
                    },
                    {
                        "word": "flown",
                        "start": 154.638,
                        "end": 154.978
                    },
                    {
                        "word": "a",
                        "start": 154.998,
                        "end": 155.019
                    },
                    {
                        "word": "little",
                        "start": 155.219,
                        "end": 155.459
                    },
                    {
                        "word": "over",
                        "start": 155.519,
                        "end": 155.659
                    },
                    {
                        "word": "all",
                        "start": 155.86,
                        "end": 156.02
                    },
                    {
                        "word": "parts",
                        "start": 156.1,
                        "end": 156.381
                    },
                    {
                        "word": "of",
                        "start": 156.441,
                        "end": 156.501
                    },
                    {
                        "word": "the",
                        "start": 156.521,
                        "end": 156.641
                    },
                    {
                        "word": "world,",
                        "start": 156.681,
                        "end": 157.002
                    },
                    {
                        "word": "and",
                        "start": 157.763,
                        "end": 157.883
                    },
                    {
                        "word": "it",
                        "start": 157.903,
                        "end": 157.943
                    },
                    {
                        "word": "is",
                        "start": 158.143,
                        "end": 158.384
                    },
                    {
                        "word": "true",
                        "start": 158.404,
                        "end": 158.804
                    },
                    {
                        "word": "that",
                        "start": 158.824,
                        "end": 159.325
                    },
                    {
                        "word": "geography",
                        "start": 159.365,
                        "end": 160.247
                    },
                    {
                        "word": "has",
                        "start": 160.387,
                        "end": 160.547
                    },
                    {
                        "word": "been",
                        "start": 160.667,
                        "end": 160.868
                    },
                    {
                        "word": "very",
                        "start": 161.088,
                        "end": 161.428
                    },
                    {
                        "word": "useful",
                        "start": 161.609,
                        "end": 161.969
                    },
                    {
                        "word": "to",
                        "start": 162.029,
                        "end": 162.129
                    },
                    {
                        "word": "me.",
                        "start": 162.19,
                        "end": 162.49
                    },
                    {
                        "word": "At",
                        "start": 163.246,
                        "end": 163.466
                    },
                    {
                        "word": "a",
                        "start": 163.546,
                        "end": 163.566
                    },
                    {
                        "word": "glance,",
                        "start": 163.647,
                        "end": 164.107
                    },
                    {
                        "word": "I",
                        "start": 164.368,
                        "end": 164.408
                    },
                    {
                        "word": "can",
                        "start": 164.468,
                        "end": 164.588
                    },
                    {
                        "word": "distinguish",
                        "start": 164.668,
                        "end": 165.309
                    },
                    {
                        "word": "China",
                        "start": 165.409,
                        "end": 165.83
                    },
                    {
                        "word": "from",
                        "start": 166.13,
                        "end": 166.27
                    },
                    {
                        "word": "Arizona.",
                        "start": 166.411,
                        "end": 166.971
                    },
                    {
                        "word": "If",
                        "start": 167.813,
                        "end": 167.893
                    },
                    {
                        "word": "one",
                        "start": 168.093,
                        "end": 168.193
                    },
                    {
                        "word": "gets",
                        "start": 168.273,
                        "end": 168.514
                    },
                    {
                        "word": "lost",
                        "start": 168.574,
                        "end": 168.874
                    },
                    {
                        "word": "in",
                        "start": 168.914,
                        "end": 169.054
                    },
                    {
                        "word": "the",
                        "start": 169.094,
                        "end": 169.155
                    },
                    {
                        "word": "night,",
                        "start": 169.235,
                        "end": 169.495
                    },
                    {
                        "word": "such",
                        "start": 170.116,
                        "end": 170.356
                    },
                    {
                        "word": "knowledge",
                        "start": 170.436,
                        "end": 170.797
                    },
                    {
                        "word": "is",
                        "start": 170.817,
                        "end": 171.358
                    },
                    {
                        "word": "valuable.",
                        "start": 171.478,
                        "end": 171.918
                    }
                ],
                "img": "imgs/chapter_0/s0007.png"
            },
            {
                "text": "In the course of this life I have had a great many encounters with a great many people who have been concerned with matters of consequence. I have lived a great deal among grown-ups. I have seen them intimately, close at hand. And that hasn't much improved my opinion of them.",
                "start": 173.341,
                "end": 196.442,
                "words": [
                    {
                        "word": "In",
                        "start": 173.341,
                        "end": 173.421
                    },
                    {
                        "word": "the",
                        "start": 173.481,
                        "end": 173.561
                    },
                    {
                        "word": "course",
                        "start": 173.641,
                        "end": 173.961
                    },
                    {
                        "word": "of",
                        "start": 174.122,
                        "end": 174.182
                    },
                    {
                        "word": "this",
                        "start": 174.202,
                        "end": 174.522
                    },
                    {
                        "word": "life,",
                        "start": 174.642,
                        "end": 174.903
                    },
                    {
                        "word": "I",
                        "start": 175.544,
                        "end": 175.604
                    },
                    {
                        "word": "have",
                        "start": 175.684,
                        "end": 175.884
                    },
                    {
                        "word": "had",
                        "start": 175.964,
                        "end": 176.185
                    },
                    {
                        "word": "a",
                        "start": 176.205,
                        "end": 176.225
                    },
                    {
                        "word": "great",
                        "start": 176.665,
                        "end": 176.966
                    },
                    {
                        "word": "many",
                        "start": 177.046,
                        "end": 177.246
                    },
                    {
                        "word": "encounters",
                        "start": 177.326,
                        "end": 177.927
                    },
                    {
                        "word": "with",
                        "start": 177.967,
                        "end": 178.368
                    },
                    {
                        "word": "a",
                        "start": 178.388,
                        "end": 178.408
                    },
                    {
                        "word": "great",
                        "start": 178.608,
                        "end": 178.848
                    },
                    {
                        "word": "many",
                        "start": 178.909,
                        "end": 179.129
                    },
                    {
                        "word": "people",
                        "start": 179.189,
                        "end": 179.509
                    },
                    {
                        "word": "who",
                        "start": 179.99,
                        "end": 180.13
                    },
                    {
                        "word": "have",
                        "start": 180.17,
                        "end": 180.291
                    },
                    {
                        "word": "been",
                        "start": 180.351,
                        "end": 180.511
                    },
                    {
                        "word": "concerned",
                        "start": 180.591,
                        "end": 181.252
                    },
                    {
                        "word": "with",
                        "start": 181.292,
                        "end": 181.552
                    },
                    {
                        "word": "matters",
                        "start": 181.673,
                        "end": 182.093
                    },
                    {
                        "word": "of",
                        "start": 182.133,
                        "end": 182.374
                    },
                    {
                        "word": "consequences.",
                        "start": 182.414,
                        "end": 183.415
                    },
                    {
                        "word": "I",
                        "start": 184.441,
                        "end": 184.642
                    },
                    {
                        "word": "have",
                        "start": 184.682,
                        "end": 184.842
                    },
                    {
                        "word": "lived",
                        "start": 184.943,
                        "end": 185.284
                    },
                    {
                        "word": "a",
                        "start": 185.565,
                        "end": 185.605
                    },
                    {
                        "word": "great",
                        "start": 185.685,
                        "end": 185.906
                    },
                    {
                        "word": "deal",
                        "start": 185.966,
                        "end": 186.207
                    },
                    {
                        "word": "among",
                        "start": 186.247,
                        "end": 186.869
                    },
                    {
                        "word": "grown-ups,",
                        "start": 186.93,
                        "end": 187.471
                    },
                    {
                        "word": "I",
                        "start": 188.575,
                        "end": 188.635
                    },
                    {
                        "word": "have",
                        "start": 188.675,
                        "end": 188.816
                    },
                    {
                        "word": "seen",
                        "start": 188.956,
                        "end": 189.157
                    },
                    {
                        "word": "them",
                        "start": 189.197,
                        "end": 189.338
                    },
                    {
                        "word": "intimately,",
                        "start": 189.559,
                        "end": 190.141
                    },
                    {
                        "word": "close",
                        "start": 190.763,
                        "end": 191.204
                    },
                    {
                        "word": "at",
                        "start": 191.304,
                        "end": 191.365
                    },
                    {
                        "word": "hand,",
                        "start": 191.445,
                        "end": 191.746
                    },
                    {
                        "word": "and",
                        "start": 192.649,
                        "end": 192.79
                    },
                    {
                        "word": "that",
                        "start": 192.83,
                        "end": 193.271
                    },
                    {
                        "word": "hasn't",
                        "start": 193.452,
                        "end": 193.813
                    },
                    {
                        "word": "much",
                        "start": 193.913,
                        "end": 194.134
                    },
                    {
                        "word": "improved",
                        "start": 194.315,
                        "end": 194.997
                    },
                    {
                        "word": "my",
                        "start": 195.037,
                        "end": 195.419
                    },
                    {
                        "word": "opinion",
                        "start": 195.559,
                        "end": 196.021
                    },
                    {
                        "word": "of",
                        "start": 196.101,
                        "end": 196.161
                    },
                    {
                        "word": "them.",
                        "start": 196.221,
                        "end": 196.442
                    }
                ],
                "img": "imgs/chapter_0/s0008.png"
            },
            {
                "text": "Whenever I met one of them who seemed to me at all clear-sighted, I tried the experiment of showing him my Drawing Number One, which I have always kept. I would try to find out, so, if this was a person of true understanding. But, whoever it was, he, or she, would always say:",
                "start": 197.435,
                "end": 220.446,
                "words": [
                    {
                        "word": "Whenever",
                        "start": 197.435,
                        "end": 197.976
                    },
                    {
                        "word": "I",
                        "start": 198.116,
                        "end": 198.156
                    },
                    {
                        "word": "met",
                        "start": 198.276,
                        "end": 198.517
                    },
                    {
                        "word": "one",
                        "start": 198.557,
                        "end": 198.977
                    },
                    {
                        "word": "of",
                        "start": 199.038,
                        "end": 199.098
                    },
                    {
                        "word": "them",
                        "start": 199.158,
                        "end": 199.298
                    },
                    {
                        "word": "who",
                        "start": 199.458,
                        "end": 199.598
                    },
                    {
                        "word": "seemed",
                        "start": 199.759,
                        "end": 200.119
                    },
                    {
                        "word": "to",
                        "start": 200.139,
                        "end": 200.34
                    },
                    {
                        "word": "me",
                        "start": 200.4,
                        "end": 200.52
                    },
                    {
                        "word": "at",
                        "start": 200.56,
                        "end": 200.84
                    },
                    {
                        "word": "all",
                        "start": 200.86,
                        "end": 201.221
                    },
                    {
                        "word": "clear-sighted,",
                        "start": 201.361,
                        "end": 202.042
                    },
                    {
                        "word": "I",
                        "start": 202.082,
                        "end": 202.904
                    },
                    {
                        "word": "tried",
                        "start": 203.064,
                        "end": 203.445
                    },
                    {
                        "word": "the",
                        "start": 203.465,
                        "end": 203.805
                    },
                    {
                        "word": "experiment",
                        "start": 203.905,
                        "end": 204.566
                    },
                    {
                        "word": "of",
                        "start": 204.807,
                        "end": 204.867
                    },
                    {
                        "word": "showing",
                        "start": 205.007,
                        "end": 205.328
                    },
                    {
                        "word": "him",
                        "start": 205.408,
                        "end": 205.528
                    },
                    {
                        "word": "my",
                        "start": 205.788,
                        "end": 206.049
                    },
                    {
                        "word": "drawing",
                        "start": 206.149,
                        "end": 206.469
                    },
                    {
                        "word": "number",
                        "start": 206.569,
                        "end": 206.81
                    },
                    {
                        "word": "one,",
                        "start": 206.95,
                        "end": 207.09
                    },
                    {
                        "word": "which",
                        "start": 207.852,
                        "end": 208.032
                    },
                    {
                        "word": "I",
                        "start": 208.232,
                        "end": 208.292
                    },
                    {
                        "word": "have",
                        "start": 208.352,
                        "end": 208.493
                    },
                    {
                        "word": "always",
                        "start": 208.633,
                        "end": 208.893
                    },
                    {
                        "word": "kept.",
                        "start": 209.013,
                        "end": 209.314
                    },
                    {
                        "word": "I",
                        "start": 210.135,
                        "end": 210.195
                    },
                    {
                        "word": "would",
                        "start": 210.235,
                        "end": 210.416
                    },
                    {
                        "word": "try",
                        "start": 210.456,
                        "end": 210.636
                    },
                    {
                        "word": "to",
                        "start": 210.676,
                        "end": 210.776
                    },
                    {
                        "word": "find",
                        "start": 210.856,
                        "end": 211.097
                    },
                    {
                        "word": "out",
                        "start": 211.277,
                        "end": 211.397
                    },
                    {
                        "word": "so",
                        "start": 211.858,
                        "end": 212.018
                    },
                    {
                        "word": "if",
                        "start": 212.399,
                        "end": 212.459
                    },
                    {
                        "word": "this",
                        "start": 212.579,
                        "end": 212.759
                    },
                    {
                        "word": "was",
                        "start": 212.839,
                        "end": 213.0
                    },
                    {
                        "word": "a",
                        "start": 213.02,
                        "end": 213.04
                    },
                    {
                        "word": "person",
                        "start": 213.16,
                        "end": 213.581
                    },
                    {
                        "word": "of",
                        "start": 213.601,
                        "end": 213.841
                    },
                    {
                        "word": "true",
                        "start": 213.881,
                        "end": 214.202
                    },
                    {
                        "word": "understanding.",
                        "start": 214.342,
                        "end": 215.123
                    },
                    {
                        "word": "But",
                        "start": 216.2,
                        "end": 216.38
                    },
                    {
                        "word": "whoever",
                        "start": 216.48,
                        "end": 217.081
                    },
                    {
                        "word": "it",
                        "start": 217.322,
                        "end": 217.402
                    },
                    {
                        "word": "was,",
                        "start": 217.502,
                        "end": 217.802
                    },
                    {
                        "word": "he",
                        "start": 218.323,
                        "end": 218.483
                    },
                    {
                        "word": "or",
                        "start": 218.683,
                        "end": 218.764
                    },
                    {
                        "word": "she",
                        "start": 218.864,
                        "end": 219.104
                    },
                    {
                        "word": "would",
                        "start": 219.485,
                        "end": 219.665
                    },
                    {
                        "word": "always",
                        "start": 219.765,
                        "end": 220.065
                    },
                    {
                        "word": "say,",
                        "start": 220.165,
                        "end": 220.446
                    }
                ],
                "img": "imgs/chapter_0/s0009.png"
            },
            {
                "text": "\"That is a hat.\"",
                "start": 5.245,
                "end": 247.388,
                "words": [
                    {
                        "word": "Once",
                        "start": 5.245,
                        "end": 5.766
                    },
                    {
                        "word": "when",
                        "start": 5.886,
                        "end": 6.026
                    },
                    {
                        "word": "I",
                        "start": 6.086,
                        "end": 6.126
                    },
                    {
                        "word": "was",
                        "start": 6.186,
                        "end": 6.326
                    },
                    {
                        "word": "six",
                        "start": 6.446,
                        "end": 6.707
                    },
                    {
                        "word": "years",
                        "start": 6.747,
                        "end": 6.947
                    },
                    {
                        "word": "old,",
                        "start": 7.127,
                        "end": 7.308
                    },
                    {
                        "word": "I",
                        "start": 7.328,
                        "end": 7.348
                    },
                    {
                        "word": "saw",
                        "start": 7.988,
                        "end": 8.309
                    },
                    {
                        "word": "a",
                        "start": 8.649,
                        "end": 8.669
                    },
                    {
                        "word": "magnificent",
                        "start": 8.689,
                        "end": 9.33
                    },
                    {
                        "word": "picture",
                        "start": 9.41,
                        "end": 9.831
                    },
                    {
                        "word": "in",
                        "start": 9.871,
                        "end": 10.271
                    },
                    {
                        "word": "a",
                        "start": 10.371,
                        "end": 10.391
                    },
                    {
                        "word": "book",
                        "start": 10.431,
                        "end": 10.692
                    },
                    {
                        "word": "called",
                        "start": 11.232,
                        "end": 11.513
                    },
                    {
                        "word": "True",
                        "start": 11.553,
                        "end": 12.013
                    },
                    {
                        "word": "Stories",
                        "start": 12.073,
                        "end": 12.514
                    },
                    {
                        "word": "from",
                        "start": 12.774,
                        "end": 12.935
                    },
                    {
                        "word": "Nature",
                        "start": 12.975,
                        "end": 13.395
                    },
                    {
                        "word": "about",
                        "start": 13.415,
                        "end": 14.917
                    },
                    {
                        "word": "the",
                        "start": 14.957,
                        "end": 15.177
                    },
                    {
                        "word": "primeval",
                        "start": 15.217,
                        "end": 15.738
                    },
                    {
                        "word": "forest.",
                        "start": 15.798,
                        "end": 16.219
                    },
                    {
                        "word": "It",
                        "start": 17.5,
                        "end": 17.58
                    },
                    {
                        "word": "was",
                        "start": 17.66,
                        "end": 17.841
                    },
                    {
                        "word": "a",
                        "start": 17.921,
                        "end": 17.961
                    },
                    {
                        "word": "picture",
                        "start": 18.021,
                        "end": 18.481
                    },
                    {
                        "word": "of",
                        "start": 18.521,
                        "end": 18.782
                    },
                    {
                        "word": "a",
                        "start": 18.862,
                        "end": 18.902
                    },
                    {
                        "word": "boa",
                        "start": 18.942,
                        "end": 19.262
                    },
                    {
                        "word": "constrictor",
                        "start": 19.322,
                        "end": 19.983
                    },
                    {
                        "word": "in",
                        "start": 20.324,
                        "end": 20.384
                    },
                    {
                        "word": "the",
                        "start": 20.424,
                        "end": 20.504
                    },
                    {
                        "word": "act",
                        "start": 20.744,
                        "end": 20.985
                    },
                    {
                        "word": "of",
                        "start": 21.285,
                        "end": 21.345
                    },
                    {
                        "word": "swallowing",
                        "start": 21.385,
                        "end": 21.986
                    },
                    {
                        "word": "an",
                        "start": 22.006,
                        "end": 22.046
                    },
                    {
                        "word": "animal.",
                        "start": 22.146,
                        "end": 22.647
                    },
                    {
                        "word": "Here",
                        "start": 23.548,
                        "end": 23.868
                    },
                    {
                        "word": "is",
                        "start": 23.908,
                        "end": 24.148
                    },
                    {
                        "word": "a",
                        "start": 24.209,
                        "end": 24.229
                    },
                    {
                        "word": "copy",
                        "start": 24.289,
                        "end": 24.669
                    },
                    {
                        "word": "of",
                        "start": 24.909,
                        "end": 24.949
                    },
                    {
                        "word": "the",
                        "start": 24.989,
                        "end": 25.07
                    },
                    {
                        "word": "drawing.",
                        "start": 25.11,
                        "end": 25.43
                    },
                    {
                        "word": "In",
                        "start": 26.591,
                        "end": 26.672
                    },
                    {
                        "word": "the",
                        "start": 26.732,
                        "end": 26.832
                    },
                    {
                        "word": "book,",
                        "start": 26.892,
                        "end": 27.152
                    },
                    {
                        "word": "it",
                        "start": 27.332,
                        "end": 27.412
                    },
                    {
                        "word": "said,",
                        "start": 27.513,
                        "end": 27.713
                    },
                    {
                        "word": "Boa",
                        "start": 28.173,
                        "end": 28.494
                    },
                    {
                        "word": "constrictors",
                        "start": 28.534,
                        "end": 29.175
                    },
                    {
                        "word": "swallow",
                        "start": 29.215,
                        "end": 29.916
                    },
                    {
                        "word": "their",
                        "start": 29.976,
                        "end": 30.136
                    },
                    {
                        "word": "prey",
                        "start": 30.236,
                        "end": 30.556
                    },
                    {
                        "word": "whole",
                        "start": 30.697,
                        "end": 30.997
                    },
                    {
                        "word": "without",
                        "start": 31.478,
                        "end": 31.958
                    },
                    {
                        "word": "chewing",
                        "start": 32.158,
                        "end": 32.499
                    },
                    {
                        "word": "it.",
                        "start": 32.559,
                        "end": 33.48
                    },
                    {
                        "word": "After",
                        "start": 33.46,
                        "end": 33.961
                    },
                    {
                        "word": "that,",
                        "start": 34.021,
                        "end": 34.221
                    },
                    {
                        "word": "they",
                        "start": 34.601,
                        "end": 34.782
                    },
                    {
                        "word": "are",
                        "start": 34.882,
                        "end": 34.982
                    },
                    {
                        "word": "not",
                        "start": 35.062,
                        "end": 35.262
                    },
                    {
                        "word": "able",
                        "start": 35.463,
                        "end": 35.643
                    },
                    {
                        "word": "to",
                        "start": 35.703,
                        "end": 35.783
                    },
                    {
                        "word": "move,",
                        "start": 35.863,
                        "end": 36.163
                    },
                    {
                        "word": "and",
                        "start": 36.764,
                        "end": 36.864
                    },
                    {
                        "word": "they",
                        "start": 36.924,
                        "end": 37.065
                    },
                    {
                        "word": "sleep",
                        "start": 37.125,
                        "end": 37.585
                    },
                    {
                        "word": "through",
                        "start": 37.785,
                        "end": 38.006
                    },
                    {
                        "word": "the",
                        "start": 38.046,
                        "end": 38.146
                    },
                    {
                        "word": "six",
                        "start": 38.226,
                        "end": 38.446
                    },
                    {
                        "word": "months",
                        "start": 38.506,
                        "end": 38.747
                    },
                    {
                        "word": "that",
                        "start": 38.807,
                        "end": 38.967
                    },
                    {
                        "word": "they",
                        "start": 38.987,
                        "end": 39.147
                    },
                    {
                        "word": "need",
                        "start": 39.187,
                        "end": 39.508
                    },
                    {
                        "word": "for",
                        "start": 39.688,
                        "end": 39.848
                    },
                    {
                        "word": "digestion.",
                        "start": 39.908,
                        "end": 40.489
                    },
                    {
                        "word": "I",
                        "start": 41.49,
                        "end": 41.55
                    },
                    {
                        "word": "pondered",
                        "start": 41.75,
                        "end": 42.211
                    },
                    {
                        "word": "deeply",
                        "start": 42.231,
                        "end": 42.932
                    },
                    {
                        "word": "then",
                        "start": 42.952,
                        "end": 43.553
                    },
                    {
                        "word": "over",
                        "start": 43.593,
                        "end": 44.053
                    },
                    {
                        "word": "the",
                        "start": 44.093,
                        "end": 44.214
                    },
                    {
                        "word": "adventures",
                        "start": 44.334,
                        "end": 44.894
                    },
                    {
                        "word": "of",
                        "start": 44.914,
                        "end": 45.175
                    },
                    {
                        "word": "the",
                        "start": 45.215,
                        "end": 45.315
                    },
                    {
                        "word": "jungle,",
                        "start": 45.355,
                        "end": 45.796
                    },
                    {
                        "word": "and",
                        "start": 46.757,
                        "end": 46.877
                    },
                    {
                        "word": "after",
                        "start": 47.217,
                        "end": 47.538
                    },
                    {
                        "word": "some",
                        "start": 47.578,
                        "end": 47.898
                    },
                    {
                        "word": "work",
                        "start": 47.958,
                        "end": 48.259
                    },
                    {
                        "word": "with",
                        "start": 48.399,
                        "end": 48.539
                    },
                    {
                        "word": "a",
                        "start": 48.559,
                        "end": 48.579
                    },
                    {
                        "word": "coloured",
                        "start": 48.619,
                        "end": 49.18
                    },
                    {
                        "word": "pencil,",
                        "start": 49.3,
                        "end": 49.801
                    },
                    {
                        "word": "I",
                        "start": 50.482,
                        "end": 50.522
                    },
                    {
                        "word": "succeeded",
                        "start": 50.662,
                        "end": 51.182
                    },
                    {
                        "word": "in",
                        "start": 51.222,
                        "end": 51.623
                    },
                    {
                        "word": "making",
                        "start": 51.723,
                        "end": 52.023
                    },
                    {
                        "word": "my",
                        "start": 52.084,
                        "end": 52.224
                    },
                    {
                        "word": "first",
                        "start": 52.304,
                        "end": 52.604
                    },
                    {
                        "word": "drawing,",
                        "start": 52.744,
                        "end": 53.145
                    },
                    {
                        "word": "my",
                        "start": 53.926,
                        "end": 54.086
                    },
                    {
                        "word": "drawing",
                        "start": 54.126,
                        "end": 54.427
                    },
                    {
                        "word": "number",
                        "start": 54.487,
                        "end": 54.727
                    },
                    {
                        "word": "one.",
                        "start": 54.867,
                        "end": 55.007
                    },
                    {
                        "word": "It",
                        "start": 55.868,
                        "end": 55.948
                    },
                    {
                        "word": "looks",
                        "start": 56.089,
                        "end": 56.429
                    },
                    {
                        "word": "like",
                        "start": 56.569,
                        "end": 56.749
                    },
                    {
                        "word": "this.",
                        "start": 56.81,
                        "end": 57.19
                    },
                    {
                        "word": "I",
                        "start": 58.3,
                        "end": 58.54
                    },
                    {
                        "word": "showed",
                        "start": 58.56,
                        "end": 59.041
                    },
                    {
                        "word": "my",
                        "start": 59.081,
                        "end": 59.361
                    },
                    {
                        "word": "masterpiece",
                        "start": 59.422,
                        "end": 60.122
                    },
                    {
                        "word": "to",
                        "start": 60.363,
                        "end": 60.483
                    },
                    {
                        "word": "the",
                        "start": 60.523,
                        "end": 60.583
                    },
                    {
                        "word": "grown-ups",
                        "start": 60.643,
                        "end": 61.224
                    },
                    {
                        "word": "and",
                        "start": 61.825,
                        "end": 61.925
                    },
                    {
                        "word": "asked",
                        "start": 61.965,
                        "end": 62.406
                    },
                    {
                        "word": "them",
                        "start": 62.446,
                        "end": 62.606
                    },
                    {
                        "word": "whether",
                        "start": 62.926,
                        "end": 63.247
                    },
                    {
                        "word": "the",
                        "start": 63.287,
                        "end": 63.507
                    },
                    {
                        "word": "drawing",
                        "start": 63.567,
                        "end": 63.968
                    },
                    {
                        "word": "frightened",
                        "start": 64.148,
                        "end": 64.609
                    },
                    {
                        "word": "them.",
                        "start": 64.669,
                        "end": 64.829
                    },
                    {
                        "word": "But",
                        "start": 65.89,
                        "end": 66.011
                    },
                    {
                        "word": "they",
                        "start": 66.091,
                        "end": 66.271
                    },
                    {
                        "word": "answered,",
                        "start": 66.311,
                        "end": 66.852
                    },
                    {
                        "word": "frightened?",
                        "start": 67.573,
                        "end": 68.013
                    },
                    {
                        "word": "Why",
                        "start": 68.754,
                        "end": 68.995
                    },
                    {
                        "word": "should",
                        "start": 69.015,
                        "end": 69.295
                    },
                    {
                        "word": "anyone",
                        "start": 69.415,
                        "end": 69.716
                    },
                    {
                        "word": "be",
                        "start": 69.756,
                        "end": 69.836
                    },
                    {
                        "word": "frightened",
                        "start": 69.876,
                        "end": 70.216
                    },
                    {
                        "word": "by",
                        "start": 70.296,
                        "end": 70.457
                    },
                    {
                        "word": "a",
                        "start": 70.557,
                        "end": 70.617
                    },
                    {
                        "word": "hat?",
                        "start": 70.677,
                        "end": 71.017
                    },
                    {
                        "word": "My",
                        "start": 72.6,
                        "end": 72.78
                    },
                    {
                        "word": "drawing",
                        "start": 72.84,
                        "end": 73.321
                    },
                    {
                        "word": "was",
                        "start": 73.581,
                        "end": 73.741
                    },
                    {
                        "word": "not",
                        "start": 73.861,
                        "end": 74.042
                    },
                    {
                        "word": "a",
                        "start": 74.162,
                        "end": 74.202
                    },
                    {
                        "word": "picture",
                        "start": 74.262,
                        "end": 74.682
                    },
                    {
                        "word": "of",
                        "start": 74.823,
                        "end": 74.863
                    },
                    {
                        "word": "a",
                        "start": 74.963,
                        "end": 75.003
                    },
                    {
                        "word": "hat,",
                        "start": 75.083,
                        "end": 75.444
                    },
                    {
                        "word": "it",
                        "start": 75.844,
                        "end": 75.904
                    },
                    {
                        "word": "was",
                        "start": 75.984,
                        "end": 76.104
                    },
                    {
                        "word": "a",
                        "start": 76.185,
                        "end": 76.205
                    },
                    {
                        "word": "picture",
                        "start": 76.265,
                        "end": 76.685
                    },
                    {
                        "word": "of",
                        "start": 76.725,
                        "end": 77.026
                    },
                    {
                        "word": "a",
                        "start": 77.106,
                        "end": 77.126
                    },
                    {
                        "word": "boa",
                        "start": 77.166,
                        "end": 77.486
                    },
                    {
                        "word": "constrictor",
                        "start": 77.506,
                        "end": 78.187
                    },
                    {
                        "word": "digesting",
                        "start": 78.528,
                        "end": 79.169
                    },
                    {
                        "word": "an",
                        "start": 79.349,
                        "end": 79.509
                    },
                    {
                        "word": "elephant.",
                        "start": 79.569,
                        "end": 80.19
                    },
                    {
                        "word": "But",
                        "start": 81.014,
                        "end": 81.174
                    },
                    {
                        "word": "since",
                        "start": 81.315,
                        "end": 81.575
                    },
                    {
                        "word": "the",
                        "start": 81.595,
                        "end": 81.736
                    },
                    {
                        "word": "grown-ups",
                        "start": 81.776,
                        "end": 82.357
                    },
                    {
                        "word": "were",
                        "start": 82.497,
                        "end": 82.637
                    },
                    {
                        "word": "not",
                        "start": 82.718,
                        "end": 82.938
                    },
                    {
                        "word": "able",
                        "start": 83.159,
                        "end": 83.339
                    },
                    {
                        "word": "to",
                        "start": 83.399,
                        "end": 83.459
                    },
                    {
                        "word": "understand",
                        "start": 83.579,
                        "end": 84.221
                    },
                    {
                        "word": "it,",
                        "start": 84.321,
                        "end": 84.421
                    },
                    {
                        "word": "I",
                        "start": 85.043,
                        "end": 85.103
                    },
                    {
                        "word": "made",
                        "start": 85.183,
                        "end": 85.403
                    },
                    {
                        "word": "another",
                        "start": 85.443,
                        "end": 85.945
                    },
                    {
                        "word": "drawing.",
                        "start": 85.985,
                        "end": 86.887
                    },
                    {
                        "word": "I",
                        "start": 86.907,
                        "end": 86.967
                    },
                    {
                        "word": "drew",
                        "start": 87.027,
                        "end": 87.227
                    },
                    {
                        "word": "the",
                        "start": 87.247,
                        "end": 87.468
                    },
                    {
                        "word": "inside",
                        "start": 87.608,
                        "end": 88.129
                    },
                    {
                        "word": "of",
                        "start": 88.45,
                        "end": 88.51
                    },
                    {
                        "word": "the",
                        "start": 88.55,
                        "end": 88.63
                    },
                    {
                        "word": "boa",
                        "start": 88.67,
                        "end": 88.991
                    },
                    {
                        "word": "constrictor,",
                        "start": 89.031,
                        "end": 89.672
                    },
                    {
                        "word": "so",
                        "start": 90.354,
                        "end": 90.534
                    },
                    {
                        "word": "that",
                        "start": 90.594,
                        "end": 90.775
                    },
                    {
                        "word": "the",
                        "start": 90.995,
                        "end": 91.096
                    },
                    {
                        "word": "grown-ups",
                        "start": 91.136,
                        "end": 91.657
                    },
                    {
                        "word": "could",
                        "start": 91.777,
                        "end": 91.977
                    },
                    {
                        "word": "see",
                        "start": 92.038,
                        "end": 92.198
                    },
                    {
                        "word": "it",
                        "start": 92.258,
                        "end": 92.298
                    },
                    {
                        "word": "clearly.",
                        "start": 92.559,
                        "end": 92.939
                    },
                    {
                        "word": "They",
                        "start": 93.42,
                        "end": 93.621
                    },
                    {
                        "word": "always",
                        "start": 93.641,
                        "end": 94.202
                    },
                    {
                        "word": "need",
                        "start": 94.242,
                        "end": 94.723
                    },
                    {
                        "word": "to",
                        "start": 94.743,
                        "end": 94.803
                    },
                    {
                        "word": "have",
                        "start": 94.844,
                        "end": 94.964
                    },
                    {
                        "word": "things",
                        "start": 95.004,
                        "end": 95.264
                    },
                    {
                        "word": "explained.",
                        "start": 95.305,
                        "end": 95.986
                    },
                    {
                        "word": "My",
                        "start": 96.708,
                        "end": 96.908
                    },
                    {
                        "word": "drawing",
                        "start": 96.928,
                        "end": 97.229
                    },
                    {
                        "word": "number",
                        "start": 97.289,
                        "end": 97.549
                    },
                    {
                        "word": "two",
                        "start": 97.589,
                        "end": 97.81
                    },
                    {
                        "word": "looked",
                        "start": 97.85,
                        "end": 98.511
                    },
                    {
                        "word": "like",
                        "start": 98.672,
                        "end": 98.852
                    },
                    {
                        "word": "this.",
                        "start": 98.912,
                        "end": 99.293
                    },
                    {
                        "word": "The",
                        "start": 101.568,
                        "end": 101.788
                    },
                    {
                        "word": "grown-up's",
                        "start": 101.909,
                        "end": 102.53
                    },
                    {
                        "word": "response",
                        "start": 102.61,
                        "end": 103.071
                    },
                    {
                        "word": "this",
                        "start": 103.091,
                        "end": 103.331
                    },
                    {
                        "word": "time",
                        "start": 103.391,
                        "end": 103.632
                    },
                    {
                        "word": "was",
                        "start": 103.952,
                        "end": 104.152
                    },
                    {
                        "word": "to",
                        "start": 104.233,
                        "end": 104.373
                    },
                    {
                        "word": "advise",
                        "start": 104.393,
                        "end": 104.934
                    },
                    {
                        "word": "me",
                        "start": 105.014,
                        "end": 105.174
                    },
                    {
                        "word": "to",
                        "start": 105.455,
                        "end": 105.575
                    },
                    {
                        "word": "lay",
                        "start": 105.675,
                        "end": 105.936
                    },
                    {
                        "word": "aside",
                        "start": 105.976,
                        "end": 106.476
                    },
                    {
                        "word": "my",
                        "start": 106.517,
                        "end": 106.817
                    },
                    {
                        "word": "drawings",
                        "start": 106.877,
                        "end": 107.398
                    },
                    {
                        "word": "of",
                        "start": 107.839,
                        "end": 107.899
                    },
                    {
                        "word": "boa",
                        "start": 107.999,
                        "end": 108.3
                    },
                    {
                        "word": "constrictors,",
                        "start": 108.34,
                        "end": 109.081
                    },
                    {
                        "word": "whether",
                        "start": 109.822,
                        "end": 110.163
                    },
                    {
                        "word": "from",
                        "start": 110.323,
                        "end": 110.483
                    },
                    {
                        "word": "the",
                        "start": 110.503,
                        "end": 110.624
                    },
                    {
                        "word": "inside",
                        "start": 110.764,
                        "end": 111.285
                    },
                    {
                        "word": "or",
                        "start": 111.325,
                        "end": 111.706
                    },
                    {
                        "word": "the",
                        "start": 111.746,
                        "end": 111.926
                    },
                    {
                        "word": "outside,",
                        "start": 112.066,
                        "end": 112.547
                    },
                    {
                        "word": "and",
                        "start": 113.348,
                        "end": 113.469
                    },
                    {
                        "word": "devote",
                        "start": 113.509,
                        "end": 114.11
                    },
                    {
                        "word": "myself",
                        "start": 114.15,
                        "end": 114.691
                    },
                    {
                        "word": "instead",
                        "start": 114.851,
                        "end": 115.272
                    },
                    {
                        "word": "to",
                        "start": 115.312,
                        "end": 115.753
                    },
                    {
                        "word": "geography,",
                        "start": 115.833,
                        "end": 116.474
                    },
                    {
                        "word": "history,",
                        "start": 117.075,
                        "end": 117.516
                    },
                    {
                        "word": "arithmetic,",
                        "start": 118.157,
                        "end": 118.818
                    },
                    {
                        "word": "and",
                        "start": 119.459,
                        "end": 119.599
                    },
                    {
                        "word": "grammar.",
                        "start": 119.679,
                        "end": 120.08
                    },
                    {
                        "word": "That",
                        "start": 121.262,
                        "end": 121.482
                    },
                    {
                        "word": "is",
                        "start": 121.522,
                        "end": 121.743
                    },
                    {
                        "word": "why,",
                        "start": 121.843,
                        "end": 122.204
                    },
                    {
                        "word": "at",
                        "start": 122.244,
                        "end": 122.584
                    },
                    {
                        "word": "the",
                        "start": 122.624,
                        "end": 122.725
                    },
                    {
                        "word": "age",
                        "start": 122.905,
                        "end": 123.085
                    },
                    {
                        "word": "of",
                        "start": 123.145,
                        "end": 123.205
                    },
                    {
                        "word": "six,",
                        "start": 123.245,
                        "end": 124.167
                    },
                    {
                        "word": "I",
                        "start": 124.147,
                        "end": 124.468
                    },
                    {
                        "word": "gave",
                        "start": 124.488,
                        "end": 124.729
                    },
                    {
                        "word": "up",
                        "start": 124.829,
                        "end": 124.909
                    },
                    {
                        "word": "what",
                        "start": 125.15,
                        "end": 125.33
                    },
                    {
                        "word": "might",
                        "start": 125.451,
                        "end": 125.651
                    },
                    {
                        "word": "have",
                        "start": 125.731,
                        "end": 125.872
                    },
                    {
                        "word": "been",
                        "start": 125.952,
                        "end": 126.152
                    },
                    {
                        "word": "a",
                        "start": 126.172,
                        "end": 126.193
                    },
                    {
                        "word": "magnificent",
                        "start": 126.493,
                        "end": 127.296
                    },
                    {
                        "word": "career",
                        "start": 127.376,
                        "end": 127.757
                    },
                    {
                        "word": "as",
                        "start": 127.777,
                        "end": 128.198
                    },
                    {
                        "word": "a",
                        "start": 128.238,
                        "end": 128.298
                    },
                    {
                        "word": "painter.",
                        "start": 128.358,
                        "end": 128.719
                    },
                    {
                        "word": "I",
                        "start": 129.903,
                        "end": 129.963
                    },
                    {
                        "word": "had",
                        "start": 130.043,
                        "end": 130.163
                    },
                    {
                        "word": "been",
                        "start": 130.203,
                        "end": 130.444
                    },
                    {
                        "word": "disheartened",
                        "start": 130.564,
                        "end": 131.286
                    },
                    {
                        "word": "by",
                        "start": 131.326,
                        "end": 131.888
                    },
                    {
                        "word": "the",
                        "start": 131.928,
                        "end": 132.008
                    },
                    {
                        "word": "failure",
                        "start": 132.109,
                        "end": 132.53
                    },
                    {
                        "word": "of",
                        "start": 132.831,
                        "end": 132.891
                    },
                    {
                        "word": "my",
                        "start": 132.971,
                        "end": 133.091
                    },
                    {
                        "word": "drawing",
                        "start": 133.131,
                        "end": 133.472
                    },
                    {
                        "word": "number",
                        "start": 133.532,
                        "end": 133.833
                    },
                    {
                        "word": "one",
                        "start": 134.014,
                        "end": 134.114
                    },
                    {
                        "word": "and",
                        "start": 134.676,
                        "end": 134.836
                    },
                    {
                        "word": "my",
                        "start": 134.876,
                        "end": 135.016
                    },
                    {
                        "word": "drawing",
                        "start": 135.037,
                        "end": 135.357
                    },
                    {
                        "word": "number",
                        "start": 135.397,
                        "end": 135.618
                    },
                    {
                        "word": "two.",
                        "start": 135.658,
                        "end": 135.979
                    },
                    {
                        "word": "Grown-ups",
                        "start": 137.191,
                        "end": 137.912
                    },
                    {
                        "word": "never",
                        "start": 138.193,
                        "end": 138.473
                    },
                    {
                        "word": "understand",
                        "start": 138.593,
                        "end": 139.214
                    },
                    {
                        "word": "anything",
                        "start": 139.254,
                        "end": 139.855
                    },
                    {
                        "word": "by",
                        "start": 140.035,
                        "end": 140.156
                    },
                    {
                        "word": "themselves,",
                        "start": 140.216,
                        "end": 140.797
                    },
                    {
                        "word": "and",
                        "start": 141.598,
                        "end": 141.738
                    },
                    {
                        "word": "it",
                        "start": 141.778,
                        "end": 141.818
                    },
                    {
                        "word": "is",
                        "start": 141.998,
                        "end": 142.219
                    },
                    {
                        "word": "tiresome",
                        "start": 142.239,
                        "end": 142.9
                    },
                    {
                        "word": "for",
                        "start": 143.12,
                        "end": 143.26
                    },
                    {
                        "word": "children",
                        "start": 143.32,
                        "end": 143.761
                    },
                    {
                        "word": "to",
                        "start": 144.102,
                        "end": 144.202
                    },
                    {
                        "word": "be",
                        "start": 144.262,
                        "end": 144.342
                    },
                    {
                        "word": "always",
                        "start": 144.522,
                        "end": 144.903
                    },
                    {
                        "word": "and",
                        "start": 145.083,
                        "end": 145.243
                    },
                    {
                        "word": "forever",
                        "start": 145.283,
                        "end": 145.684
                    },
                    {
                        "word": "explaining",
                        "start": 145.724,
                        "end": 146.465
                    },
                    {
                        "word": "things",
                        "start": 146.525,
                        "end": 146.766
                    },
                    {
                        "word": "to",
                        "start": 146.826,
                        "end": 146.966
                    },
                    {
                        "word": "them.",
                        "start": 147.026,
                        "end": 147.166
                    },
                    {
                        "word": "So",
                        "start": 148.028,
                        "end": 148.308
                    },
                    {
                        "word": "then",
                        "start": 148.348,
                        "end": 148.749
                    },
                    {
                        "word": "I",
                        "start": 148.969,
                        "end": 149.029
                    },
                    {
                        "word": "chose",
                        "start": 149.109,
                        "end": 149.45
                    },
                    {
                        "word": "another",
                        "start": 149.49,
                        "end": 150.031
                    },
                    {
                        "word": "profession",
                        "start": 150.111,
                        "end": 150.612
                    },
                    {
                        "word": "and",
                        "start": 151.193,
                        "end": 151.353
                    },
                    {
                        "word": "learned",
                        "start": 151.393,
                        "end": 151.934
                    },
                    {
                        "word": "to",
                        "start": 151.954,
                        "end": 151.994
                    },
                    {
                        "word": "pilot",
                        "start": 152.274,
                        "end": 152.595
                    },
                    {
                        "word": "airplanes.",
                        "start": 152.715,
                        "end": 153.256
                    },
                    {
                        "word": "I",
                        "start": 154.277,
                        "end": 154.357
                    },
                    {
                        "word": "have",
                        "start": 154.418,
                        "end": 154.558
                    },
                    {
                        "word": "flown",
                        "start": 154.638,
                        "end": 154.978
                    },
                    {
                        "word": "a",
                        "start": 154.998,
                        "end": 155.019
                    },
                    {
                        "word": "little",
                        "start": 155.219,
                        "end": 155.459
                    },
                    {
                        "word": "over",
                        "start": 155.519,
                        "end": 155.659
                    },
                    {
                        "word": "all",
                        "start": 155.86,
                        "end": 156.02
                    },
                    {
                        "word": "parts",
                        "start": 156.1,
                        "end": 156.381
                    },
                    {
                        "word": "of",
                        "start": 156.441,
                        "end": 156.501
                    },
                    {
                        "word": "the",
                        "start": 156.521,
                        "end": 156.641
                    },
                    {
                        "word": "world,",
                        "start": 156.681,
                        "end": 157.002
                    },
                    {
                        "word": "and",
                        "start": 157.763,
                        "end": 157.883
                    },
                    {
                        "word": "it",
                        "start": 157.903,
                        "end": 157.943
                    },
                    {
                        "word": "is",
                        "start": 158.143,
                        "end": 158.384
                    },
                    {
                        "word": "true",
                        "start": 158.404,
                        "end": 158.804
                    },
                    {
                        "word": "that",
                        "start": 158.824,
                        "end": 159.325
                    },
                    {
                        "word": "geography",
                        "start": 159.365,
                        "end": 160.247
                    },
                    {
                        "word": "has",
                        "start": 160.387,
                        "end": 160.547
                    },
                    {
                        "word": "been",
                        "start": 160.667,
                        "end": 160.868
                    },
                    {
                        "word": "very",
                        "start": 161.088,
                        "end": 161.428
                    },
                    {
                        "word": "useful",
                        "start": 161.609,
                        "end": 161.969
                    },
                    {
                        "word": "to",
                        "start": 162.029,
                        "end": 162.129
                    },
                    {
                        "word": "me.",
                        "start": 162.19,
                        "end": 162.49
                    },
                    {
                        "word": "At",
                        "start": 163.246,
                        "end": 163.466
                    },
                    {
                        "word": "a",
                        "start": 163.546,
                        "end": 163.566
                    },
                    {
                        "word": "glance,",
                        "start": 163.647,
                        "end": 164.107
                    },
                    {
                        "word": "I",
                        "start": 164.368,
                        "end": 164.408
                    },
                    {
                        "word": "can",
                        "start": 164.468,
                        "end": 164.588
                    },
                    {
                        "word": "distinguish",
                        "start": 164.668,
                        "end": 165.309
                    },
                    {
                        "word": "China",
                        "start": 165.409,
                        "end": 165.83
                    },
                    {
                        "word": "from",
                        "start": 166.13,
                        "end": 166.27
                    },
                    {
                        "word": "Arizona.",
                        "start": 166.411,
                        "end": 166.971
                    },
                    {
                        "word": "If",
                        "start": 167.813,
                        "end": 167.893
                    },
                    {
                        "word": "one",
                        "start": 168.093,
                        "end": 168.193
                    },
                    {
                        "word": "gets",
                        "start": 168.273,
                        "end": 168.514
                    },
                    {
                        "word": "lost",
                        "start": 168.574,
                        "end": 168.874
                    },
                    {
                        "word": "in",
                        "start": 168.914,
                        "end": 169.054
                    },
                    {
                        "word": "the",
                        "start": 169.094,
                        "end": 169.155
                    },
                    {
                        "word": "night,",
                        "start": 169.235,
                        "end": 169.495
                    },
                    {
                        "word": "such",
                        "start": 170.116,
                        "end": 170.356
                    },
                    {
                        "word": "knowledge",
                        "start": 170.436,
                        "end": 170.797
                    },
                    {
                        "word": "is",
                        "start": 170.817,
                        "end": 171.358
                    },
                    {
                        "word": "valuable.",
                        "start": 171.478,
                        "end": 171.918
                    },
                    {
                        "word": "In",
                        "start": 173.341,
                        "end": 173.421
                    },
                    {
                        "word": "the",
                        "start": 173.481,
                        "end": 173.561
                    },
                    {
                        "word": "course",
                        "start": 173.641,
                        "end": 173.961
                    },
                    {
                        "word": "of",
                        "start": 174.122,
                        "end": 174.182
                    },
                    {
                        "word": "this",
                        "start": 174.202,
                        "end": 174.522
                    },
                    {
                        "word": "life,",
                        "start": 174.642,
                        "end": 174.903
                    },
                    {
                        "word": "I",
                        "start": 175.544,
                        "end": 175.604
                    },
                    {
                        "word": "have",
                        "start": 175.684,
                        "end": 175.884
                    },
                    {
                        "word": "had",
                        "start": 175.964,
                        "end": 176.185
                    },
                    {
                        "word": "a",
                        "start": 176.205,
                        "end": 176.225
                    },
                    {
                        "word": "great",
                        "start": 176.665,
                        "end": 176.966
                    },
                    {
                        "word": "many",
                        "start": 177.046,
                        "end": 177.246
                    },
                    {
                        "word": "encounters",
                        "start": 177.326,
                        "end": 177.927
                    },
                    {
                        "word": "with",
                        "start": 177.967,
                        "end": 178.368
                    },
                    {
                        "word": "a",
                        "start": 178.388,
                        "end": 178.408
                    },
                    {
                        "word": "great",
                        "start": 178.608,
                        "end": 178.848
                    },
                    {
                        "word": "many",
                        "start": 178.909,
                        "end": 179.129
                    },
                    {
                        "word": "people",
                        "start": 179.189,
                        "end": 179.509
                    },
                    {
                        "word": "who",
                        "start": 179.99,
                        "end": 180.13
                    },
                    {
                        "word": "have",
                        "start": 180.17,
                        "end": 180.291
                    },
                    {
                        "word": "been",
                        "start": 180.351,
                        "end": 180.511
                    },
                    {
                        "word": "concerned",
                        "start": 180.591,
                        "end": 181.252
                    },
                    {
                        "word": "with",
                        "start": 181.292,
                        "end": 181.552
                    },
                    {
                        "word": "matters",
                        "start": 181.673,
                        "end": 182.093
                    },
                    {
                        "word": "of",
                        "start": 182.133,
                        "end": 182.374
                    },
                    {
                        "word": "consequences.",
                        "start": 182.414,
                        "end": 183.415
                    },
                    {
                        "word": "I",
                        "start": 184.441,
                        "end": 184.642
                    },
                    {
                        "word": "have",
                        "start": 184.682,
                        "end": 184.842
                    },
                    {
                        "word": "lived",
                        "start": 184.943,
                        "end": 185.284
                    },
                    {
                        "word": "a",
                        "start": 185.565,
                        "end": 185.605
                    },
                    {
                        "word": "great",
                        "start": 185.685,
                        "end": 185.906
                    },
                    {
                        "word": "deal",
                        "start": 185.966,
                        "end": 186.207
                    },
                    {
                        "word": "among",
                        "start": 186.247,
                        "end": 186.869
                    },
                    {
                        "word": "grown-ups,",
                        "start": 186.93,
                        "end": 187.471
                    },
                    {
                        "word": "I",
                        "start": 188.575,
                        "end": 188.635
                    },
                    {
                        "word": "have",
                        "start": 188.675,
                        "end": 188.816
                    },
                    {
                        "word": "seen",
                        "start": 188.956,
                        "end": 189.157
                    },
                    {
                        "word": "them",
                        "start": 189.197,
                        "end": 189.338
                    },
                    {
                        "word": "intimately,",
                        "start": 189.559,
                        "end": 190.141
                    },
                    {
                        "word": "close",
                        "start": 190.763,
                        "end": 191.204
                    },
                    {
                        "word": "at",
                        "start": 191.304,
                        "end": 191.365
                    },
                    {
                        "word": "hand,",
                        "start": 191.445,
                        "end": 191.746
                    },
                    {
                        "word": "and",
                        "start": 192.649,
                        "end": 192.79
                    },
                    {
                        "word": "that",
                        "start": 192.83,
                        "end": 193.271
                    },
                    {
                        "word": "hasn't",
                        "start": 193.452,
                        "end": 193.813
                    },
                    {
                        "word": "much",
                        "start": 193.913,
                        "end": 194.134
                    },
                    {
                        "word": "improved",
                        "start": 194.315,
                        "end": 194.997
                    },
                    {
                        "word": "my",
                        "start": 195.037,
                        "end": 195.419
                    },
                    {
                        "word": "opinion",
                        "start": 195.559,
                        "end": 196.021
                    },
                    {
                        "word": "of",
                        "start": 196.101,
                        "end": 196.161
                    },
                    {
                        "word": "them.",
                        "start": 196.221,
                        "end": 196.442
                    },
                    {
                        "word": "Whenever",
                        "start": 197.435,
                        "end": 197.976
                    },
                    {
                        "word": "I",
                        "start": 198.116,
                        "end": 198.156
                    },
                    {
                        "word": "met",
                        "start": 198.276,
                        "end": 198.517
                    },
                    {
                        "word": "one",
                        "start": 198.557,
                        "end": 198.977
                    },
                    {
                        "word": "of",
                        "start": 199.038,
                        "end": 199.098
                    },
                    {
                        "word": "them",
                        "start": 199.158,
                        "end": 199.298
                    },
                    {
                        "word": "who",
                        "start": 199.458,
                        "end": 199.598
                    },
                    {
                        "word": "seemed",
                        "start": 199.759,
                        "end": 200.119
                    },
                    {
                        "word": "to",
                        "start": 200.139,
                        "end": 200.34
                    },
                    {
                        "word": "me",
                        "start": 200.4,
                        "end": 200.52
                    },
                    {
                        "word": "at",
                        "start": 200.56,
                        "end": 200.84
                    },
                    {
                        "word": "all",
                        "start": 200.86,
                        "end": 201.221
                    },
                    {
                        "word": "clear-sighted,",
                        "start": 201.361,
                        "end": 202.042
                    },
                    {
                        "word": "I",
                        "start": 202.082,
                        "end": 202.904
                    },
                    {
                        "word": "tried",
                        "start": 203.064,
                        "end": 203.445
                    },
                    {
                        "word": "the",
                        "start": 203.465,
                        "end": 203.805
                    },
                    {
                        "word": "experiment",
                        "start": 203.905,
                        "end": 204.566
                    },
                    {
                        "word": "of",
                        "start": 204.807,
                        "end": 204.867
                    },
                    {
                        "word": "showing",
                        "start": 205.007,
                        "end": 205.328
                    },
                    {
                        "word": "him",
                        "start": 205.408,
                        "end": 205.528
                    },
                    {
                        "word": "my",
                        "start": 205.788,
                        "end": 206.049
                    },
                    {
                        "word": "drawing",
                        "start": 206.149,
                        "end": 206.469
                    },
                    {
                        "word": "number",
                        "start": 206.569,
                        "end": 206.81
                    },
                    {
                        "word": "one,",
                        "start": 206.95,
                        "end": 207.09
                    },
                    {
                        "word": "which",
                        "start": 207.852,
                        "end": 208.032
                    },
                    {
                        "word": "I",
                        "start": 208.232,
                        "end": 208.292
                    },
                    {
                        "word": "have",
                        "start": 208.352,
                        "end": 208.493
                    },
                    {
                        "word": "always",
                        "start": 208.633,
                        "end": 208.893
                    },
                    {
                        "word": "kept.",
                        "start": 209.013,
                        "end": 209.314
                    },
                    {
                        "word": "I",
                        "start": 210.135,
                        "end": 210.195
                    },
                    {
                        "word": "would",
                        "start": 210.235,
                        "end": 210.416
                    },
                    {
                        "word": "try",
                        "start": 210.456,
                        "end": 210.636
                    },
                    {
                        "word": "to",
                        "start": 210.676,
                        "end": 210.776
                    },
                    {
                        "word": "find",
                        "start": 210.856,
                        "end": 211.097
                    },
                    {
                        "word": "out",
                        "start": 211.277,
                        "end": 211.397
                    },
                    {
                        "word": "so",
                        "start": 211.858,
                        "end": 212.018
                    },
                    {
                        "word": "if",
                        "start": 212.399,
                        "end": 212.459
                    },
                    {
                        "word": "this",
                        "start": 212.579,
                        "end": 212.759
                    },
                    {
                        "word": "was",
                        "start": 212.839,
                        "end": 213.0
                    },
                    {
                        "word": "a",
                        "start": 213.02,
                        "end": 213.04
                    },
                    {
                        "word": "person",
                        "start": 213.16,
                        "end": 213.581
                    },
                    {
                        "word": "of",
                        "start": 213.601,
                        "end": 213.841
                    },
                    {
                        "word": "true",
                        "start": 213.881,
                        "end": 214.202
                    },
                    {
                        "word": "understanding.",
                        "start": 214.342,
                        "end": 215.123
                    },
                    {
                        "word": "But",
                        "start": 216.2,
                        "end": 216.38
                    },
                    {
                        "word": "whoever",
                        "start": 216.48,
                        "end": 217.081
                    },
                    {
                        "word": "it",
                        "start": 217.322,
                        "end": 217.402
                    },
                    {
                        "word": "was,",
                        "start": 217.502,
                        "end": 217.802
                    },
                    {
                        "word": "he",
                        "start": 218.323,
                        "end": 218.483
                    },
                    {
                        "word": "or",
                        "start": 218.683,
                        "end": 218.764
                    },
                    {
                        "word": "she",
                        "start": 218.864,
                        "end": 219.104
                    },
                    {
                        "word": "would",
                        "start": 219.485,
                        "end": 219.665
                    },
                    {
                        "word": "always",
                        "start": 219.765,
                        "end": 220.065
                    },
                    {
                        "word": "say,",
                        "start": 220.165,
                        "end": 220.446
                    },
                    {
                        "word": "that's",
                        "start": 221.267,
                        "end": 221.487
                    },
                    {
                        "word": "a",
                        "start": 221.547,
                        "end": 221.587
                    },
                    {
                        "word": "hat.",
                        "start": 221.647,
                        "end": 221.948
                    },
                    {
                        "word": "Then",
                        "start": 223.13,
                        "end": 223.39
                    },
                    {
                        "word": "I",
                        "start": 223.41,
                        "end": 223.77
                    },
                    {
                        "word": "would",
                        "start": 223.83,
                        "end": 224.031
                    },
                    {
                        "word": "never",
                        "start": 224.151,
                        "end": 224.491
                    },
                    {
                        "word": "talk",
                        "start": 224.792,
                        "end": 225.012
                    },
                    {
                        "word": "to",
                        "start": 225.072,
                        "end": 225.212
                    },
                    {
                        "word": "that",
                        "start": 225.292,
                        "end": 225.453
                    },
                    {
                        "word": "person",
                        "start": 225.533,
                        "end": 225.973
                    },
                    {
                        "word": "about",
                        "start": 226.234,
                        "end": 226.514
                    },
                    {
                        "word": "boa",
                        "start": 226.574,
                        "end": 226.895
                    },
                    {
                        "word": "constrictes,",
                        "start": 226.915,
                        "end": 227.696
                    },
                    {
                        "word": "or",
                        "start": 228.357,
                        "end": 228.497
                    },
                    {
                        "word": "primeval",
                        "start": 228.617,
                        "end": 229.098
                    },
                    {
                        "word": "forests,",
                        "start": 229.178,
                        "end": 229.658
                    },
                    {
                        "word": "or",
                        "start": 230.42,
                        "end": 230.54
                    },
                    {
                        "word": "stars.",
                        "start": 230.7,
                        "end": 231.161
                    },
                    {
                        "word": "I",
                        "start": 232.322,
                        "end": 232.382
                    },
                    {
                        "word": "would",
                        "start": 232.422,
                        "end": 232.582
                    },
                    {
                        "word": "bring",
                        "start": 232.663,
                        "end": 232.883
                    },
                    {
                        "word": "myself",
                        "start": 232.943,
                        "end": 233.444
                    },
                    {
                        "word": "down",
                        "start": 233.544,
                        "end": 233.844
                    },
                    {
                        "word": "to",
                        "start": 234.185,
                        "end": 234.365
                    },
                    {
                        "word": "his",
                        "start": 234.465,
                        "end": 234.645
                    },
                    {
                        "word": "level.",
                        "start": 234.725,
                        "end": 235.006
                    },
                    {
                        "word": "I",
                        "start": 235.827,
                        "end": 235.887
                    },
                    {
                        "word": "would",
                        "start": 235.967,
                        "end": 236.127
                    },
                    {
                        "word": "talk",
                        "start": 236.227,
                        "end": 236.428
                    },
                    {
                        "word": "to",
                        "start": 236.468,
                        "end": 236.548
                    },
                    {
                        "word": "him",
                        "start": 236.608,
                        "end": 236.788
                    },
                    {
                        "word": "about",
                        "start": 236.808,
                        "end": 237.329
                    },
                    {
                        "word": "bridge,",
                        "start": 237.429,
                        "end": 237.81
                    },
                    {
                        "word": "and",
                        "start": 238.27,
                        "end": 238.39
                    },
                    {
                        "word": "golf,",
                        "start": 238.471,
                        "end": 239.111
                    },
                    {
                        "word": "and",
                        "start": 239.131,
                        "end": 239.252
                    },
                    {
                        "word": "politics,",
                        "start": 239.332,
                        "end": 239.872
                    },
                    {
                        "word": "and",
                        "start": 240.393,
                        "end": 240.493
                    },
                    {
                        "word": "neckties.",
                        "start": 240.573,
                        "end": 241.735
                    },
                    {
                        "word": "and",
                        "start": 241.715,
                        "end": 242.117
                    },
                    {
                        "word": "the",
                        "start": 242.158,
                        "end": 242.419
                    },
                    {
                        "word": "grown-up",
                        "start": 242.459,
                        "end": 242.962
                    },
                    {
                        "word": "would",
                        "start": 243.163,
                        "end": 243.345
                    },
                    {
                        "word": "be",
                        "start": 243.425,
                        "end": 243.546
                    },
                    {
                        "word": "greatly",
                        "start": 243.747,
                        "end": 244.29
                    },
                    {
                        "word": "pleased",
                        "start": 244.431,
                        "end": 245.014
                    },
                    {
                        "word": "to",
                        "start": 245.276,
                        "end": 245.376
                    },
                    {
                        "word": "have",
                        "start": 245.437,
                        "end": 245.578
                    },
                    {
                        "word": "met",
                        "start": 245.658,
                        "end": 245.839
                    },
                    {
                        "word": "such",
                        "start": 245.94,
                        "end": 246.201
                    },
                    {
                        "word": "a",
                        "start": 246.422,
                        "end": 246.463
                    },
                    {
                        "word": "sensible",
                        "start": 246.543,
                        "end": 247.026
                    },
                    {
                        "word": "man.",
                        "start": 247.066,
                        "end": 247.388
                    }
                ],
                "img": "imgs/chapter_0/s0010.png"
            },
            {
                "text": "Then I would never talk to that person about boa constrictors, or primeval forests, or stars. I would bring myself down to his level. I would talk to him about bridge, and golf, and politics, and neckties. And the grown-up would be greatly pleased to have met such a sensible man.",
                "start": 223.13,
                "end": 247.388,
                "words": [
                    {
                        "word": "Then",
                        "start": 223.13,
                        "end": 223.39
                    },
                    {
                        "word": "I",
                        "start": 223.41,
                        "end": 223.77
                    },
                    {
                        "word": "would",
                        "start": 223.83,
                        "end": 224.031
                    },
                    {
                        "word": "never",
                        "start": 224.151,
                        "end": 224.491
                    },
                    {
                        "word": "talk",
                        "start": 224.792,
                        "end": 225.012
                    },
                    {
                        "word": "to",
                        "start": 225.072,
                        "end": 225.212
                    },
                    {
                        "word": "that",
                        "start": 225.292,
                        "end": 225.453
                    },
                    {
                        "word": "person",
                        "start": 225.533,
                        "end": 225.973
                    },
                    {
                        "word": "about",
                        "start": 226.234,
                        "end": 226.514
                    },
                    {
                        "word": "boa",
                        "start": 226.574,
                        "end": 226.895
                    },
                    {
                        "word": "constrictes,",
                        "start": 226.915,
                        "end": 227.696
                    },
                    {
                        "word": "or",
                        "start": 228.357,
                        "end": 228.497
                    },
                    {
                        "word": "primeval",
                        "start": 228.617,
                        "end": 229.098
                    },
                    {
                        "word": "forests,",
                        "start": 229.178,
                        "end": 229.658
                    },
                    {
                        "word": "or",
                        "start": 230.42,
                        "end": 230.54
                    },
                    {
                        "word": "stars.",
                        "start": 230.7,
                        "end": 231.161
                    },
                    {
                        "word": "I",
                        "start": 232.322,
                        "end": 232.382
                    },
                    {
                        "word": "would",
                        "start": 232.422,
                        "end": 232.582
                    },
                    {
                        "word": "bring",
                        "start": 232.663,
                        "end": 232.883
                    },
                    {
                        "word": "myself",
                        "start": 232.943,
                        "end": 233.444
                    },
                    {
                        "word": "down",
                        "start": 233.544,
                        "end": 233.844
                    },
                    {
                        "word": "to",
                        "start": 234.185,
                        "end": 234.365
                    },
                    {
                        "word": "his",
                        "start": 234.465,
                        "end": 234.645
                    },
                    {
                        "word": "level.",
                        "start": 234.725,
                        "end": 235.006
                    },
                    {
                        "word": "I",
                        "start": 235.827,
                        "end": 235.887
                    },
                    {
                        "word": "would",
                        "start": 235.967,
                        "end": 236.127
                    },
                    {
                        "word": "talk",
                        "start": 236.227,
                        "end": 236.428
                    },
                    {
                        "word": "to",
                        "start": 236.468,
                        "end": 236.548
                    },
                    {
                        "word": "him",
                        "start": 236.608,
                        "end": 236.788
                    },
                    {
                        "word": "about",
                        "start": 236.808,
                        "end": 237.329
                    },
                    {
                        "word": "bridge,",
                        "start": 237.429,
                        "end": 237.81
                    },
                    {
                        "word": "and",
                        "start": 238.27,
                        "end": 238.39
                    },
                    {
                        "word": "golf,",
                        "start": 238.471,
                        "end": 239.111
                    },
                    {
                        "word": "and",
                        "start": 239.131,
                        "end": 239.252
                    },
                    {
                        "word": "politics,",
                        "start": 239.332,
                        "end": 239.872
                    },
                    {
                        "word": "and",
                        "start": 240.393,
                        "end": 240.493
                    },
                    {
                        "word": "neckties.",
                        "start": 240.573,
                        "end": 241.735
                    },
                    {
                        "word": "and",
                        "start": 241.715,
                        "end": 242.117
                    },
                    {
                        "word": "the",
                        "start": 242.158,
                        "end": 242.419
                    },
                    {
                        "word": "grown-up",
                        "start": 242.459,
                        "end": 242.962
                    },
                    {
                        "word": "would",
                        "start": 243.163,
                        "end": 243.345
                    },
                    {
                        "word": "be",
                        "start": 243.425,
                        "end": 243.546
                    },
                    {
                        "word": "greatly",
                        "start": 243.747,
                        "end": 244.29
                    },
                    {
                        "word": "pleased",
                        "start": 244.431,
                        "end": 245.014
                    },
                    {
                        "word": "to",
                        "start": 245.276,
                        "end": 245.376
                    },
                    {
                        "word": "have",
                        "start": 245.437,
                        "end": 245.578
                    },
                    {
                        "word": "met",
                        "start": 245.658,
                        "end": 245.839
                    },
                    {
                        "word": "such",
                        "start": 245.94,
                        "end": 246.201
                    },
                    {
                        "word": "a",
                        "start": 246.422,
                        "end": 246.463
                    },
                    {
                        "word": "sensible",
                        "start": 246.543,
                        "end": 247.026
                    },
                    {
                        "word": "man.",
                        "start": 247.066,
                        "end": 247.388
                    }
                ],
                "img": "imgs/chapter_0/s0011.png"
            }
        ]
    },
    {
        "id": "conversation_1",
        "title": "Conversation One",
        "audio_source": "2015.06_cet6_1.mp3",
        "full_audio_range": {
            "start": 41.763,
            "end": 147.471
        },
        "sentences": [
            {
                "text": "Jack, sit down and listen. This is important. We'll have to tackle the problems of exporting step by step. And the first move  is to get an up-to-date picture of where we stand now.",
                "start": 41.763,
                "end": 54.176,
                "words": [
                    {
                        "word": "Jack,",
                        "start": 41.763,
                        "end": 42.203
                    },
                    {
                        "word": "sit",
                        "start": 42.544,
                        "end": 42.744
                    },
                    {
                        "word": "down",
                        "start": 42.804,
                        "end": 43.044
                    },
                    {
                        "word": "and",
                        "start": 43.104,
                        "end": 43.184
                    },
                    {
                        "word": "listen.",
                        "start": 43.265,
                        "end": 43.625
                    },
                    {
                        "word": "This",
                        "start": 43.685,
                        "end": 44.045
                    },
                    {
                        "word": "is",
                        "start": 44.105,
                        "end": 44.186
                    },
                    {
                        "word": "important.",
                        "start": 44.266,
                        "end": 44.946
                    },
                    {
                        "word": "We'll",
                        "start": 45.487,
                        "end": 45.667
                    },
                    {
                        "word": "have",
                        "start": 45.707,
                        "end": 45.807
                    },
                    {
                        "word": "to",
                        "start": 45.847,
                        "end": 45.927
                    },
                    {
                        "word": "tackle",
                        "start": 45.987,
                        "end": 46.288
                    },
                    {
                        "word": "the",
                        "start": 46.308,
                        "end": 46.408
                    },
                    {
                        "word": "problems",
                        "start": 46.488,
                        "end": 46.968
                    },
                    {
                        "word": "of",
                        "start": 47.048,
                        "end": 47.089
                    },
                    {
                        "word": "exporting",
                        "start": 47.129,
                        "end": 47.949
                    },
                    {
                        "word": "step",
                        "start": 48.09,
                        "end": 48.35
                    },
                    {
                        "word": "by",
                        "start": 48.43,
                        "end": 48.57
                    },
                    {
                        "word": "step,",
                        "start": 48.71,
                        "end": 49.031
                    },
                    {
                        "word": "and",
                        "start": 49.611,
                        "end": 49.691
                    },
                    {
                        "word": "the",
                        "start": 49.731,
                        "end": 49.791
                    },
                    {
                        "word": "first",
                        "start": 49.891,
                        "end": 50.172
                    },
                    {
                        "word": "move",
                        "start": 50.272,
                        "end": 50.492
                    },
                    {
                        "word": "is",
                        "start": 50.552,
                        "end": 50.632
                    },
                    {
                        "word": "to",
                        "start": 50.692,
                        "end": 50.772
                    },
                    {
                        "word": "get",
                        "start": 50.832,
                        "end": 50.973
                    },
                    {
                        "word": "an",
                        "start": 51.073,
                        "end": 51.113
                    },
                    {
                        "word": "up-to-date",
                        "start": 51.333,
                        "end": 51.874
                    },
                    {
                        "word": "picture",
                        "start": 51.934,
                        "end": 52.334
                    },
                    {
                        "word": "of",
                        "start": 52.474,
                        "end": 52.534
                    },
                    {
                        "word": "where",
                        "start": 52.654,
                        "end": 52.915
                    },
                    {
                        "word": "we",
                        "start": 52.975,
                        "end": 53.095
                    },
                    {
                        "word": "stand",
                        "start": 53.175,
                        "end": 53.535
                    },
                    {
                        "word": "now.",
                        "start": 53.575,
                        "end": 54.176
                    }
                ]
            },
            {
                "text": "Why don't we just concentrate on expanding here at home?",
                "start": 55.597,
                "end": 58.6,
                "words": [
                    {
                        "word": "Why",
                        "start": 55.597,
                        "end": 55.717
                    },
                    {
                        "word": "don't",
                        "start": 55.738,
                        "end": 55.858
                    },
                    {
                        "word": "we",
                        "start": 55.878,
                        "end": 55.958
                    },
                    {
                        "word": "just",
                        "start": 56.018,
                        "end": 56.198
                    },
                    {
                        "word": "concentrate",
                        "start": 56.298,
                        "end": 56.899
                    },
                    {
                        "word": "on",
                        "start": 56.979,
                        "end": 57.059
                    },
                    {
                        "word": "expanding",
                        "start": 57.139,
                        "end": 57.84
                    },
                    {
                        "word": "here",
                        "start": 57.92,
                        "end": 58.12
                    },
                    {
                        "word": "at",
                        "start": 58.2,
                        "end": 58.26
                    },
                    {
                        "word": "home?",
                        "start": 58.34,
                        "end": 58.6
                    }
                ]
            },
            {
                "text": "Of course, we should hold on to our position here. But you must admit the market here is limited.",
                "start": 59.101,
                "end": 65.007,
                "words": [
                    {
                        "word": "Of",
                        "start": 59.101,
                        "end": 59.161
                    },
                    {
                        "word": "course",
                        "start": 59.301,
                        "end": 59.602
                    },
                    {
                        "word": "we",
                        "start": 59.702,
                        "end": 59.782
                    },
                    {
                        "word": "should",
                        "start": 59.802,
                        "end": 59.962
                    },
                    {
                        "word": "hold",
                        "start": 60.022,
                        "end": 60.242
                    },
                    {
                        "word": "on",
                        "start": 60.362,
                        "end": 60.442
                    },
                    {
                        "word": "to",
                        "start": 60.482,
                        "end": 60.563
                    },
                    {
                        "word": "our",
                        "start": 60.623,
                        "end": 60.703
                    },
                    {
                        "word": "position",
                        "start": 60.763,
                        "end": 61.183
                    },
                    {
                        "word": "here,",
                        "start": 61.303,
                        "end": 61.624
                    },
                    {
                        "word": "but",
                        "start": 61.664,
                        "end": 62.244
                    },
                    {
                        "word": "you",
                        "start": 62.284,
                        "end": 62.424
                    },
                    {
                        "word": "must",
                        "start": 62.585,
                        "end": 62.885
                    },
                    {
                        "word": "admit",
                        "start": 62.985,
                        "end": 63.265
                    },
                    {
                        "word": "the",
                        "start": 63.285,
                        "end": 63.446
                    },
                    {
                        "word": "market",
                        "start": 63.526,
                        "end": 63.886
                    },
                    {
                        "word": "here",
                        "start": 63.946,
                        "end": 64.166
                    },
                    {
                        "word": "is",
                        "start": 64.266,
                        "end": 64.346
                    },
                    {
                        "word": "limited.",
                        "start": 64.387,
                        "end": 65.007
                    }
                ]
            },
            {
                "text": "Yes, but it's safe. The government keeps out foreigners with import controls, though I must admit I feel sure we could hold our own against foreign bikes.",
                "start": 65.027,
                "end": 76.304,
                "words": [
                    {
                        "word": "Yes,",
                        "start": 65.027,
                        "end": 66.028
                    },
                    {
                        "word": "but",
                        "start": 66.429,
                        "end": 66.549
                    },
                    {
                        "word": "it's",
                        "start": 66.609,
                        "end": 66.749
                    },
                    {
                        "word": "safe.",
                        "start": 66.849,
                        "end": 67.77
                    },
                    {
                        "word": "The",
                        "start": 67.852,
                        "end": 68.012
                    },
                    {
                        "word": "government",
                        "start": 68.072,
                        "end": 68.473
                    },
                    {
                        "word": "keeps",
                        "start": 68.593,
                        "end": 68.873
                    },
                    {
                        "word": "out",
                        "start": 68.974,
                        "end": 69.094
                    },
                    {
                        "word": "foreigners",
                        "start": 69.194,
                        "end": 69.635
                    },
                    {
                        "word": "with",
                        "start": 69.735,
                        "end": 69.895
                    },
                    {
                        "word": "import",
                        "start": 70.135,
                        "end": 70.476
                    },
                    {
                        "word": "controls.",
                        "start": 70.516,
                        "end": 70.977
                    },
                    {
                        "word": "Though",
                        "start": 71.638,
                        "end": 71.778
                    },
                    {
                        "word": "I",
                        "start": 71.818,
                        "end": 71.838
                    },
                    {
                        "word": "must",
                        "start": 71.898,
                        "end": 72.098
                    },
                    {
                        "word": "admit,",
                        "start": 72.178,
                        "end": 72.539
                    },
                    {
                        "word": "I",
                        "start": 72.599,
                        "end": 72.939
                    },
                    {
                        "word": "feel",
                        "start": 73.08,
                        "end": 73.3
                    },
                    {
                        "word": "sure",
                        "start": 73.48,
                        "end": 73.801
                    },
                    {
                        "word": "we",
                        "start": 73.921,
                        "end": 74.061
                    },
                    {
                        "word": "could",
                        "start": 74.181,
                        "end": 74.382
                    },
                    {
                        "word": "hold",
                        "start": 74.462,
                        "end": 74.682
                    },
                    {
                        "word": "our",
                        "start": 74.762,
                        "end": 74.862
                    },
                    {
                        "word": "own",
                        "start": 74.962,
                        "end": 75.063
                    },
                    {
                        "word": "against",
                        "start": 75.123,
                        "end": 75.443
                    },
                    {
                        "word": "foreign",
                        "start": 75.543,
                        "end": 75.884
                    },
                    {
                        "word": "bikes.",
                        "start": 75.924,
                        "end": 76.304
                    }
                ]
            },
            {
                "text": "I agree. That's why I'm suggesting exporting, because I feel we can compete with the best of them.",
                "start": 76.725,
                "end": 83.695,
                "words": [
                    {
                        "word": "I",
                        "start": 76.725,
                        "end": 76.825
                    },
                    {
                        "word": "agree.",
                        "start": 76.905,
                        "end": 77.466
                    },
                    {
                        "word": "That's",
                        "start": 77.506,
                        "end": 78.167
                    },
                    {
                        "word": "why",
                        "start": 78.247,
                        "end": 78.548
                    },
                    {
                        "word": "I'm",
                        "start": 78.568,
                        "end": 78.888
                    },
                    {
                        "word": "suggesting",
                        "start": 78.968,
                        "end": 79.85
                    },
                    {
                        "word": "exporting,",
                        "start": 79.89,
                        "end": 80.851
                    },
                    {
                        "word": "because",
                        "start": 81.252,
                        "end": 81.452
                    },
                    {
                        "word": "I",
                        "start": 81.512,
                        "end": 81.572
                    },
                    {
                        "word": "feel",
                        "start": 81.692,
                        "end": 81.913
                    },
                    {
                        "word": "we",
                        "start": 81.973,
                        "end": 82.073
                    },
                    {
                        "word": "can",
                        "start": 82.093,
                        "end": 82.233
                    },
                    {
                        "word": "compete",
                        "start": 82.273,
                        "end": 82.714
                    },
                    {
                        "word": "with",
                        "start": 82.734,
                        "end": 82.834
                    },
                    {
                        "word": "the",
                        "start": 82.874,
                        "end": 82.934
                    },
                    {
                        "word": "best",
                        "start": 83.054,
                        "end": 83.375
                    },
                    {
                        "word": "of",
                        "start": 83.415,
                        "end": 83.455
                    },
                    {
                        "word": "them.",
                        "start": 83.535,
                        "end": 83.695
                    }
                ]
            },
            {
                "text": "What you are really saying is that we'd make more profit by selling bikes abroad, where we have a cost advantage and can charge higher prices.",
                "start": 85.177,
                "end": 93.79,
                "words": [
                    {
                        "word": "What",
                        "start": 85.177,
                        "end": 85.298
                    },
                    {
                        "word": "you",
                        "start": 85.338,
                        "end": 85.438
                    },
                    {
                        "word": "are",
                        "start": 85.498,
                        "end": 85.578
                    },
                    {
                        "word": "really",
                        "start": 85.658,
                        "end": 85.918
                    },
                    {
                        "word": "saying",
                        "start": 86.079,
                        "end": 86.439
                    },
                    {
                        "word": "is",
                        "start": 86.66,
                        "end": 86.76
                    },
                    {
                        "word": "that",
                        "start": 86.9,
                        "end": 87.08
                    },
                    {
                        "word": "we'd",
                        "start": 87.2,
                        "end": 87.381
                    },
                    {
                        "word": "make",
                        "start": 87.441,
                        "end": 87.621
                    },
                    {
                        "word": "more",
                        "start": 87.741,
                        "end": 87.961
                    },
                    {
                        "word": "profit",
                        "start": 88.042,
                        "end": 88.422
                    },
                    {
                        "word": "by",
                        "start": 88.502,
                        "end": 88.642
                    },
                    {
                        "word": "selling",
                        "start": 88.723,
                        "end": 88.983
                    },
                    {
                        "word": "bikes",
                        "start": 89.023,
                        "end": 89.444
                    },
                    {
                        "word": "abroad,",
                        "start": 89.544,
                        "end": 90.004
                    },
                    {
                        "word": "where",
                        "start": 90.585,
                        "end": 90.786
                    },
                    {
                        "word": "we",
                        "start": 90.826,
                        "end": 90.946
                    },
                    {
                        "word": "have",
                        "start": 90.986,
                        "end": 91.106
                    },
                    {
                        "word": "a",
                        "start": 91.126,
                        "end": 91.166
                    },
                    {
                        "word": "cost",
                        "start": 91.246,
                        "end": 91.467
                    },
                    {
                        "word": "advantage",
                        "start": 91.527,
                        "end": 92.047
                    },
                    {
                        "word": "and",
                        "start": 92.268,
                        "end": 92.348
                    },
                    {
                        "word": "can",
                        "start": 92.448,
                        "end": 92.608
                    },
                    {
                        "word": "charge",
                        "start": 92.668,
                        "end": 93.009
                    },
                    {
                        "word": "higher",
                        "start": 93.029,
                        "end": 93.329
                    },
                    {
                        "word": "prices?",
                        "start": 93.389,
                        "end": 93.79
                    }
                ]
            },
            {
                "text": "W:Exactly.",
                "start": 94.191,
                "end": 96.038,
                "words": [
                    {
                        "word": "Exactly.",
                        "start": 94.191,
                        "end": 95.192
                    },
                    {
                        "word": "But",
                        "start": 95.257,
                        "end": 95.477
                    },
                    {
                        "word": "wait",
                        "start": 95.858,
                        "end": 96.038
                    }
                ]
            },
            {
                "text": "But, wait a minute. Packaging, shipping, financing, etc. will push up our costs and we could end up no better off, maybe worse off.",
                "start": 95.257,
                "end": 105.368,
                "words": [
                    {
                        "word": "But",
                        "start": 95.257,
                        "end": 95.477
                    },
                    {
                        "word": "wait",
                        "start": 95.858,
                        "end": 96.038
                    },
                    {
                        "word": "a",
                        "start": 96.098,
                        "end": 96.118
                    },
                    {
                        "word": "minute.",
                        "start": 96.138,
                        "end": 96.378
                    },
                    {
                        "word": "Packaging,",
                        "start": 96.999,
                        "end": 97.519
                    },
                    {
                        "word": "shipping,",
                        "start": 97.84,
                        "end": 98.2
                    },
                    {
                        "word": "financing,",
                        "start": 98.601,
                        "end": 99.201
                    },
                    {
                        "word": "etc.",
                        "start": 99.281,
                        "end": 99.762
                    },
                    {
                        "word": "will",
                        "start": 100.182,
                        "end": 100.382
                    },
                    {
                        "word": "push",
                        "start": 100.442,
                        "end": 100.683
                    },
                    {
                        "word": "up",
                        "start": 100.783,
                        "end": 100.863
                    },
                    {
                        "word": "our",
                        "start": 101.003,
                        "end": 101.083
                    },
                    {
                        "word": "costs",
                        "start": 101.163,
                        "end": 101.464
                    },
                    {
                        "word": "and",
                        "start": 101.884,
                        "end": 101.964
                    },
                    {
                        "word": "we",
                        "start": 102.004,
                        "end": 102.104
                    },
                    {
                        "word": "could",
                        "start": 102.204,
                        "end": 102.405
                    },
                    {
                        "word": "end",
                        "start": 102.485,
                        "end": 102.605
                    },
                    {
                        "word": "up",
                        "start": 102.705,
                        "end": 102.765
                    },
                    {
                        "word": "no",
                        "start": 102.965,
                        "end": 103.145
                    },
                    {
                        "word": "better",
                        "start": 103.225,
                        "end": 103.506
                    },
                    {
                        "word": "off.",
                        "start": 103.646,
                        "end": 103.766
                    },
                    {
                        "word": "Maybe",
                        "start": 104.387,
                        "end": 104.627
                    },
                    {
                        "word": "worse",
                        "start": 104.747,
                        "end": 105.127
                    },
                    {
                        "word": "off.",
                        "start": 105.227,
                        "end": 105.368
                    }
                ]
            },
            {
                "text": "OK. Now there are extra costs involved. But if we do it right, they can be built into the price of the bike and we can still be competitive.",
                "start": 106.409,
                "end": 117.641,
                "words": [
                    {
                        "word": "Okay.",
                        "start": 106.409,
                        "end": 107.27
                    },
                    {
                        "word": "Now",
                        "start": 107.29,
                        "end": 107.45
                    },
                    {
                        "word": "there",
                        "start": 107.53,
                        "end": 107.71
                    },
                    {
                        "word": "are",
                        "start": 107.81,
                        "end": 107.93
                    },
                    {
                        "word": "extra",
                        "start": 107.97,
                        "end": 108.431
                    },
                    {
                        "word": "costs",
                        "start": 108.471,
                        "end": 108.791
                    },
                    {
                        "word": "involved,",
                        "start": 108.871,
                        "end": 109.332
                    },
                    {
                        "word": "but",
                        "start": 110.013,
                        "end": 110.333
                    },
                    {
                        "word": "if",
                        "start": 110.373,
                        "end": 110.673
                    },
                    {
                        "word": "we",
                        "start": 110.733,
                        "end": 110.873
                    },
                    {
                        "word": "do",
                        "start": 110.913,
                        "end": 111.034
                    },
                    {
                        "word": "it",
                        "start": 111.114,
                        "end": 111.174
                    },
                    {
                        "word": "right,",
                        "start": 111.254,
                        "end": 111.534
                    },
                    {
                        "word": "they",
                        "start": 111.594,
                        "end": 111.854
                    },
                    {
                        "word": "can",
                        "start": 111.894,
                        "end": 112.015
                    },
                    {
                        "word": "be",
                        "start": 112.075,
                        "end": 112.195
                    },
                    {
                        "word": "built",
                        "start": 112.275,
                        "end": 112.555
                    },
                    {
                        "word": "into",
                        "start": 112.715,
                        "end": 112.916
                    },
                    {
                        "word": "the",
                        "start": 112.956,
                        "end": 113.016
                    },
                    {
                        "word": "price",
                        "start": 113.116,
                        "end": 113.496
                    },
                    {
                        "word": "of",
                        "start": 113.616,
                        "end": 113.696
                    },
                    {
                        "word": "the",
                        "start": 113.716,
                        "end": 113.817
                    },
                    {
                        "word": "bike",
                        "start": 113.897,
                        "end": 114.217
                    },
                    {
                        "word": "and",
                        "start": 114.637,
                        "end": 114.717
                    },
                    {
                        "word": "we",
                        "start": 114.758,
                        "end": 114.858
                    },
                    {
                        "word": "can",
                        "start": 114.898,
                        "end": 115.038
                    },
                    {
                        "word": "still",
                        "start": 115.098,
                        "end": 115.378
                    },
                    {
                        "word": "be",
                        "start": 115.478,
                        "end": 115.658
                    },
                    {
                        "word": "competitive.",
                        "start": 116.039,
                        "end": 117.641
                    }
                ]
            },
            {
                "text": "How sure are you about our chances of success in the foreign market?",
                "start": 117.661,
                "end": 121.905,
                "words": [
                    {
                        "word": "How",
                        "start": 117.661,
                        "end": 117.861
                    },
                    {
                        "word": "sure",
                        "start": 118.041,
                        "end": 118.381
                    },
                    {
                        "word": "are",
                        "start": 118.521,
                        "end": 118.602
                    },
                    {
                        "word": "you",
                        "start": 118.662,
                        "end": 118.862
                    },
                    {
                        "word": "about",
                        "start": 119.042,
                        "end": 119.302
                    },
                    {
                        "word": "our",
                        "start": 119.442,
                        "end": 119.523
                    },
                    {
                        "word": "chances",
                        "start": 119.623,
                        "end": 120.043
                    },
                    {
                        "word": "of",
                        "start": 120.103,
                        "end": 120.143
                    },
                    {
                        "word": "success",
                        "start": 120.243,
                        "end": 120.744
                    },
                    {
                        "word": "in",
                        "start": 120.824,
                        "end": 120.884
                    },
                    {
                        "word": "the",
                        "start": 120.924,
                        "end": 121.004
                    },
                    {
                        "word": "foreign",
                        "start": 121.064,
                        "end": 121.384
                    },
                    {
                        "word": "market?",
                        "start": 121.425,
                        "end": 121.905
                    }
                ]
            },
            {
                "text": "Well, that's the sticky one. It's going to need a lot of research. I'm hoping to get your help. Well, come on, Jack. Is it worth it, or not?",
                "start": 122.172,
                "end": 131.667,
                "words": [
                    {
                        "word": "Well,",
                        "start": 122.172,
                        "end": 122.412
                    },
                    {
                        "word": "that's",
                        "start": 122.432,
                        "end": 122.673
                    },
                    {
                        "word": "the",
                        "start": 122.753,
                        "end": 122.853
                    },
                    {
                        "word": "sticky",
                        "start": 122.933,
                        "end": 123.314
                    },
                    {
                        "word": "one.",
                        "start": 123.434,
                        "end": 123.574
                    },
                    {
                        "word": "It's",
                        "start": 124.195,
                        "end": 124.315
                    },
                    {
                        "word": "going",
                        "start": 124.375,
                        "end": 124.636
                    },
                    {
                        "word": "to",
                        "start": 124.676,
                        "end": 124.776
                    },
                    {
                        "word": "need",
                        "start": 124.816,
                        "end": 124.996
                    },
                    {
                        "word": "a",
                        "start": 125.036,
                        "end": 125.056
                    },
                    {
                        "word": "lot",
                        "start": 125.097,
                        "end": 125.277
                    },
                    {
                        "word": "of",
                        "start": 125.317,
                        "end": 125.357
                    },
                    {
                        "word": "research.",
                        "start": 125.377,
                        "end": 125.998
                    },
                    {
                        "word": "I'm",
                        "start": 126.539,
                        "end": 126.659
                    },
                    {
                        "word": "hoping",
                        "start": 126.699,
                        "end": 126.999
                    },
                    {
                        "word": "to",
                        "start": 127.04,
                        "end": 127.1
                    },
                    {
                        "word": "get",
                        "start": 127.16,
                        "end": 127.26
                    },
                    {
                        "word": "your",
                        "start": 127.32,
                        "end": 127.46
                    },
                    {
                        "word": "help.",
                        "start": 127.5,
                        "end": 127.801
                    },
                    {
                        "word": "Well,",
                        "start": 128.582,
                        "end": 128.762
                    },
                    {
                        "word": "come",
                        "start": 128.782,
                        "end": 128.922
                    },
                    {
                        "word": "on,",
                        "start": 129.043,
                        "end": 129.163
                    },
                    {
                        "word": "Jack.",
                        "start": 129.263,
                        "end": 129.603
                    },
                    {
                        "word": "Is",
                        "start": 130.084,
                        "end": 130.164
                    },
                    {
                        "word": "it",
                        "start": 130.224,
                        "end": 130.264
                    },
                    {
                        "word": "worth",
                        "start": 130.385,
                        "end": 130.665
                    },
                    {
                        "word": "it",
                        "start": 130.765,
                        "end": 130.845
                    },
                    {
                        "word": "or",
                        "start": 131.286,
                        "end": 131.366
                    },
                    {
                        "word": "not?",
                        "start": 131.406,
                        "end": 131.667
                    }
                ]
            },
            {
                "text": "There'll be a lot of problems.",
                "start": 132.688,
                "end": 134.531,
                "words": [
                    {
                        "word": "There'll",
                        "start": 132.688,
                        "end": 133.049
                    },
                    {
                        "word": "be",
                        "start": 133.089,
                        "end": 133.229
                    },
                    {
                        "word": "a",
                        "start": 133.309,
                        "end": 133.329
                    },
                    {
                        "word": "lot",
                        "start": 133.449,
                        "end": 133.65
                    },
                    {
                        "word": "of",
                        "start": 133.69,
                        "end": 133.73
                    },
                    {
                        "word": "problems.",
                        "start": 133.89,
                        "end": 134.531
                    }
                ]
            },
            {
                "text": "Nothing we can't handle.",
                "start": 135.312,
                "end": 136.494,
                "words": [
                    {
                        "word": "Nothing",
                        "start": 135.312,
                        "end": 135.633
                    },
                    {
                        "word": "we",
                        "start": 135.673,
                        "end": 135.793
                    },
                    {
                        "word": "can't",
                        "start": 135.833,
                        "end": 136.073
                    },
                    {
                        "word": "handle.",
                        "start": 136.093,
                        "end": 136.494
                    }
                ]
            },
            {
                "text": "Marvellous, Jack. I was hoping you'd be on my side.",
                "start": 144.506,
                "end": 147.471,
                "words": [
                    {
                        "word": "Marvelous,",
                        "start": 144.506,
                        "end": 145.067
                    },
                    {
                        "word": "Jack.",
                        "start": 145.127,
                        "end": 145.448
                    },
                    {
                        "word": "I",
                        "start": 145.588,
                        "end": 145.628
                    },
                    {
                        "word": "was",
                        "start": 145.668,
                        "end": 145.788
                    },
                    {
                        "word": "hoping",
                        "start": 145.969,
                        "end": 146.309
                    },
                    {
                        "word": "you'd",
                        "start": 146.349,
                        "end": 146.51
                    },
                    {
                        "word": "be",
                        "start": 146.55,
                        "end": 146.63
                    },
                    {
                        "word": "on",
                        "start": 146.69,
                        "end": 146.75
                    },
                    {
                        "word": "my",
                        "start": 146.79,
                        "end": 146.91
                    },
                    {
                        "word": "side.",
                        "start": 146.97,
                        "end": 147.471
                    }
                ]
            }
        ]
    },
    {
        "id": "conversation_2",
        "title": "Conversation Two",
        "audio_source": "2015.06_cet6_1.mp3",
        "full_audio_range": {
            "start": 236.457,
            "end": 335.003
        },
        "sentences": [
            {
                "text": "When we think of energy or fuel for our homes and cars, we think of petroleum—a fossil fuel processed from oil removed from the ground, of which there is a limited supply. But alternative fuels can be many things—wind, sun and water can all be used to create fuel.",
                "start": 236.457,
                "end": 255.096,
                "words": [
                    {
                        "word": "When",
                        "start": 236.457,
                        "end": 236.578
                    },
                    {
                        "word": "we",
                        "start": 236.618,
                        "end": 236.718
                    },
                    {
                        "word": "think",
                        "start": 236.778,
                        "end": 236.978
                    },
                    {
                        "word": "of",
                        "start": 237.038,
                        "end": 237.078
                    },
                    {
                        "word": "energy,",
                        "start": 237.118,
                        "end": 237.739
                    },
                    {
                        "word": "or",
                        "start": 238.019,
                        "end": 238.099
                    },
                    {
                        "word": "fuel,",
                        "start": 238.139,
                        "end": 238.66
                    },
                    {
                        "word": "for",
                        "start": 239.02,
                        "end": 239.14
                    },
                    {
                        "word": "our",
                        "start": 239.24,
                        "end": 239.34
                    },
                    {
                        "word": "homes",
                        "start": 239.38,
                        "end": 239.681
                    },
                    {
                        "word": "and",
                        "start": 239.761,
                        "end": 239.861
                    },
                    {
                        "word": "cars,",
                        "start": 239.941,
                        "end": 240.341
                    },
                    {
                        "word": "we",
                        "start": 240.702,
                        "end": 240.782
                    },
                    {
                        "word": "think",
                        "start": 240.842,
                        "end": 240.982
                    },
                    {
                        "word": "of",
                        "start": 241.022,
                        "end": 241.062
                    },
                    {
                        "word": "petroleum,",
                        "start": 241.122,
                        "end": 241.763
                    },
                    {
                        "word": "a",
                        "start": 242.043,
                        "end": 242.103
                    },
                    {
                        "word": "fossil",
                        "start": 242.203,
                        "end": 242.584
                    },
                    {
                        "word": "fuel",
                        "start": 242.624,
                        "end": 242.884
                    },
                    {
                        "word": "processed",
                        "start": 242.984,
                        "end": 243.485
                    },
                    {
                        "word": "from",
                        "start": 243.525,
                        "end": 243.665
                    },
                    {
                        "word": "oil",
                        "start": 243.685,
                        "end": 244.085
                    },
                    {
                        "word": "removed",
                        "start": 244.125,
                        "end": 244.646
                    },
                    {
                        "word": "from",
                        "start": 244.726,
                        "end": 244.866
                    },
                    {
                        "word": "the",
                        "start": 244.886,
                        "end": 245.026
                    },
                    {
                        "word": "ground,",
                        "start": 245.086,
                        "end": 245.467
                    },
                    {
                        "word": "of",
                        "start": 245.907,
                        "end": 245.967
                    },
                    {
                        "word": "which",
                        "start": 246.027,
                        "end": 246.187
                    },
                    {
                        "word": "there",
                        "start": 246.247,
                        "end": 246.388
                    },
                    {
                        "word": "is",
                        "start": 246.448,
                        "end": 246.528
                    },
                    {
                        "word": "a",
                        "start": 246.568,
                        "end": 246.608
                    },
                    {
                        "word": "limited",
                        "start": 246.748,
                        "end": 247.188
                    },
                    {
                        "word": "supply.",
                        "start": 247.268,
                        "end": 247.729
                    },
                    {
                        "word": "But",
                        "start": 248.53,
                        "end": 248.67
                    },
                    {
                        "word": "alternative",
                        "start": 248.83,
                        "end": 249.431
                    },
                    {
                        "word": "fuels",
                        "start": 249.471,
                        "end": 249.791
                    },
                    {
                        "word": "can",
                        "start": 249.951,
                        "end": 250.071
                    },
                    {
                        "word": "be",
                        "start": 250.111,
                        "end": 250.191
                    },
                    {
                        "word": "many",
                        "start": 250.251,
                        "end": 250.452
                    },
                    {
                        "word": "things.",
                        "start": 250.552,
                        "end": 250.892
                    },
                    {
                        "word": "Wind,",
                        "start": 251.192,
                        "end": 251.533
                    },
                    {
                        "word": "sun,",
                        "start": 251.673,
                        "end": 251.953
                    },
                    {
                        "word": "and",
                        "start": 252.033,
                        "end": 252.113
                    },
                    {
                        "word": "water",
                        "start": 252.274,
                        "end": 252.674
                    },
                    {
                        "word": "can",
                        "start": 252.774,
                        "end": 252.934
                    },
                    {
                        "word": "all",
                        "start": 253.154,
                        "end": 253.295
                    },
                    {
                        "word": "be",
                        "start": 253.355,
                        "end": 253.495
                    },
                    {
                        "word": "used",
                        "start": 253.695,
                        "end": 253.895
                    },
                    {
                        "word": "to",
                        "start": 253.975,
                        "end": 254.075
                    },
                    {
                        "word": "create",
                        "start": 254.175,
                        "end": 254.636
                    },
                    {
                        "word": "fuel.",
                        "start": 254.656,
                        "end": 255.096
                    }
                ]
            },
            {
                "text": "Is the threat of running out of petroleum real?",
                "start": 256.238,
                "end": 258.66,
                "words": [
                    {
                        "word": "Is",
                        "start": 256.238,
                        "end": 256.338
                    },
                    {
                        "word": "the",
                        "start": 256.378,
                        "end": 256.498
                    },
                    {
                        "word": "threat",
                        "start": 256.558,
                        "end": 256.798
                    },
                    {
                        "word": "of",
                        "start": 256.838,
                        "end": 256.878
                    },
                    {
                        "word": "running",
                        "start": 256.958,
                        "end": 257.219
                    },
                    {
                        "word": "out",
                        "start": 257.359,
                        "end": 257.459
                    },
                    {
                        "word": "of",
                        "start": 257.519,
                        "end": 257.559
                    },
                    {
                        "word": "petroleum",
                        "start": 257.639,
                        "end": 258.22
                    },
                    {
                        "word": "real?",
                        "start": 258.28,
                        "end": 258.66
                    }
                ]
            },
            {
                "text": "It has taken thousands of years to create the natural stores of petroleum we have now. We are using what is available at a much faster rate than it has been produced over time. The real controversy surrounding the amounts of petroleum we have is how much we need to keep in reserve for future use. Most experts agree that by around 2025, the amount of petroleum we use will reach a peak. Then production and availability will begin to seriously decline. This is not to say there will be no petroleum at this point. But it'll become very difficult and therefore expensive to extract.",
                "start": 259.366,
                "end": 299.255,
                "words": [
                    {
                        "word": "It",
                        "start": 259.366,
                        "end": 259.546
                    },
                    {
                        "word": "has",
                        "start": 259.606,
                        "end": 259.747
                    },
                    {
                        "word": "taken",
                        "start": 259.767,
                        "end": 260.127
                    },
                    {
                        "word": "thousands",
                        "start": 260.167,
                        "end": 260.889
                    },
                    {
                        "word": "of",
                        "start": 260.949,
                        "end": 260.989
                    },
                    {
                        "word": "years",
                        "start": 261.069,
                        "end": 261.369
                    },
                    {
                        "word": "to",
                        "start": 261.409,
                        "end": 261.61
                    },
                    {
                        "word": "create",
                        "start": 261.71,
                        "end": 262.091
                    },
                    {
                        "word": "the",
                        "start": 262.111,
                        "end": 262.251
                    },
                    {
                        "word": "natural",
                        "start": 262.371,
                        "end": 262.772
                    },
                    {
                        "word": "stores",
                        "start": 262.852,
                        "end": 263.212
                    },
                    {
                        "word": "of",
                        "start": 263.273,
                        "end": 263.313
                    },
                    {
                        "word": "petroleum",
                        "start": 263.393,
                        "end": 264.034
                    },
                    {
                        "word": "we",
                        "start": 264.134,
                        "end": 264.254
                    },
                    {
                        "word": "have",
                        "start": 264.314,
                        "end": 264.515
                    },
                    {
                        "word": "now.",
                        "start": 264.595,
                        "end": 264.815
                    },
                    {
                        "word": "We",
                        "start": 265.677,
                        "end": 265.757
                    },
                    {
                        "word": "are",
                        "start": 265.817,
                        "end": 265.897
                    },
                    {
                        "word": "using",
                        "start": 266.057,
                        "end": 266.298
                    },
                    {
                        "word": "what",
                        "start": 266.338,
                        "end": 266.598
                    },
                    {
                        "word": "is",
                        "start": 266.658,
                        "end": 266.718
                    },
                    {
                        "word": "available",
                        "start": 266.798,
                        "end": 267.279
                    },
                    {
                        "word": "at",
                        "start": 267.66,
                        "end": 267.72
                    },
                    {
                        "word": "a",
                        "start": 267.78,
                        "end": 267.8
                    },
                    {
                        "word": "much",
                        "start": 267.94,
                        "end": 268.161
                    },
                    {
                        "word": "faster",
                        "start": 268.321,
                        "end": 268.742
                    },
                    {
                        "word": "rate",
                        "start": 268.782,
                        "end": 269.202
                    },
                    {
                        "word": "than",
                        "start": 269.643,
                        "end": 269.783
                    },
                    {
                        "word": "it",
                        "start": 269.864,
                        "end": 269.944
                    },
                    {
                        "word": "is",
                        "start": 270.024,
                        "end": 270.104
                    },
                    {
                        "word": "being",
                        "start": 270.144,
                        "end": 270.324
                    },
                    {
                        "word": "produced",
                        "start": 270.384,
                        "end": 270.785
                    },
                    {
                        "word": "over",
                        "start": 270.865,
                        "end": 271.025
                    },
                    {
                        "word": "time.",
                        "start": 271.086,
                        "end": 271.366
                    },
                    {
                        "word": "The",
                        "start": 272.228,
                        "end": 272.308
                    },
                    {
                        "word": "real",
                        "start": 272.348,
                        "end": 272.568
                    },
                    {
                        "word": "controversy",
                        "start": 272.668,
                        "end": 273.309
                    },
                    {
                        "word": "surrounding",
                        "start": 273.389,
                        "end": 273.97
                    },
                    {
                        "word": "the",
                        "start": 274.01,
                        "end": 274.111
                    },
                    {
                        "word": "amounts",
                        "start": 274.171,
                        "end": 274.471
                    },
                    {
                        "word": "of",
                        "start": 274.511,
                        "end": 274.551
                    },
                    {
                        "word": "petroleum",
                        "start": 274.611,
                        "end": 275.132
                    },
                    {
                        "word": "we",
                        "start": 275.172,
                        "end": 275.293
                    },
                    {
                        "word": "have",
                        "start": 275.353,
                        "end": 275.573
                    },
                    {
                        "word": "is",
                        "start": 275.773,
                        "end": 275.854
                    },
                    {
                        "word": "how",
                        "start": 276.014,
                        "end": 276.214
                    },
                    {
                        "word": "much",
                        "start": 276.314,
                        "end": 276.515
                    },
                    {
                        "word": "we",
                        "start": 276.595,
                        "end": 276.715
                    },
                    {
                        "word": "need",
                        "start": 276.775,
                        "end": 276.995
                    },
                    {
                        "word": "to",
                        "start": 277.036,
                        "end": 277.116
                    },
                    {
                        "word": "keep",
                        "start": 277.216,
                        "end": 277.436
                    },
                    {
                        "word": "in",
                        "start": 277.516,
                        "end": 277.576
                    },
                    {
                        "word": "reserve",
                        "start": 277.637,
                        "end": 278.117
                    },
                    {
                        "word": "for",
                        "start": 278.197,
                        "end": 278.318
                    },
                    {
                        "word": "future",
                        "start": 278.418,
                        "end": 278.778
                    },
                    {
                        "word": "use.",
                        "start": 278.979,
                        "end": 279.72
                    },
                    {
                        "word": "Most",
                        "start": 279.835,
                        "end": 280.115
                    },
                    {
                        "word": "experts",
                        "start": 280.315,
                        "end": 280.716
                    },
                    {
                        "word": "agree",
                        "start": 280.816,
                        "end": 281.156
                    },
                    {
                        "word": "that",
                        "start": 281.457,
                        "end": 281.597
                    },
                    {
                        "word": "by",
                        "start": 281.697,
                        "end": 281.897
                    },
                    {
                        "word": "around",
                        "start": 281.937,
                        "end": 282.217
                    },
                    {
                        "word": "2025,",
                        "start": 282.237,
                        "end": 283.559
                    },
                    {
                        "word": "the",
                        "start": 283.579,
                        "end": 284.039
                    },
                    {
                        "word": "amount",
                        "start": 284.079,
                        "end": 284.3
                    },
                    {
                        "word": "of",
                        "start": 284.34,
                        "end": 284.38
                    },
                    {
                        "word": "petroleum",
                        "start": 284.42,
                        "end": 284.96
                    },
                    {
                        "word": "we",
                        "start": 285.0,
                        "end": 285.141
                    },
                    {
                        "word": "use",
                        "start": 285.321,
                        "end": 285.481
                    },
                    {
                        "word": "will",
                        "start": 285.521,
                        "end": 285.701
                    },
                    {
                        "word": "reach",
                        "start": 285.781,
                        "end": 286.001
                    },
                    {
                        "word": "a",
                        "start": 286.081,
                        "end": 286.102
                    },
                    {
                        "word": "peak,",
                        "start": 286.222,
                        "end": 286.922
                    },
                    {
                        "word": "then",
                        "start": 286.942,
                        "end": 287.103
                    },
                    {
                        "word": "production",
                        "start": 287.163,
                        "end": 287.683
                    },
                    {
                        "word": "and",
                        "start": 287.823,
                        "end": 287.903
                    },
                    {
                        "word": "availability",
                        "start": 287.943,
                        "end": 288.704
                    },
                    {
                        "word": "will",
                        "start": 288.985,
                        "end": 289.145
                    },
                    {
                        "word": "begin",
                        "start": 289.165,
                        "end": 289.445
                    },
                    {
                        "word": "to",
                        "start": 289.525,
                        "end": 289.625
                    },
                    {
                        "word": "seriously",
                        "start": 289.805,
                        "end": 290.286
                    },
                    {
                        "word": "decline.",
                        "start": 290.346,
                        "end": 290.786
                    },
                    {
                        "word": "This",
                        "start": 291.607,
                        "end": 291.747
                    },
                    {
                        "word": "is",
                        "start": 291.807,
                        "end": 291.888
                    },
                    {
                        "word": "not",
                        "start": 291.988,
                        "end": 292.188
                    },
                    {
                        "word": "to",
                        "start": 292.228,
                        "end": 292.308
                    },
                    {
                        "word": "say",
                        "start": 292.408,
                        "end": 292.588
                    },
                    {
                        "word": "there",
                        "start": 292.628,
                        "end": 292.788
                    },
                    {
                        "word": "will",
                        "start": 292.808,
                        "end": 292.949
                    },
                    {
                        "word": "be",
                        "start": 292.969,
                        "end": 293.049
                    },
                    {
                        "word": "no",
                        "start": 293.129,
                        "end": 293.269
                    },
                    {
                        "word": "petroleum",
                        "start": 293.329,
                        "end": 294.03
                    },
                    {
                        "word": "at",
                        "start": 294.09,
                        "end": 294.15
                    },
                    {
                        "word": "this",
                        "start": 294.21,
                        "end": 294.37
                    },
                    {
                        "word": "point,",
                        "start": 294.47,
                        "end": 294.73
                    },
                    {
                        "word": "but",
                        "start": 295.151,
                        "end": 295.271
                    },
                    {
                        "word": "it",
                        "start": 295.371,
                        "end": 295.411
                    },
                    {
                        "word": "will",
                        "start": 295.431,
                        "end": 295.531
                    },
                    {
                        "word": "become",
                        "start": 295.571,
                        "end": 295.852
                    },
                    {
                        "word": "very",
                        "start": 295.992,
                        "end": 296.252
                    },
                    {
                        "word": "difficult",
                        "start": 296.392,
                        "end": 296.933
                    },
                    {
                        "word": "and",
                        "start": 297.093,
                        "end": 297.173
                    },
                    {
                        "word": "therefore",
                        "start": 297.253,
                        "end": 297.654
                    },
                    {
                        "word": "expensive",
                        "start": 297.754,
                        "end": 298.434
                    },
                    {
                        "word": "to",
                        "start": 298.534,
                        "end": 298.655
                    },
                    {
                        "word": "extract.",
                        "start": 298.735,
                        "end": 299.255
                    }
                ]
            },
            {
                "text": "Is that the most important reason to develop alternative fuel and energy sources?",
                "start": 300.496,
                "end": 304.861,
                "words": [
                    {
                        "word": "Is",
                        "start": 300.496,
                        "end": 300.577
                    },
                    {
                        "word": "that",
                        "start": 300.617,
                        "end": 300.737
                    },
                    {
                        "word": "the",
                        "start": 300.777,
                        "end": 300.857
                    },
                    {
                        "word": "most",
                        "start": 300.897,
                        "end": 301.097
                    },
                    {
                        "word": "important",
                        "start": 301.157,
                        "end": 301.618
                    },
                    {
                        "word": "reason",
                        "start": 301.658,
                        "end": 302.038
                    },
                    {
                        "word": "to",
                        "start": 302.058,
                        "end": 302.178
                    },
                    {
                        "word": "develop",
                        "start": 302.218,
                        "end": 302.579
                    },
                    {
                        "word": "alternative",
                        "start": 302.659,
                        "end": 303.159
                    },
                    {
                        "word": "fuel",
                        "start": 303.239,
                        "end": 303.62
                    },
                    {
                        "word": "and",
                        "start": 303.8,
                        "end": 303.88
                    },
                    {
                        "word": "energy",
                        "start": 303.96,
                        "end": 304.3
                    },
                    {
                        "word": "sources?",
                        "start": 304.34,
                        "end": 304.861
                    }
                ]
            },
            {
                "text": "There're two very clear reasons to do so. One is that whether we have 60 or 600 years of fossil fuels left, we have to find other fuel sources eventually. So the sooner we start, the better off we will be. The other big argument is that when you burn fossil fuels, you release substances trapped in the ground for a long time, which leads to some long-term negative effects, like global warming and the greenhouse effect.",
                "start": 305.922,
                "end": 335.003,
                "words": [
                    {
                        "word": "There",
                        "start": 305.922,
                        "end": 306.022
                    },
                    {
                        "word": "are",
                        "start": 306.062,
                        "end": 306.122
                    },
                    {
                        "word": "two",
                        "start": 306.162,
                        "end": 306.323
                    },
                    {
                        "word": "very",
                        "start": 306.403,
                        "end": 306.623
                    },
                    {
                        "word": "clear",
                        "start": 306.743,
                        "end": 307.003
                    },
                    {
                        "word": "reasons",
                        "start": 307.103,
                        "end": 307.504
                    },
                    {
                        "word": "to",
                        "start": 307.564,
                        "end": 307.664
                    },
                    {
                        "word": "do",
                        "start": 307.724,
                        "end": 307.884
                    },
                    {
                        "word": "so.",
                        "start": 307.964,
                        "end": 308.745
                    },
                    {
                        "word": "One",
                        "start": 308.995,
                        "end": 309.255
                    },
                    {
                        "word": "is",
                        "start": 309.355,
                        "end": 309.435
                    },
                    {
                        "word": "that",
                        "start": 309.476,
                        "end": 309.796
                    },
                    {
                        "word": "whether",
                        "start": 309.836,
                        "end": 310.236
                    },
                    {
                        "word": "we",
                        "start": 310.276,
                        "end": 310.376
                    },
                    {
                        "word": "have",
                        "start": 310.437,
                        "end": 310.637
                    },
                    {
                        "word": "60",
                        "start": 310.657,
                        "end": 311.117
                    },
                    {
                        "word": "or",
                        "start": 311.358,
                        "end": 311.438
                    },
                    {
                        "word": "600",
                        "start": 311.458,
                        "end": 311.518
                    },
                    {
                        "word": "years",
                        "start": 312.379,
                        "end": 312.619
                    },
                    {
                        "word": "of",
                        "start": 312.699,
                        "end": 312.739
                    },
                    {
                        "word": "fossil",
                        "start": 312.819,
                        "end": 313.139
                    },
                    {
                        "word": "fuels",
                        "start": 313.18,
                        "end": 313.46
                    },
                    {
                        "word": "left,",
                        "start": 313.58,
                        "end": 313.86
                    },
                    {
                        "word": "we",
                        "start": 314.381,
                        "end": 314.481
                    },
                    {
                        "word": "have",
                        "start": 314.541,
                        "end": 314.701
                    },
                    {
                        "word": "to",
                        "start": 314.741,
                        "end": 314.821
                    },
                    {
                        "word": "find",
                        "start": 314.881,
                        "end": 315.102
                    },
                    {
                        "word": "other",
                        "start": 315.282,
                        "end": 315.462
                    },
                    {
                        "word": "fuel",
                        "start": 315.542,
                        "end": 315.822
                    },
                    {
                        "word": "sources",
                        "start": 315.902,
                        "end": 316.283
                    },
                    {
                        "word": "eventually,",
                        "start": 316.323,
                        "end": 317.004
                    },
                    {
                        "word": "so",
                        "start": 317.504,
                        "end": 317.624
                    },
                    {
                        "word": "the",
                        "start": 317.664,
                        "end": 317.764
                    },
                    {
                        "word": "sooner",
                        "start": 317.865,
                        "end": 318.125
                    },
                    {
                        "word": "we",
                        "start": 318.165,
                        "end": 318.285
                    },
                    {
                        "word": "start,",
                        "start": 318.385,
                        "end": 318.806
                    },
                    {
                        "word": "the",
                        "start": 319.106,
                        "end": 319.206
                    },
                    {
                        "word": "better",
                        "start": 319.266,
                        "end": 319.546
                    },
                    {
                        "word": "off",
                        "start": 319.727,
                        "end": 319.867
                    },
                    {
                        "word": "we",
                        "start": 319.967,
                        "end": 320.087
                    },
                    {
                        "word": "will",
                        "start": 320.127,
                        "end": 320.287
                    },
                    {
                        "word": "be.",
                        "start": 320.327,
                        "end": 320.487
                    },
                    {
                        "word": "The",
                        "start": 320.547,
                        "end": 321.529
                    },
                    {
                        "word": "other",
                        "start": 321.629,
                        "end": 321.809
                    },
                    {
                        "word": "big",
                        "start": 321.869,
                        "end": 322.029
                    },
                    {
                        "word": "argument",
                        "start": 322.149,
                        "end": 322.51
                    },
                    {
                        "word": "is",
                        "start": 322.87,
                        "end": 322.93
                    },
                    {
                        "word": "that",
                        "start": 322.97,
                        "end": 323.09
                    },
                    {
                        "word": "when",
                        "start": 323.15,
                        "end": 323.27
                    },
                    {
                        "word": "you",
                        "start": 323.31,
                        "end": 323.431
                    },
                    {
                        "word": "burn",
                        "start": 323.491,
                        "end": 323.751
                    },
                    {
                        "word": "fossil",
                        "start": 323.871,
                        "end": 324.211
                    },
                    {
                        "word": "fuels,",
                        "start": 324.291,
                        "end": 324.612
                    },
                    {
                        "word": "you",
                        "start": 325.052,
                        "end": 325.212
                    },
                    {
                        "word": "release",
                        "start": 325.253,
                        "end": 325.753
                    },
                    {
                        "word": "substances",
                        "start": 325.873,
                        "end": 326.494
                    },
                    {
                        "word": "trapped",
                        "start": 326.694,
                        "end": 327.014
                    },
                    {
                        "word": "in",
                        "start": 327.095,
                        "end": 327.155
                    },
                    {
                        "word": "the",
                        "start": 327.175,
                        "end": 327.255
                    },
                    {
                        "word": "ground",
                        "start": 327.335,
                        "end": 327.655
                    },
                    {
                        "word": "for",
                        "start": 327.715,
                        "end": 327.855
                    },
                    {
                        "word": "a",
                        "start": 327.895,
                        "end": 327.935
                    },
                    {
                        "word": "long",
                        "start": 328.056,
                        "end": 328.316
                    },
                    {
                        "word": "time,",
                        "start": 328.416,
                        "end": 328.716
                    },
                    {
                        "word": "which",
                        "start": 329.277,
                        "end": 329.417
                    },
                    {
                        "word": "leads",
                        "start": 329.437,
                        "end": 329.777
                    },
                    {
                        "word": "to",
                        "start": 329.857,
                        "end": 329.958
                    },
                    {
                        "word": "some",
                        "start": 330.058,
                        "end": 330.258
                    },
                    {
                        "word": "long-term",
                        "start": 330.358,
                        "end": 330.999
                    },
                    {
                        "word": "negative",
                        "start": 331.079,
                        "end": 331.499
                    },
                    {
                        "word": "effects",
                        "start": 331.559,
                        "end": 332.02
                    },
                    {
                        "word": "like",
                        "start": 332.18,
                        "end": 332.36
                    },
                    {
                        "word": "global",
                        "start": 332.6,
                        "end": 332.961
                    },
                    {
                        "word": "warming",
                        "start": 332.981,
                        "end": 333.421
                    },
                    {
                        "word": "and",
                        "start": 333.501,
                        "end": 333.581
                    },
                    {
                        "word": "the",
                        "start": 333.642,
                        "end": 333.702
                    },
                    {
                        "word": "greenhouse",
                        "start": 333.802,
                        "end": 334.382
                    },
                    {
                        "word": "effect.",
                        "start": 334.422,
                        "end": 335.003
                    }
                ]
            }
        ]
    },
    {
        "id": "passage_1",
        "title": "Passage One",
        "audio_source": "2015.06_cet6_1.mp3",
        "full_audio_range": {
            "start": 448.581,
            "end": 556.458
        },
        "sentences": [
            {
                "text": "Karen Smith is a buyer for a department store in New York. Department store buyers purchase the goods that their stores sell. They not only have to know what is fashionable at the moment, but also have to guess what will become fashionable next season or next year. Most buyers work for just one department in a store. But",
                "start": 448.581,
                "end": 470.632,
                "words": [
                    {
                        "word": "Karen",
                        "start": 448.581,
                        "end": 448.902
                    },
                    {
                        "word": "Smith",
                        "start": 448.922,
                        "end": 449.182
                    },
                    {
                        "word": "is",
                        "start": 449.262,
                        "end": 449.342
                    },
                    {
                        "word": "a",
                        "start": 449.362,
                        "end": 449.422
                    },
                    {
                        "word": "buyer",
                        "start": 449.543,
                        "end": 449.923
                    },
                    {
                        "word": "for",
                        "start": 450.023,
                        "end": 450.123
                    },
                    {
                        "word": "a",
                        "start": 450.164,
                        "end": 450.204
                    },
                    {
                        "word": "department",
                        "start": 450.264,
                        "end": 450.824
                    },
                    {
                        "word": "store",
                        "start": 450.865,
                        "end": 451.125
                    },
                    {
                        "word": "in",
                        "start": 451.185,
                        "end": 451.225
                    },
                    {
                        "word": "New",
                        "start": 451.265,
                        "end": 451.425
                    },
                    {
                        "word": "York.",
                        "start": 451.465,
                        "end": 452.407
                    },
                    {
                        "word": "Department",
                        "start": 452.427,
                        "end": 452.887
                    },
                    {
                        "word": "store",
                        "start": 452.928,
                        "end": 453.168
                    },
                    {
                        "word": "buyers",
                        "start": 453.228,
                        "end": 453.629
                    },
                    {
                        "word": "purchase",
                        "start": 453.809,
                        "end": 454.229
                    },
                    {
                        "word": "the",
                        "start": 454.269,
                        "end": 454.37
                    },
                    {
                        "word": "goods",
                        "start": 454.47,
                        "end": 454.75
                    },
                    {
                        "word": "that",
                        "start": 454.89,
                        "end": 455.031
                    },
                    {
                        "word": "their",
                        "start": 455.091,
                        "end": 455.291
                    },
                    {
                        "word": "stores",
                        "start": 455.331,
                        "end": 455.692
                    },
                    {
                        "word": "sell.",
                        "start": 455.792,
                        "end": 456.092
                    },
                    {
                        "word": "They",
                        "start": 457.033,
                        "end": 457.154
                    },
                    {
                        "word": "not",
                        "start": 457.194,
                        "end": 457.314
                    },
                    {
                        "word": "only",
                        "start": 457.394,
                        "end": 457.554
                    },
                    {
                        "word": "have",
                        "start": 457.594,
                        "end": 457.775
                    },
                    {
                        "word": "to",
                        "start": 457.815,
                        "end": 457.895
                    },
                    {
                        "word": "know",
                        "start": 457.975,
                        "end": 458.135
                    },
                    {
                        "word": "what",
                        "start": 458.155,
                        "end": 458.355
                    },
                    {
                        "word": "is",
                        "start": 458.436,
                        "end": 458.496
                    },
                    {
                        "word": "fashionable",
                        "start": 458.516,
                        "end": 459.217
                    },
                    {
                        "word": "at",
                        "start": 459.237,
                        "end": 459.617
                    },
                    {
                        "word": "the",
                        "start": 459.657,
                        "end": 459.777
                    },
                    {
                        "word": "moment,",
                        "start": 459.838,
                        "end": 460.118
                    },
                    {
                        "word": "but",
                        "start": 460.418,
                        "end": 460.519
                    },
                    {
                        "word": "also",
                        "start": 460.559,
                        "end": 460.839
                    },
                    {
                        "word": "have",
                        "start": 460.879,
                        "end": 461.099
                    },
                    {
                        "word": "to",
                        "start": 461.159,
                        "end": 461.26
                    },
                    {
                        "word": "guess",
                        "start": 461.42,
                        "end": 461.76
                    },
                    {
                        "word": "what",
                        "start": 462.201,
                        "end": 462.341
                    },
                    {
                        "word": "will",
                        "start": 462.381,
                        "end": 462.541
                    },
                    {
                        "word": "become",
                        "start": 462.582,
                        "end": 462.882
                    },
                    {
                        "word": "fashionable",
                        "start": 462.902,
                        "end": 463.543
                    },
                    {
                        "word": "next",
                        "start": 463.583,
                        "end": 463.964
                    },
                    {
                        "word": "season",
                        "start": 464.044,
                        "end": 464.444
                    },
                    {
                        "word": "or",
                        "start": 464.725,
                        "end": 464.825
                    },
                    {
                        "word": "next",
                        "start": 464.865,
                        "end": 465.165
                    },
                    {
                        "word": "year.",
                        "start": 465.225,
                        "end": 465.666
                    },
                    {
                        "word": "Most",
                        "start": 466.507,
                        "end": 466.847
                    },
                    {
                        "word": "buyers",
                        "start": 466.928,
                        "end": 467.248
                    },
                    {
                        "word": "work",
                        "start": 467.348,
                        "end": 467.668
                    },
                    {
                        "word": "for",
                        "start": 467.708,
                        "end": 467.849
                    },
                    {
                        "word": "just",
                        "start": 467.909,
                        "end": 468.129
                    },
                    {
                        "word": "one",
                        "start": 468.369,
                        "end": 468.489
                    },
                    {
                        "word": "department",
                        "start": 468.549,
                        "end": 469.13
                    },
                    {
                        "word": "in",
                        "start": 469.17,
                        "end": 469.431
                    },
                    {
                        "word": "a",
                        "start": 469.491,
                        "end": 469.531
                    },
                    {
                        "word": "store,",
                        "start": 469.611,
                        "end": 469.931
                    },
                    {
                        "word": "but",
                        "start": 470.532,
                        "end": 470.632
                    }
                ]
            },
            {
                "text": "the goods that Karen finds may be displayed and sold in several different sections of the store. Her job involves buying handicrafts from all over the world. Last year, she made a trip to Morocco and returned with rugs, pots, dishes and pans. The year before, she visited Mexico, and bought back handmade table cloths, mirrors with frames of tin, and paper flowers. The paper flowers are bright and colorful, so they were used to decorate the whole store. This year Karen is travelling in Malaysia, Thailand and Indonesia. Many of the countries that Karen visits have government offices that promote handicrafts. The officials are glad to cooperate with her by showing her the products that are available. Karen especially likes to visit markets in small towns and villages whenever she can arrange for it. She is always looking for interesting and unusual items. Karen thinks she has the best job she could have found. She loves all the travelling that she has to do, because she often visits markets and small out-of-the-way places. She sees much more of the country she visits than an ordinary tourist would. As soon as she gets back to New York from one trip, Karen begins to plan another.",
                "start": 470.652,
                "end": 556.458,
                "words": [
                    {
                        "word": "the",
                        "start": 470.652,
                        "end": 470.752
                    },
                    {
                        "word": "goods",
                        "start": 470.812,
                        "end": 471.033
                    },
                    {
                        "word": "that",
                        "start": 471.113,
                        "end": 471.233
                    },
                    {
                        "word": "Karen",
                        "start": 471.293,
                        "end": 471.793
                    },
                    {
                        "word": "finds",
                        "start": 471.874,
                        "end": 472.194
                    },
                    {
                        "word": "may",
                        "start": 472.654,
                        "end": 472.815
                    },
                    {
                        "word": "be",
                        "start": 472.855,
                        "end": 472.935
                    },
                    {
                        "word": "displayed",
                        "start": 472.995,
                        "end": 473.536
                    },
                    {
                        "word": "and",
                        "start": 473.596,
                        "end": 473.676
                    },
                    {
                        "word": "sold",
                        "start": 473.816,
                        "end": 474.136
                    },
                    {
                        "word": "in",
                        "start": 474.216,
                        "end": 474.276
                    },
                    {
                        "word": "several",
                        "start": 474.457,
                        "end": 474.837
                    },
                    {
                        "word": "different",
                        "start": 474.917,
                        "end": 475.258
                    },
                    {
                        "word": "sections",
                        "start": 475.318,
                        "end": 475.738
                    },
                    {
                        "word": "of",
                        "start": 475.818,
                        "end": 475.878
                    },
                    {
                        "word": "the",
                        "start": 475.918,
                        "end": 475.999
                    },
                    {
                        "word": "store.",
                        "start": 476.059,
                        "end": 476.379
                    },
                    {
                        "word": "Her",
                        "start": 477.44,
                        "end": 477.56
                    },
                    {
                        "word": "job",
                        "start": 477.621,
                        "end": 477.841
                    },
                    {
                        "word": "involves",
                        "start": 477.901,
                        "end": 478.421
                    },
                    {
                        "word": "buying",
                        "start": 478.602,
                        "end": 478.862
                    },
                    {
                        "word": "handicrafts",
                        "start": 478.942,
                        "end": 479.583
                    },
                    {
                        "word": "from",
                        "start": 479.623,
                        "end": 479.763
                    },
                    {
                        "word": "all",
                        "start": 480.084,
                        "end": 480.244
                    },
                    {
                        "word": "over",
                        "start": 480.444,
                        "end": 480.644
                    },
                    {
                        "word": "the",
                        "start": 480.724,
                        "end": 480.804
                    },
                    {
                        "word": "world.",
                        "start": 480.864,
                        "end": 481.185
                    },
                    {
                        "word": "Last",
                        "start": 482.366,
                        "end": 482.627
                    },
                    {
                        "word": "year",
                        "start": 482.667,
                        "end": 482.847
                    },
                    {
                        "word": "she",
                        "start": 483.267,
                        "end": 483.367
                    },
                    {
                        "word": "made",
                        "start": 483.408,
                        "end": 483.548
                    },
                    {
                        "word": "a",
                        "start": 483.608,
                        "end": 483.628
                    },
                    {
                        "word": "trip",
                        "start": 483.708,
                        "end": 483.968
                    },
                    {
                        "word": "to",
                        "start": 484.048,
                        "end": 484.148
                    },
                    {
                        "word": "Morocco",
                        "start": 484.209,
                        "end": 484.729
                    },
                    {
                        "word": "and",
                        "start": 485.21,
                        "end": 485.31
                    },
                    {
                        "word": "returned",
                        "start": 485.33,
                        "end": 485.71
                    },
                    {
                        "word": "with",
                        "start": 485.75,
                        "end": 485.871
                    },
                    {
                        "word": "rugs,",
                        "start": 485.971,
                        "end": 486.291
                    },
                    {
                        "word": "pots,",
                        "start": 486.631,
                        "end": 486.992
                    },
                    {
                        "word": "dishes",
                        "start": 487.372,
                        "end": 487.733
                    },
                    {
                        "word": "and",
                        "start": 487.813,
                        "end": 487.913
                    },
                    {
                        "word": "pans.",
                        "start": 488.033,
                        "end": 488.734
                    },
                    {
                        "word": "The",
                        "start": 489.271,
                        "end": 489.391
                    },
                    {
                        "word": "year",
                        "start": 489.431,
                        "end": 489.592
                    },
                    {
                        "word": "before,",
                        "start": 489.632,
                        "end": 490.013
                    },
                    {
                        "word": "she",
                        "start": 490.133,
                        "end": 490.273
                    },
                    {
                        "word": "visited",
                        "start": 490.333,
                        "end": 490.694
                    },
                    {
                        "word": "Mexico",
                        "start": 490.734,
                        "end": 491.315
                    },
                    {
                        "word": "and",
                        "start": 491.356,
                        "end": 491.937
                    },
                    {
                        "word": "bought",
                        "start": 491.977,
                        "end": 492.197
                    },
                    {
                        "word": "back",
                        "start": 492.238,
                        "end": 492.398
                    },
                    {
                        "word": "handmade",
                        "start": 492.418,
                        "end": 493.099
                    },
                    {
                        "word": "tablecloths,",
                        "start": 493.22,
                        "end": 493.981
                    },
                    {
                        "word": "mirrors",
                        "start": 494.523,
                        "end": 494.863
                    },
                    {
                        "word": "with",
                        "start": 494.963,
                        "end": 495.104
                    },
                    {
                        "word": "frames",
                        "start": 495.264,
                        "end": 495.565
                    },
                    {
                        "word": "of",
                        "start": 495.625,
                        "end": 495.665
                    },
                    {
                        "word": "tin",
                        "start": 495.785,
                        "end": 496.066
                    },
                    {
                        "word": "and",
                        "start": 496.547,
                        "end": 496.627
                    },
                    {
                        "word": "paper",
                        "start": 496.707,
                        "end": 496.968
                    },
                    {
                        "word": "flowers.",
                        "start": 497.008,
                        "end": 497.409
                    },
                    {
                        "word": "The",
                        "start": 498.692,
                        "end": 498.772
                    },
                    {
                        "word": "paper",
                        "start": 498.812,
                        "end": 499.032
                    },
                    {
                        "word": "flowers",
                        "start": 499.093,
                        "end": 499.453
                    },
                    {
                        "word": "are",
                        "start": 499.554,
                        "end": 499.634
                    },
                    {
                        "word": "bright",
                        "start": 499.694,
                        "end": 500.015
                    },
                    {
                        "word": "and",
                        "start": 500.095,
                        "end": 500.175
                    },
                    {
                        "word": "colourful,",
                        "start": 500.275,
                        "end": 500.736
                    },
                    {
                        "word": "so",
                        "start": 501.358,
                        "end": 501.478
                    },
                    {
                        "word": "they",
                        "start": 501.498,
                        "end": 501.618
                    },
                    {
                        "word": "were",
                        "start": 501.658,
                        "end": 501.778
                    },
                    {
                        "word": "used",
                        "start": 501.979,
                        "end": 502.159
                    },
                    {
                        "word": "to",
                        "start": 502.219,
                        "end": 502.3
                    },
                    {
                        "word": "decorate",
                        "start": 502.38,
                        "end": 502.861
                    },
                    {
                        "word": "the",
                        "start": 502.941,
                        "end": 503.041
                    },
                    {
                        "word": "whole",
                        "start": 503.121,
                        "end": 503.402
                    },
                    {
                        "word": "store.",
                        "start": 503.502,
                        "end": 503.863
                    },
                    {
                        "word": "This",
                        "start": 504.885,
                        "end": 505.086
                    },
                    {
                        "word": "year,",
                        "start": 505.126,
                        "end": 505.366
                    },
                    {
                        "word": "Karen",
                        "start": 505.587,
                        "end": 505.968
                    },
                    {
                        "word": "is",
                        "start": 506.008,
                        "end": 506.088
                    },
                    {
                        "word": "travelling",
                        "start": 506.148,
                        "end": 506.529
                    },
                    {
                        "word": "in",
                        "start": 506.689,
                        "end": 506.769
                    },
                    {
                        "word": "Malaysia,",
                        "start": 506.83,
                        "end": 507.391
                    },
                    {
                        "word": "Thailand",
                        "start": 507.591,
                        "end": 508.072
                    },
                    {
                        "word": "and",
                        "start": 508.132,
                        "end": 508.213
                    },
                    {
                        "word": "Indonesia.",
                        "start": 508.353,
                        "end": 509.355
                    },
                    {
                        "word": "Many",
                        "start": 509.858,
                        "end": 510.098
                    },
                    {
                        "word": "of",
                        "start": 510.138,
                        "end": 510.178
                    },
                    {
                        "word": "the",
                        "start": 510.218,
                        "end": 510.299
                    },
                    {
                        "word": "countries",
                        "start": 510.399,
                        "end": 510.859
                    },
                    {
                        "word": "that",
                        "start": 510.899,
                        "end": 511.04
                    },
                    {
                        "word": "Karen",
                        "start": 511.12,
                        "end": 511.5
                    },
                    {
                        "word": "visits",
                        "start": 511.54,
                        "end": 511.881
                    },
                    {
                        "word": "have",
                        "start": 512.181,
                        "end": 512.321
                    },
                    {
                        "word": "government",
                        "start": 512.361,
                        "end": 512.882
                    },
                    {
                        "word": "offices",
                        "start": 513.062,
                        "end": 513.523
                    },
                    {
                        "word": "that",
                        "start": 513.603,
                        "end": 513.743
                    },
                    {
                        "word": "promote",
                        "start": 513.823,
                        "end": 514.204
                    },
                    {
                        "word": "handicrafts.",
                        "start": 514.244,
                        "end": 515.005
                    },
                    {
                        "word": "The",
                        "start": 515.726,
                        "end": 515.846
                    },
                    {
                        "word": "officials",
                        "start": 515.966,
                        "end": 516.507
                    },
                    {
                        "word": "are",
                        "start": 516.707,
                        "end": 516.787
                    },
                    {
                        "word": "glad",
                        "start": 516.867,
                        "end": 517.248
                    },
                    {
                        "word": "to",
                        "start": 517.308,
                        "end": 517.408
                    },
                    {
                        "word": "cooperate",
                        "start": 517.468,
                        "end": 518.029
                    },
                    {
                        "word": "with",
                        "start": 518.089,
                        "end": 518.249
                    },
                    {
                        "word": "her",
                        "start": 518.329,
                        "end": 518.469
                    },
                    {
                        "word": "by",
                        "start": 518.95,
                        "end": 519.07
                    },
                    {
                        "word": "showing",
                        "start": 519.17,
                        "end": 519.451
                    },
                    {
                        "word": "her",
                        "start": 519.511,
                        "end": 519.611
                    },
                    {
                        "word": "the",
                        "start": 519.631,
                        "end": 519.731
                    },
                    {
                        "word": "products",
                        "start": 519.811,
                        "end": 520.212
                    },
                    {
                        "word": "that",
                        "start": 520.312,
                        "end": 520.452
                    },
                    {
                        "word": "are",
                        "start": 520.532,
                        "end": 520.612
                    },
                    {
                        "word": "available.",
                        "start": 520.652,
                        "end": 521.193
                    },
                    {
                        "word": "Karen",
                        "start": 522.194,
                        "end": 522.455
                    },
                    {
                        "word": "especially",
                        "start": 522.495,
                        "end": 523.055
                    },
                    {
                        "word": "likes",
                        "start": 523.156,
                        "end": 523.376
                    },
                    {
                        "word": "to",
                        "start": 523.436,
                        "end": 523.536
                    },
                    {
                        "word": "visit",
                        "start": 523.576,
                        "end": 523.837
                    },
                    {
                        "word": "markets",
                        "start": 523.937,
                        "end": 524.437
                    },
                    {
                        "word": "in",
                        "start": 524.557,
                        "end": 524.638
                    },
                    {
                        "word": "small",
                        "start": 524.678,
                        "end": 525.138
                    },
                    {
                        "word": "towns",
                        "start": 525.218,
                        "end": 525.579
                    },
                    {
                        "word": "and",
                        "start": 525.659,
                        "end": 525.739
                    },
                    {
                        "word": "villages",
                        "start": 525.859,
                        "end": 526.3
                    },
                    {
                        "word": "whenever",
                        "start": 526.901,
                        "end": 527.261
                    },
                    {
                        "word": "she",
                        "start": 527.341,
                        "end": 527.481
                    },
                    {
                        "word": "can",
                        "start": 527.541,
                        "end": 527.662
                    },
                    {
                        "word": "arrange",
                        "start": 527.742,
                        "end": 528.082
                    },
                    {
                        "word": "for",
                        "start": 528.162,
                        "end": 528.282
                    },
                    {
                        "word": "it.",
                        "start": 528.363,
                        "end": 528.443
                    },
                    {
                        "word": "She",
                        "start": 529.204,
                        "end": 529.304
                    },
                    {
                        "word": "is",
                        "start": 529.344,
                        "end": 529.404
                    },
                    {
                        "word": "always",
                        "start": 529.464,
                        "end": 529.664
                    },
                    {
                        "word": "looking",
                        "start": 529.704,
                        "end": 530.065
                    },
                    {
                        "word": "for",
                        "start": 530.125,
                        "end": 530.225
                    },
                    {
                        "word": "interesting",
                        "start": 530.365,
                        "end": 530.886
                    },
                    {
                        "word": "and",
                        "start": 531.006,
                        "end": 531.086
                    },
                    {
                        "word": "unusual",
                        "start": 531.326,
                        "end": 531.907
                    },
                    {
                        "word": "items.",
                        "start": 532.067,
                        "end": 532.508
                    },
                    {
                        "word": "Karen",
                        "start": 533.348,
                        "end": 533.668
                    },
                    {
                        "word": "thinks",
                        "start": 533.728,
                        "end": 533.969
                    },
                    {
                        "word": "she",
                        "start": 533.989,
                        "end": 534.409
                    },
                    {
                        "word": "has",
                        "start": 534.469,
                        "end": 534.59
                    },
                    {
                        "word": "the",
                        "start": 534.65,
                        "end": 534.73
                    },
                    {
                        "word": "best",
                        "start": 534.87,
                        "end": 535.15
                    },
                    {
                        "word": "job",
                        "start": 535.27,
                        "end": 535.571
                    },
                    {
                        "word": "she",
                        "start": 535.691,
                        "end": 535.831
                    },
                    {
                        "word": "could",
                        "start": 535.891,
                        "end": 536.051
                    },
                    {
                        "word": "have",
                        "start": 536.092,
                        "end": 536.192
                    },
                    {
                        "word": "found.",
                        "start": 536.272,
                        "end": 536.592
                    },
                    {
                        "word": "She",
                        "start": 537.253,
                        "end": 537.393
                    },
                    {
                        "word": "loves",
                        "start": 537.573,
                        "end": 537.894
                    },
                    {
                        "word": "all",
                        "start": 537.934,
                        "end": 538.374
                    },
                    {
                        "word": "the",
                        "start": 538.414,
                        "end": 538.535
                    },
                    {
                        "word": "traveling",
                        "start": 538.595,
                        "end": 539.055
                    },
                    {
                        "word": "that",
                        "start": 539.376,
                        "end": 539.516
                    },
                    {
                        "word": "she",
                        "start": 539.556,
                        "end": 539.656
                    },
                    {
                        "word": "has",
                        "start": 539.736,
                        "end": 539.956
                    },
                    {
                        "word": "to",
                        "start": 540.017,
                        "end": 540.117
                    },
                    {
                        "word": "do",
                        "start": 540.157,
                        "end": 540.337
                    },
                    {
                        "word": "because",
                        "start": 540.377,
                        "end": 541.338
                    },
                    {
                        "word": "she",
                        "start": 541.378,
                        "end": 541.478
                    },
                    {
                        "word": "often",
                        "start": 541.579,
                        "end": 541.819
                    },
                    {
                        "word": "visits",
                        "start": 541.899,
                        "end": 542.219
                    },
                    {
                        "word": "markets",
                        "start": 542.34,
                        "end": 542.8
                    },
                    {
                        "word": "in",
                        "start": 542.9,
                        "end": 542.98
                    },
                    {
                        "word": "small,",
                        "start": 543.121,
                        "end": 543.481
                    },
                    {
                        "word": "out-of-the-way",
                        "start": 543.922,
                        "end": 544.542
                    },
                    {
                        "word": "places.",
                        "start": 544.622,
                        "end": 545.083
                    },
                    {
                        "word": "She",
                        "start": 545.924,
                        "end": 546.024
                    },
                    {
                        "word": "sees",
                        "start": 546.064,
                        "end": 546.265
                    },
                    {
                        "word": "much",
                        "start": 546.385,
                        "end": 546.605
                    },
                    {
                        "word": "more",
                        "start": 546.745,
                        "end": 546.965
                    },
                    {
                        "word": "of",
                        "start": 547.026,
                        "end": 547.066
                    },
                    {
                        "word": "the",
                        "start": 547.086,
                        "end": 547.206
                    },
                    {
                        "word": "countries",
                        "start": 547.306,
                        "end": 547.726
                    },
                    {
                        "word": "she",
                        "start": 547.827,
                        "end": 547.967
                    },
                    {
                        "word": "visits",
                        "start": 548.067,
                        "end": 548.427
                    },
                    {
                        "word": "than",
                        "start": 548.788,
                        "end": 548.908
                    },
                    {
                        "word": "an",
                        "start": 548.948,
                        "end": 549.048
                    },
                    {
                        "word": "ordinary",
                        "start": 549.248,
                        "end": 549.649
                    },
                    {
                        "word": "tourist",
                        "start": 549.729,
                        "end": 550.109
                    },
                    {
                        "word": "would.",
                        "start": 550.19,
                        "end": 550.45
                    },
                    {
                        "word": "As",
                        "start": 551.331,
                        "end": 551.391
                    },
                    {
                        "word": "soon",
                        "start": 551.431,
                        "end": 551.611
                    },
                    {
                        "word": "as",
                        "start": 551.631,
                        "end": 551.692
                    },
                    {
                        "word": "she",
                        "start": 551.732,
                        "end": 551.832
                    },
                    {
                        "word": "gets",
                        "start": 551.912,
                        "end": 552.112
                    },
                    {
                        "word": "back",
                        "start": 552.252,
                        "end": 552.513
                    },
                    {
                        "word": "to",
                        "start": 552.593,
                        "end": 552.693
                    },
                    {
                        "word": "New",
                        "start": 552.753,
                        "end": 552.853
                    },
                    {
                        "word": "York",
                        "start": 552.893,
                        "end": 553.213
                    },
                    {
                        "word": "from",
                        "start": 553.294,
                        "end": 553.434
                    },
                    {
                        "word": "one",
                        "start": 553.614,
                        "end": 553.734
                    },
                    {
                        "word": "trip,",
                        "start": 553.834,
                        "end": 554.155
                    },
                    {
                        "word": "Karen",
                        "start": 554.595,
                        "end": 554.956
                    },
                    {
                        "word": "begins",
                        "start": 554.996,
                        "end": 555.476
                    },
                    {
                        "word": "to",
                        "start": 555.516,
                        "end": 555.717
                    },
                    {
                        "word": "plan",
                        "start": 555.777,
                        "end": 556.037
                    },
                    {
                        "word": "another.",
                        "start": 556.117,
                        "end": 556.458
                    }
                ]
            }
        ]
    },
    {
        "id": "passage_2",
        "title": "Passage Two",
        "audio_source": "2015.06_cet6_1.mp3",
        "full_audio_range": {
            "start": 621.807,
            "end": 713.564
        },
        "sentences": [
            {
                "text": "Mark felt that it was time for him to take part in his community, so he went to the neighborhood meeting after work. The area city council woman was leading a discussion about how the quality of life was on the decline. The neighborhood faced many problems. Mark looked at the charts taped to the walls. There were charts for parking problems, crime, and for problems in vacant buildings. Mark read from the charts, \"Police patrols cut back, illegal parking up 20% .\" People were supposed to suggest solutions to the council woman. It was",
                "start": 621.807,
                "end": 657.076,
                "words": [
                    {
                        "word": "Mark",
                        "start": 621.807,
                        "end": 622.187
                    },
                    {
                        "word": "felt",
                        "start": 622.288,
                        "end": 622.508
                    },
                    {
                        "word": "that",
                        "start": 622.568,
                        "end": 622.708
                    },
                    {
                        "word": "it",
                        "start": 622.748,
                        "end": 622.788
                    },
                    {
                        "word": "was",
                        "start": 622.828,
                        "end": 622.928
                    },
                    {
                        "word": "time",
                        "start": 623.008,
                        "end": 623.249
                    },
                    {
                        "word": "for",
                        "start": 623.309,
                        "end": 623.429
                    },
                    {
                        "word": "him",
                        "start": 623.469,
                        "end": 623.629
                    },
                    {
                        "word": "to",
                        "start": 623.709,
                        "end": 623.789
                    },
                    {
                        "word": "take",
                        "start": 623.849,
                        "end": 624.049
                    },
                    {
                        "word": "part",
                        "start": 624.13,
                        "end": 624.39
                    },
                    {
                        "word": "in",
                        "start": 624.49,
                        "end": 624.55
                    },
                    {
                        "word": "his",
                        "start": 624.61,
                        "end": 624.71
                    },
                    {
                        "word": "community,",
                        "start": 624.77,
                        "end": 625.331
                    },
                    {
                        "word": "so",
                        "start": 625.992,
                        "end": 626.112
                    },
                    {
                        "word": "he",
                        "start": 626.172,
                        "end": 626.252
                    },
                    {
                        "word": "went",
                        "start": 626.312,
                        "end": 626.452
                    },
                    {
                        "word": "to",
                        "start": 626.472,
                        "end": 626.592
                    },
                    {
                        "word": "the",
                        "start": 626.652,
                        "end": 626.732
                    },
                    {
                        "word": "neighborhood",
                        "start": 626.793,
                        "end": 627.233
                    },
                    {
                        "word": "meeting",
                        "start": 627.293,
                        "end": 627.533
                    },
                    {
                        "word": "after",
                        "start": 627.633,
                        "end": 627.854
                    },
                    {
                        "word": "work.",
                        "start": 627.934,
                        "end": 629.015
                    },
                    {
                        "word": "The",
                        "start": 629.035,
                        "end": 629.135
                    },
                    {
                        "word": "area's",
                        "start": 629.255,
                        "end": 629.576
                    },
                    {
                        "word": "city",
                        "start": 629.636,
                        "end": 629.876
                    },
                    {
                        "word": "councilwoman",
                        "start": 629.956,
                        "end": 630.657
                    },
                    {
                        "word": "was",
                        "start": 630.757,
                        "end": 630.877
                    },
                    {
                        "word": "leading",
                        "start": 630.957,
                        "end": 631.237
                    },
                    {
                        "word": "a",
                        "start": 631.298,
                        "end": 631.318
                    },
                    {
                        "word": "discussion",
                        "start": 631.378,
                        "end": 631.958
                    },
                    {
                        "word": "about",
                        "start": 631.998,
                        "end": 632.619
                    },
                    {
                        "word": "how",
                        "start": 632.679,
                        "end": 632.819
                    },
                    {
                        "word": "the",
                        "start": 632.859,
                        "end": 632.939
                    },
                    {
                        "word": "quality",
                        "start": 632.999,
                        "end": 633.46
                    },
                    {
                        "word": "of",
                        "start": 633.5,
                        "end": 633.54
                    },
                    {
                        "word": "life",
                        "start": 633.58,
                        "end": 633.88
                    },
                    {
                        "word": "was",
                        "start": 633.981,
                        "end": 634.101
                    },
                    {
                        "word": "on",
                        "start": 634.181,
                        "end": 634.241
                    },
                    {
                        "word": "the",
                        "start": 634.281,
                        "end": 634.341
                    },
                    {
                        "word": "decline.",
                        "start": 634.401,
                        "end": 634.902
                    },
                    {
                        "word": "The",
                        "start": 635.502,
                        "end": 635.582
                    },
                    {
                        "word": "neighborhood",
                        "start": 635.622,
                        "end": 636.023
                    },
                    {
                        "word": "faced",
                        "start": 636.103,
                        "end": 636.363
                    },
                    {
                        "word": "many",
                        "start": 636.443,
                        "end": 636.664
                    },
                    {
                        "word": "problems.",
                        "start": 636.744,
                        "end": 637.264
                    },
                    {
                        "word": "Mark",
                        "start": 638.045,
                        "end": 638.245
                    },
                    {
                        "word": "looked",
                        "start": 638.285,
                        "end": 638.486
                    },
                    {
                        "word": "at",
                        "start": 638.526,
                        "end": 638.566
                    },
                    {
                        "word": "the",
                        "start": 638.586,
                        "end": 638.686
                    },
                    {
                        "word": "charts",
                        "start": 638.746,
                        "end": 639.046
                    },
                    {
                        "word": "taped",
                        "start": 639.126,
                        "end": 639.367
                    },
                    {
                        "word": "to",
                        "start": 639.387,
                        "end": 639.447
                    },
                    {
                        "word": "the",
                        "start": 639.507,
                        "end": 639.567
                    },
                    {
                        "word": "walls.",
                        "start": 639.607,
                        "end": 639.927
                    },
                    {
                        "word": "There",
                        "start": 640.648,
                        "end": 640.788
                    },
                    {
                        "word": "were",
                        "start": 640.808,
                        "end": 640.928
                    },
                    {
                        "word": "charts",
                        "start": 640.988,
                        "end": 641.329
                    },
                    {
                        "word": "for",
                        "start": 641.429,
                        "end": 641.549
                    },
                    {
                        "word": "parking",
                        "start": 641.589,
                        "end": 641.949
                    },
                    {
                        "word": "problems,",
                        "start": 641.989,
                        "end": 642.49
                    },
                    {
                        "word": "crime,",
                        "start": 642.83,
                        "end": 643.271
                    },
                    {
                        "word": "and",
                        "start": 643.671,
                        "end": 643.731
                    },
                    {
                        "word": "for",
                        "start": 643.791,
                        "end": 643.892
                    },
                    {
                        "word": "problems",
                        "start": 643.952,
                        "end": 644.412
                    },
                    {
                        "word": "in",
                        "start": 644.472,
                        "end": 644.552
                    },
                    {
                        "word": "vacant",
                        "start": 644.612,
                        "end": 644.913
                    },
                    {
                        "word": "buildings.",
                        "start": 644.953,
                        "end": 645.413
                    },
                    {
                        "word": "Mark",
                        "start": 646.254,
                        "end": 646.474
                    },
                    {
                        "word": "read",
                        "start": 646.554,
                        "end": 646.715
                    },
                    {
                        "word": "from",
                        "start": 646.775,
                        "end": 646.915
                    },
                    {
                        "word": "the",
                        "start": 646.935,
                        "end": 647.015
                    },
                    {
                        "word": "charts.",
                        "start": 647.055,
                        "end": 647.435
                    },
                    {
                        "word": "Police",
                        "start": 648.056,
                        "end": 648.437
                    },
                    {
                        "word": "patrols",
                        "start": 648.497,
                        "end": 648.917
                    },
                    {
                        "word": "cut",
                        "start": 649.017,
                        "end": 649.237
                    },
                    {
                        "word": "back.",
                        "start": 649.257,
                        "end": 649.738
                    },
                    {
                        "word": "Illegal",
                        "start": 650.005,
                        "end": 650.566
                    },
                    {
                        "word": "parking",
                        "start": 650.626,
                        "end": 650.967
                    },
                    {
                        "word": "up",
                        "start": 651.067,
                        "end": 651.167
                    },
                    {
                        "word": "twenty",
                        "start": 651.227,
                        "end": 651.487
                    },
                    {
                        "word": "per",
                        "start": 651.547,
                        "end": 651.668
                    },
                    {
                        "word": "cent.",
                        "start": 651.688,
                        "end": 651.948
                    },
                    {
                        "word": "People",
                        "start": 652.749,
                        "end": 652.99
                    },
                    {
                        "word": "were",
                        "start": 653.03,
                        "end": 653.17
                    },
                    {
                        "word": "supposed",
                        "start": 653.21,
                        "end": 653.51
                    },
                    {
                        "word": "to",
                        "start": 653.551,
                        "end": 653.631
                    },
                    {
                        "word": "suggest",
                        "start": 653.691,
                        "end": 654.031
                    },
                    {
                        "word": "solutions",
                        "start": 654.051,
                        "end": 654.592
                    },
                    {
                        "word": "to",
                        "start": 654.652,
                        "end": 654.752
                    },
                    {
                        "word": "the",
                        "start": 654.792,
                        "end": 654.853
                    },
                    {
                        "word": "Councilwoman.",
                        "start": 654.893,
                        "end": 655.594
                    },
                    {
                        "word": "It",
                        "start": 656.335,
                        "end": 656.395
                    },
                    {
                        "word": "was",
                        "start": 656.435,
                        "end": 656.535
                    },
                    {
                        "word": "too",
                        "start": 656.876,
                        "end": 657.076
                    }
                ]
            },
            {
                "text": "too much for Mark. \"The problems are too big,\" he thought. He turned to the man next to him and said, \"I think this is a waste of my time. Nothing I could do would make a difference here.\"",
                "start": 656.876,
                "end": 667.913,
                "words": [
                    {
                        "word": "too",
                        "start": 656.876,
                        "end": 657.076
                    },
                    {
                        "word": "much",
                        "start": 657.116,
                        "end": 657.357
                    },
                    {
                        "word": "for",
                        "start": 657.457,
                        "end": 657.577
                    },
                    {
                        "word": "Mark.",
                        "start": 657.617,
                        "end": 657.897
                    },
                    {
                        "word": "The",
                        "start": 658.558,
                        "end": 658.639
                    },
                    {
                        "word": "problems",
                        "start": 658.699,
                        "end": 659.039
                    },
                    {
                        "word": "are",
                        "start": 659.099,
                        "end": 659.179
                    },
                    {
                        "word": "too",
                        "start": 659.219,
                        "end": 659.46
                    },
                    {
                        "word": "big,",
                        "start": 659.52,
                        "end": 659.8
                    },
                    {
                        "word": "he",
                        "start": 660.041,
                        "end": 660.121
                    },
                    {
                        "word": "thought.",
                        "start": 660.161,
                        "end": 660.461
                    },
                    {
                        "word": "He",
                        "start": 661.343,
                        "end": 661.443
                    },
                    {
                        "word": "turned",
                        "start": 661.503,
                        "end": 661.703
                    },
                    {
                        "word": "to",
                        "start": 661.723,
                        "end": 661.783
                    },
                    {
                        "word": "the",
                        "start": 661.844,
                        "end": 661.904
                    },
                    {
                        "word": "man",
                        "start": 661.944,
                        "end": 662.104
                    },
                    {
                        "word": "next",
                        "start": 662.164,
                        "end": 662.364
                    },
                    {
                        "word": "to",
                        "start": 662.384,
                        "end": 662.465
                    },
                    {
                        "word": "him",
                        "start": 662.505,
                        "end": 662.605
                    },
                    {
                        "word": "and",
                        "start": 662.665,
                        "end": 662.745
                    },
                    {
                        "word": "said,",
                        "start": 662.805,
                        "end": 663.065
                    },
                    {
                        "word": "I",
                        "start": 663.085,
                        "end": 663.526
                    },
                    {
                        "word": "think",
                        "start": 663.586,
                        "end": 663.726
                    },
                    {
                        "word": "this",
                        "start": 663.747,
                        "end": 663.887
                    },
                    {
                        "word": "is",
                        "start": 663.947,
                        "end": 664.007
                    },
                    {
                        "word": "a",
                        "start": 664.047,
                        "end": 664.067
                    },
                    {
                        "word": "waste",
                        "start": 664.127,
                        "end": 664.347
                    },
                    {
                        "word": "of",
                        "start": 664.388,
                        "end": 664.428
                    },
                    {
                        "word": "my",
                        "start": 664.488,
                        "end": 664.608
                    },
                    {
                        "word": "time.",
                        "start": 664.668,
                        "end": 664.948
                    },
                    {
                        "word": "Nothing",
                        "start": 665.529,
                        "end": 665.81
                    },
                    {
                        "word": "I",
                        "start": 665.89,
                        "end": 665.95
                    },
                    {
                        "word": "could",
                        "start": 665.99,
                        "end": 666.13
                    },
                    {
                        "word": "do",
                        "start": 666.17,
                        "end": 666.27
                    },
                    {
                        "word": "would",
                        "start": 666.311,
                        "end": 666.451
                    },
                    {
                        "word": "make",
                        "start": 666.471,
                        "end": 666.611
                    },
                    {
                        "word": "a",
                        "start": 666.651,
                        "end": 666.691
                    },
                    {
                        "word": "difference",
                        "start": 666.751,
                        "end": 667.072
                    },
                    {
                        "word": "here.",
                        "start": 667.132,
                        "end": 667.913
                    },
                    {
                        "word": "As",
                        "start": 667.893,
                        "end": 668.514
                    }
                ]
            },
            {
                "text": "As he neared the bus stop on his way home, Mark saw a woman carrying a grocery bag and a baby. As Mark got closer, her other child, a little boy, suddenly darted into the street. The woman tried to reach for him, but as she moved, her bag shifted, and groceries started to fall out. Mark ran to take the boy's arm and led him back to his mother. \"You gotta stay with mom,\" he said. Then he picked up the stray groceries while the woman smiled in relief. \"Thanks,\" she said, \"You've got great timing.\" \"Just being neighborly,\" Mark said. As he rode home, he glanced at the poster near his seat in the bus: Small acts of kindness add up. Mark smiled and thought, \"Maybe that's a good place to start.\"",
                "start": 667.893,
                "end": 713.564,
                "words": [
                    {
                        "word": "here.",
                        "start": 667.132,
                        "end": 667.913
                    },
                    {
                        "word": "As",
                        "start": 667.893,
                        "end": 668.514
                    },
                    {
                        "word": "he",
                        "start": 668.554,
                        "end": 668.654
                    },
                    {
                        "word": "neared",
                        "start": 668.754,
                        "end": 668.974
                    },
                    {
                        "word": "the",
                        "start": 669.014,
                        "end": 669.074
                    },
                    {
                        "word": "bus",
                        "start": 669.134,
                        "end": 669.294
                    },
                    {
                        "word": "stop",
                        "start": 669.314,
                        "end": 669.575
                    },
                    {
                        "word": "on",
                        "start": 669.655,
                        "end": 669.695
                    },
                    {
                        "word": "his",
                        "start": 669.735,
                        "end": 669.835
                    },
                    {
                        "word": "way",
                        "start": 669.895,
                        "end": 670.015
                    },
                    {
                        "word": "home,",
                        "start": 670.075,
                        "end": 670.315
                    },
                    {
                        "word": "Mark",
                        "start": 670.956,
                        "end": 671.156
                    },
                    {
                        "word": "saw",
                        "start": 671.196,
                        "end": 671.356
                    },
                    {
                        "word": "a",
                        "start": 671.396,
                        "end": 671.416
                    },
                    {
                        "word": "woman",
                        "start": 671.476,
                        "end": 671.737
                    },
                    {
                        "word": "carrying",
                        "start": 671.797,
                        "end": 672.117
                    },
                    {
                        "word": "a",
                        "start": 672.177,
                        "end": 672.197
                    },
                    {
                        "word": "grocery",
                        "start": 672.237,
                        "end": 672.717
                    },
                    {
                        "word": "bag",
                        "start": 672.758,
                        "end": 673.018
                    },
                    {
                        "word": "and",
                        "start": 673.038,
                        "end": 673.698
                    },
                    {
                        "word": "a",
                        "start": 673.778,
                        "end": 673.798
                    },
                    {
                        "word": "baby.",
                        "start": 673.839,
                        "end": 674.159
                    },
                    {
                        "word": "As",
                        "start": 674.92,
                        "end": 674.98
                    },
                    {
                        "word": "Mark",
                        "start": 675.06,
                        "end": 675.24
                    },
                    {
                        "word": "got",
                        "start": 675.28,
                        "end": 675.42
                    },
                    {
                        "word": "closer,",
                        "start": 675.46,
                        "end": 675.88
                    },
                    {
                        "word": "her",
                        "start": 676.281,
                        "end": 676.401
                    },
                    {
                        "word": "other",
                        "start": 676.461,
                        "end": 676.661
                    },
                    {
                        "word": "child,",
                        "start": 676.721,
                        "end": 677.082
                    },
                    {
                        "word": "a",
                        "start": 677.282,
                        "end": 677.302
                    },
                    {
                        "word": "little",
                        "start": 677.362,
                        "end": 677.582
                    },
                    {
                        "word": "boy,",
                        "start": 677.642,
                        "end": 677.922
                    },
                    {
                        "word": "suddenly",
                        "start": 678.503,
                        "end": 678.883
                    },
                    {
                        "word": "darted",
                        "start": 679.003,
                        "end": 679.324
                    },
                    {
                        "word": "into",
                        "start": 679.344,
                        "end": 679.604
                    },
                    {
                        "word": "the",
                        "start": 679.644,
                        "end": 679.724
                    },
                    {
                        "word": "street.",
                        "start": 679.764,
                        "end": 680.144
                    },
                    {
                        "word": "The",
                        "start": 680.925,
                        "end": 681.005
                    },
                    {
                        "word": "woman",
                        "start": 681.045,
                        "end": 681.285
                    },
                    {
                        "word": "tried",
                        "start": 681.325,
                        "end": 681.546
                    },
                    {
                        "word": "to",
                        "start": 681.566,
                        "end": 681.646
                    },
                    {
                        "word": "reach",
                        "start": 681.706,
                        "end": 681.886
                    },
                    {
                        "word": "for",
                        "start": 681.926,
                        "end": 682.046
                    },
                    {
                        "word": "him,",
                        "start": 682.086,
                        "end": 682.246
                    },
                    {
                        "word": "but",
                        "start": 682.587,
                        "end": 682.687
                    },
                    {
                        "word": "as",
                        "start": 682.767,
                        "end": 682.827
                    },
                    {
                        "word": "she",
                        "start": 682.907,
                        "end": 683.007
                    },
                    {
                        "word": "moved,",
                        "start": 683.067,
                        "end": 683.387
                    },
                    {
                        "word": "her",
                        "start": 683.808,
                        "end": 683.948
                    },
                    {
                        "word": "bag",
                        "start": 683.988,
                        "end": 684.248
                    },
                    {
                        "word": "shifted",
                        "start": 684.328,
                        "end": 684.729
                    },
                    {
                        "word": "and",
                        "start": 684.749,
                        "end": 685.109
                    },
                    {
                        "word": "groceries",
                        "start": 685.189,
                        "end": 685.629
                    },
                    {
                        "word": "started",
                        "start": 685.649,
                        "end": 685.91
                    },
                    {
                        "word": "to",
                        "start": 685.95,
                        "end": 686.03
                    },
                    {
                        "word": "fall",
                        "start": 686.07,
                        "end": 686.29
                    },
                    {
                        "word": "out.",
                        "start": 686.41,
                        "end": 686.51
                    },
                    {
                        "word": "Mark",
                        "start": 687.291,
                        "end": 687.491
                    },
                    {
                        "word": "ran",
                        "start": 687.531,
                        "end": 687.771
                    },
                    {
                        "word": "to",
                        "start": 687.791,
                        "end": 687.852
                    },
                    {
                        "word": "take",
                        "start": 687.912,
                        "end": 688.052
                    },
                    {
                        "word": "the",
                        "start": 688.072,
                        "end": 688.152
                    },
                    {
                        "word": "boy's",
                        "start": 688.192,
                        "end": 688.412
                    },
                    {
                        "word": "arm",
                        "start": 688.552,
                        "end": 688.672
                    },
                    {
                        "word": "and",
                        "start": 688.752,
                        "end": 688.812
                    },
                    {
                        "word": "led",
                        "start": 688.852,
                        "end": 688.993
                    },
                    {
                        "word": "him",
                        "start": 689.013,
                        "end": 689.113
                    },
                    {
                        "word": "back",
                        "start": 689.153,
                        "end": 689.333
                    },
                    {
                        "word": "to",
                        "start": 689.393,
                        "end": 689.473
                    },
                    {
                        "word": "his",
                        "start": 689.513,
                        "end": 689.613
                    },
                    {
                        "word": "mother.",
                        "start": 689.673,
                        "end": 689.933
                    },
                    {
                        "word": "You",
                        "start": 690.654,
                        "end": 690.774
                    },
                    {
                        "word": "gotta",
                        "start": 690.814,
                        "end": 691.014
                    },
                    {
                        "word": "stay",
                        "start": 691.054,
                        "end": 691.235
                    },
                    {
                        "word": "with",
                        "start": 691.275,
                        "end": 691.375
                    },
                    {
                        "word": "Mom,",
                        "start": 691.435,
                        "end": 691.755
                    },
                    {
                        "word": "he",
                        "start": 691.855,
                        "end": 691.955
                    },
                    {
                        "word": "said.",
                        "start": 692.015,
                        "end": 692.236
                    },
                    {
                        "word": "Then",
                        "start": 692.796,
                        "end": 692.896
                    },
                    {
                        "word": "he",
                        "start": 692.936,
                        "end": 692.996
                    },
                    {
                        "word": "picked",
                        "start": 693.056,
                        "end": 693.257
                    },
                    {
                        "word": "up",
                        "start": 693.317,
                        "end": 693.397
                    },
                    {
                        "word": "the",
                        "start": 693.457,
                        "end": 693.537
                    },
                    {
                        "word": "stray",
                        "start": 693.577,
                        "end": 693.837
                    },
                    {
                        "word": "groceries",
                        "start": 693.857,
                        "end": 694.338
                    },
                    {
                        "word": "while",
                        "start": 694.378,
                        "end": 694.518
                    },
                    {
                        "word": "the",
                        "start": 694.558,
                        "end": 694.618
                    },
                    {
                        "word": "woman",
                        "start": 694.658,
                        "end": 694.898
                    },
                    {
                        "word": "smiled",
                        "start": 694.958,
                        "end": 695.318
                    },
                    {
                        "word": "in",
                        "start": 695.358,
                        "end": 695.419
                    },
                    {
                        "word": "relief.",
                        "start": 695.459,
                        "end": 695.959
                    },
                    {
                        "word": "Thanks,\"",
                        "start": 696.648,
                        "end": 697.609
                    },
                    {
                        "word": "she",
                        "start": 697.629,
                        "end": 697.729
                    },
                    {
                        "word": "said.",
                        "start": 697.809,
                        "end": 698.029
                    },
                    {
                        "word": "You've",
                        "start": 698.81,
                        "end": 698.99
                    },
                    {
                        "word": "got",
                        "start": 699.03,
                        "end": 699.19
                    },
                    {
                        "word": "great",
                        "start": 699.25,
                        "end": 699.431
                    },
                    {
                        "word": "timing.",
                        "start": 699.491,
                        "end": 699.911
                    },
                    {
                        "word": "Just",
                        "start": 700.912,
                        "end": 701.092
                    },
                    {
                        "word": "being",
                        "start": 701.152,
                        "end": 701.393
                    },
                    {
                        "word": "neighborly,",
                        "start": 701.453,
                        "end": 701.933
                    },
                    {
                        "word": "Mark",
                        "start": 702.193,
                        "end": 702.414
                    },
                    {
                        "word": "said.",
                        "start": 702.454,
                        "end": 702.674
                    },
                    {
                        "word": "As",
                        "start": 703.455,
                        "end": 703.515
                    },
                    {
                        "word": "he",
                        "start": 703.555,
                        "end": 703.635
                    },
                    {
                        "word": "rode",
                        "start": 703.715,
                        "end": 703.895
                    },
                    {
                        "word": "home",
                        "start": 703.935,
                        "end": 704.155
                    },
                    {
                        "word": "he",
                        "start": 704.235,
                        "end": 704.315
                    },
                    {
                        "word": "glanced",
                        "start": 704.395,
                        "end": 704.716
                    },
                    {
                        "word": "at",
                        "start": 704.776,
                        "end": 704.816
                    },
                    {
                        "word": "the",
                        "start": 704.836,
                        "end": 704.916
                    },
                    {
                        "word": "poster",
                        "start": 704.976,
                        "end": 705.456
                    },
                    {
                        "word": "near",
                        "start": 705.777,
                        "end": 705.937
                    },
                    {
                        "word": "his",
                        "start": 705.997,
                        "end": 706.097
                    },
                    {
                        "word": "seat",
                        "start": 706.157,
                        "end": 706.377
                    },
                    {
                        "word": "in",
                        "start": 706.457,
                        "end": 706.517
                    },
                    {
                        "word": "the",
                        "start": 706.558,
                        "end": 706.618
                    },
                    {
                        "word": "bus.",
                        "start": 706.658,
                        "end": 706.998
                    },
                    {
                        "word": "Small",
                        "start": 707.719,
                        "end": 708.059
                    },
                    {
                        "word": "acts",
                        "start": 708.099,
                        "end": 708.459
                    },
                    {
                        "word": "of",
                        "start": 708.519,
                        "end": 708.579
                    },
                    {
                        "word": "kindness",
                        "start": 708.64,
                        "end": 709.1
                    },
                    {
                        "word": "add",
                        "start": 709.3,
                        "end": 709.42
                    },
                    {
                        "word": "up.",
                        "start": 709.52,
                        "end": 709.62
                    },
                    {
                        "word": "Mark",
                        "start": 710.501,
                        "end": 710.701
                    },
                    {
                        "word": "smiled",
                        "start": 710.762,
                        "end": 711.082
                    },
                    {
                        "word": "and",
                        "start": 711.142,
                        "end": 711.202
                    },
                    {
                        "word": "thought,",
                        "start": 711.242,
                        "end": 711.502
                    },
                    {
                        "word": "maybe",
                        "start": 712.083,
                        "end": 712.303
                    },
                    {
                        "word": "that's",
                        "start": 712.343,
                        "end": 712.563
                    },
                    {
                        "word": "a",
                        "start": 712.603,
                        "end": 712.623
                    },
                    {
                        "word": "good",
                        "start": 712.683,
                        "end": 712.824
                    },
                    {
                        "word": "place",
                        "start": 712.864,
                        "end": 713.104
                    },
                    {
                        "word": "to",
                        "start": 713.144,
                        "end": 713.224
                    },
                    {
                        "word": "start.",
                        "start": 713.264,
                        "end": 713.564
                    }
                ]
            }
        ]
    },
    {
        "id": "recording_1",
        "title": "Recording One",
        "audio_source": "2015.06_cet6_1.mp3",
        "full_audio_range": {
            "start": 825.995,
            "end": 993.918
        },
        "sentences": [
            {
                "text": "Industrialization came to the United States after 1790 as North American entrepreneurs increased productivity",
                "start": 825.995,
                "end": 834.147,
                "words": [
                    {
                        "word": "Industrialization",
                        "start": 825.995,
                        "end": 827.297
                    },
                    {
                        "word": "came",
                        "start": 827.397,
                        "end": 827.637
                    },
                    {
                        "word": "to",
                        "start": 827.698,
                        "end": 827.798
                    },
                    {
                        "word": "the",
                        "start": 827.818,
                        "end": 827.918
                    },
                    {
                        "word": "United",
                        "start": 827.998,
                        "end": 828.379
                    },
                    {
                        "word": "States",
                        "start": 828.439,
                        "end": 828.819
                    },
                    {
                        "word": "after",
                        "start": 828.959,
                        "end": 829.18
                    },
                    {
                        "word": "1790,",
                        "start": 829.2,
                        "end": 829.801
                    },
                    {
                        "word": "as",
                        "start": 829.981,
                        "end": 830.922
                    },
                    {
                        "word": "North",
                        "start": 830.962,
                        "end": 831.323
                    },
                    {
                        "word": "American",
                        "start": 831.383,
                        "end": 831.824
                    },
                    {
                        "word": "entrepreneurs",
                        "start": 831.944,
                        "end": 832.725
                    },
                    {
                        "word": "increased",
                        "start": 832.745,
                        "end": 833.286
                    },
                    {
                        "word": "productivity",
                        "start": 833.386,
                        "end": 834.147
                    }
                ]
            },
            {
                "text": "by reorganizing work and building factories. These innovations in manufacturing boosted output and living standards to an unprecedented extent; the average per capita wealth increased by nearly 1 percent per year—30 percent over the course of a generation. Goods that had once been luxury items became part of everyday life.",
                "start": 834.187,
                "end": 858.271,
                "words": [
                    {
                        "word": "by",
                        "start": 834.187,
                        "end": 834.788
                    },
                    {
                        "word": "reorganizing",
                        "start": 834.828,
                        "end": 835.91
                    },
                    {
                        "word": "work",
                        "start": 835.99,
                        "end": 836.23
                    },
                    {
                        "word": "and",
                        "start": 836.331,
                        "end": 836.411
                    },
                    {
                        "word": "building",
                        "start": 836.511,
                        "end": 836.871
                    },
                    {
                        "word": "factories.",
                        "start": 836.891,
                        "end": 837.592
                    },
                    {
                        "word": "These",
                        "start": 838.434,
                        "end": 838.674
                    },
                    {
                        "word": "innovations",
                        "start": 838.754,
                        "end": 839.455
                    },
                    {
                        "word": "in",
                        "start": 839.555,
                        "end": 839.615
                    },
                    {
                        "word": "manufacturing",
                        "start": 839.676,
                        "end": 840.617
                    },
                    {
                        "word": "boosted",
                        "start": 840.978,
                        "end": 841.378
                    },
                    {
                        "word": "output",
                        "start": 841.538,
                        "end": 841.959
                    },
                    {
                        "word": "and",
                        "start": 842.059,
                        "end": 842.139
                    },
                    {
                        "word": "living",
                        "start": 842.199,
                        "end": 842.46
                    },
                    {
                        "word": "standards",
                        "start": 842.5,
                        "end": 843.001
                    },
                    {
                        "word": "to",
                        "start": 843.341,
                        "end": 843.461
                    },
                    {
                        "word": "an",
                        "start": 843.541,
                        "end": 843.581
                    },
                    {
                        "word": "unprecedented",
                        "start": 843.702,
                        "end": 844.503
                    },
                    {
                        "word": "extent.",
                        "start": 844.603,
                        "end": 845.044
                    },
                    {
                        "word": "The",
                        "start": 845.685,
                        "end": 845.805
                    },
                    {
                        "word": "average",
                        "start": 845.985,
                        "end": 846.306
                    },
                    {
                        "word": "per",
                        "start": 846.366,
                        "end": 846.526
                    },
                    {
                        "word": "capita",
                        "start": 846.586,
                        "end": 847.047
                    },
                    {
                        "word": "wealth",
                        "start": 847.107,
                        "end": 847.407
                    },
                    {
                        "word": "increased",
                        "start": 847.688,
                        "end": 848.168
                    },
                    {
                        "word": "by",
                        "start": 848.248,
                        "end": 848.389
                    },
                    {
                        "word": "nearly",
                        "start": 848.409,
                        "end": 848.749
                    },
                    {
                        "word": "1%",
                        "start": 848.769,
                        "end": 848.809
                    },
                    {
                        "word": "per",
                        "start": 849.15,
                        "end": 849.31
                    },
                    {
                        "word": "year,",
                        "start": 849.871,
                        "end": 850.151
                    },
                    {
                        "word": "30%",
                        "start": 850.171,
                        "end": 851.133
                    },
                    {
                        "word": "over",
                        "start": 851.774,
                        "end": 851.914
                    },
                    {
                        "word": "the",
                        "start": 851.954,
                        "end": 852.034
                    },
                    {
                        "word": "course",
                        "start": 852.114,
                        "end": 852.395
                    },
                    {
                        "word": "of",
                        "start": 852.455,
                        "end": 852.495
                    },
                    {
                        "word": "a",
                        "start": 852.515,
                        "end": 852.535
                    },
                    {
                        "word": "generation.",
                        "start": 852.655,
                        "end": 853.977
                    },
                    {
                        "word": "Goods",
                        "start": 853.957,
                        "end": 854.398
                    },
                    {
                        "word": "that",
                        "start": 854.459,
                        "end": 854.619
                    },
                    {
                        "word": "had",
                        "start": 854.659,
                        "end": 854.82
                    },
                    {
                        "word": "once",
                        "start": 854.98,
                        "end": 855.121
                    },
                    {
                        "word": "been",
                        "start": 855.181,
                        "end": 855.342
                    },
                    {
                        "word": "luxury",
                        "start": 855.402,
                        "end": 855.843
                    },
                    {
                        "word": "items",
                        "start": 856.004,
                        "end": 856.305
                    },
                    {
                        "word": "became",
                        "start": 856.385,
                        "end": 856.786
                    },
                    {
                        "word": "part",
                        "start": 856.827,
                        "end": 857.208
                    },
                    {
                        "word": "of",
                        "start": 857.268,
                        "end": 857.308
                    },
                    {
                        "word": "everyday",
                        "start": 857.348,
                        "end": 857.95
                    },
                    {
                        "word": "life.",
                        "start": 858.031,
                        "end": 858.271
                    }
                ]
            },
            {
                "text": "The impressive gain in output stemmed primarily from the change of the way in which workers made goods. Since the 1790's, North American entrepreneurs—even without technological improvements— had broadened the scope of the work system that made manufacturing more efficient by distributing materials to a succession of workers who each performed a single step of the production process. For example, during the 1820's and 1830's the shoe industry greatly expanded the scale and extent of the work system. Tens of thousands of rural women, paid according to the amount they produced, fabricated the uppers of shoes, which were bound to the soles by skilled shoemakers in dozens of Massachusetts towns, whereas previously skilled shoemakers would have made the entire shoe. This system of production made the employer a powerful shoe boss and eroded workers' control over the pace and conditions of labor. However, it also dramatically increased the output of shoes while cutting the price.",
                "start": 859.656,
                "end": 930.825,
                "words": [
                    {
                        "word": "The",
                        "start": 859.656,
                        "end": 859.776
                    },
                    {
                        "word": "impressive",
                        "start": 859.857,
                        "end": 860.358
                    },
                    {
                        "word": "gain",
                        "start": 860.419,
                        "end": 860.76
                    },
                    {
                        "word": "in",
                        "start": 860.86,
                        "end": 860.94
                    },
                    {
                        "word": "output",
                        "start": 861.101,
                        "end": 861.522
                    },
                    {
                        "word": "stemmed",
                        "start": 861.723,
                        "end": 862.064
                    },
                    {
                        "word": "primarily",
                        "start": 862.104,
                        "end": 862.847
                    },
                    {
                        "word": "from",
                        "start": 862.867,
                        "end": 863.067
                    },
                    {
                        "word": "the",
                        "start": 863.107,
                        "end": 863.208
                    },
                    {
                        "word": "change",
                        "start": 863.268,
                        "end": 863.689
                    },
                    {
                        "word": "of",
                        "start": 863.81,
                        "end": 863.87
                    },
                    {
                        "word": "the",
                        "start": 863.89,
                        "end": 864.01
                    },
                    {
                        "word": "way",
                        "start": 864.051,
                        "end": 864.271
                    },
                    {
                        "word": "in",
                        "start": 864.291,
                        "end": 864.432
                    },
                    {
                        "word": "which",
                        "start": 864.492,
                        "end": 864.673
                    },
                    {
                        "word": "workers",
                        "start": 864.773,
                        "end": 865.235
                    },
                    {
                        "word": "made",
                        "start": 865.315,
                        "end": 865.556
                    },
                    {
                        "word": "goods.",
                        "start": 865.636,
                        "end": 866.599
                    },
                    {
                        "word": "Since",
                        "start": 866.765,
                        "end": 867.126
                    },
                    {
                        "word": "the",
                        "start": 867.286,
                        "end": 867.406
                    },
                    {
                        "word": "1790s,",
                        "start": 867.426,
                        "end": 868.007
                    },
                    {
                        "word": "North",
                        "start": 868.909,
                        "end": 869.15
                    },
                    {
                        "word": "American",
                        "start": 869.19,
                        "end": 869.591
                    },
                    {
                        "word": "entrepreneurs,",
                        "start": 869.711,
                        "end": 870.472
                    },
                    {
                        "word": "even",
                        "start": 870.913,
                        "end": 871.094
                    },
                    {
                        "word": "without",
                        "start": 871.174,
                        "end": 871.494
                    },
                    {
                        "word": "technological",
                        "start": 871.574,
                        "end": 872.356
                    },
                    {
                        "word": "improvements,",
                        "start": 872.436,
                        "end": 873.037
                    },
                    {
                        "word": "had",
                        "start": 873.538,
                        "end": 873.719
                    },
                    {
                        "word": "broadened",
                        "start": 873.779,
                        "end": 874.16
                    },
                    {
                        "word": "the",
                        "start": 874.2,
                        "end": 874.3
                    },
                    {
                        "word": "scope",
                        "start": 874.34,
                        "end": 874.661
                    },
                    {
                        "word": "of",
                        "start": 874.721,
                        "end": 874.761
                    },
                    {
                        "word": "the",
                        "start": 874.801,
                        "end": 874.901
                    },
                    {
                        "word": "work",
                        "start": 874.961,
                        "end": 875.182
                    },
                    {
                        "word": "system",
                        "start": 875.242,
                        "end": 875.622
                    },
                    {
                        "word": "that",
                        "start": 875.683,
                        "end": 875.823
                    },
                    {
                        "word": "made",
                        "start": 875.843,
                        "end": 876.103
                    },
                    {
                        "word": "manufacturing",
                        "start": 876.184,
                        "end": 877.005
                    },
                    {
                        "word": "more",
                        "start": 877.065,
                        "end": 877.246
                    },
                    {
                        "word": "efficient",
                        "start": 877.326,
                        "end": 877.767
                    },
                    {
                        "word": "by",
                        "start": 878.228,
                        "end": 878.368
                    },
                    {
                        "word": "distributing",
                        "start": 878.448,
                        "end": 879.049
                    },
                    {
                        "word": "materials",
                        "start": 879.109,
                        "end": 879.73
                    },
                    {
                        "word": "to",
                        "start": 879.791,
                        "end": 879.931
                    },
                    {
                        "word": "a",
                        "start": 879.991,
                        "end": 880.011
                    },
                    {
                        "word": "succession",
                        "start": 880.091,
                        "end": 880.652
                    },
                    {
                        "word": "of",
                        "start": 880.712,
                        "end": 880.773
                    },
                    {
                        "word": "workers",
                        "start": 880.793,
                        "end": 881.334
                    },
                    {
                        "word": "who",
                        "start": 881.754,
                        "end": 881.915
                    },
                    {
                        "word": "each",
                        "start": 881.995,
                        "end": 882.135
                    },
                    {
                        "word": "performed",
                        "start": 882.235,
                        "end": 882.716
                    },
                    {
                        "word": "a",
                        "start": 882.797,
                        "end": 882.817
                    },
                    {
                        "word": "single",
                        "start": 882.937,
                        "end": 883.297
                    },
                    {
                        "word": "step",
                        "start": 883.438,
                        "end": 883.758
                    },
                    {
                        "word": "of",
                        "start": 884.119,
                        "end": 884.179
                    },
                    {
                        "word": "the",
                        "start": 884.239,
                        "end": 884.319
                    },
                    {
                        "word": "production",
                        "start": 884.36,
                        "end": 884.841
                    },
                    {
                        "word": "process.",
                        "start": 884.881,
                        "end": 886.123
                    },
                    {
                        "word": "For",
                        "start": 886.289,
                        "end": 886.529
                    },
                    {
                        "word": "example,",
                        "start": 886.629,
                        "end": 887.17
                    },
                    {
                        "word": "during",
                        "start": 887.431,
                        "end": 887.751
                    },
                    {
                        "word": "the",
                        "start": 887.811,
                        "end": 887.891
                    },
                    {
                        "word": "1820s",
                        "start": 887.911,
                        "end": 888.873
                    },
                    {
                        "word": "and",
                        "start": 888.993,
                        "end": 889.073
                    },
                    {
                        "word": "1830s,",
                        "start": 889.093,
                        "end": 889.594
                    },
                    {
                        "word": "the",
                        "start": 890.675,
                        "end": 890.775
                    },
                    {
                        "word": "shoe",
                        "start": 890.856,
                        "end": 891.156
                    },
                    {
                        "word": "industry",
                        "start": 891.316,
                        "end": 891.797
                    },
                    {
                        "word": "greatly",
                        "start": 891.817,
                        "end": 892.258
                    },
                    {
                        "word": "expanded",
                        "start": 892.278,
                        "end": 892.859
                    },
                    {
                        "word": "the",
                        "start": 892.919,
                        "end": 893.019
                    },
                    {
                        "word": "scale",
                        "start": 893.079,
                        "end": 893.499
                    },
                    {
                        "word": "and",
                        "start": 893.64,
                        "end": 893.7
                    },
                    {
                        "word": "extent",
                        "start": 893.78,
                        "end": 894.18
                    },
                    {
                        "word": "of",
                        "start": 894.281,
                        "end": 894.341
                    },
                    {
                        "word": "the",
                        "start": 894.381,
                        "end": 894.461
                    },
                    {
                        "word": "work",
                        "start": 894.521,
                        "end": 894.761
                    },
                    {
                        "word": "system.",
                        "start": 894.821,
                        "end": 895.242
                    },
                    {
                        "word": "Tens",
                        "start": 896.003,
                        "end": 896.324
                    },
                    {
                        "word": "of",
                        "start": 896.424,
                        "end": 896.464
                    },
                    {
                        "word": "thousands",
                        "start": 896.504,
                        "end": 897.125
                    },
                    {
                        "word": "of",
                        "start": 897.205,
                        "end": 897.245
                    },
                    {
                        "word": "rural",
                        "start": 897.325,
                        "end": 897.645
                    },
                    {
                        "word": "women,",
                        "start": 897.706,
                        "end": 898.026
                    },
                    {
                        "word": "paid",
                        "start": 898.407,
                        "end": 898.727
                    },
                    {
                        "word": "according",
                        "start": 898.767,
                        "end": 899.248
                    },
                    {
                        "word": "to",
                        "start": 899.288,
                        "end": 899.388
                    },
                    {
                        "word": "the",
                        "start": 899.428,
                        "end": 899.528
                    },
                    {
                        "word": "amount",
                        "start": 899.588,
                        "end": 899.889
                    },
                    {
                        "word": "they",
                        "start": 899.929,
                        "end": 900.069
                    },
                    {
                        "word": "produced,",
                        "start": 900.129,
                        "end": 900.61
                    },
                    {
                        "word": "fabricated",
                        "start": 901.03,
                        "end": 901.731
                    },
                    {
                        "word": "the",
                        "start": 901.751,
                        "end": 901.892
                    },
                    {
                        "word": "uppers",
                        "start": 902.032,
                        "end": 902.392
                    },
                    {
                        "word": "of",
                        "start": 902.432,
                        "end": 902.633
                    },
                    {
                        "word": "shoes,",
                        "start": 902.673,
                        "end": 903.153
                    },
                    {
                        "word": "which",
                        "start": 903.634,
                        "end": 903.794
                    },
                    {
                        "word": "were",
                        "start": 903.854,
                        "end": 903.995
                    },
                    {
                        "word": "bound",
                        "start": 904.075,
                        "end": 904.435
                    },
                    {
                        "word": "to",
                        "start": 904.475,
                        "end": 904.676
                    },
                    {
                        "word": "the",
                        "start": 904.716,
                        "end": 904.816
                    },
                    {
                        "word": "soles",
                        "start": 904.896,
                        "end": 905.296
                    },
                    {
                        "word": "by",
                        "start": 905.377,
                        "end": 905.537
                    },
                    {
                        "word": "skilled",
                        "start": 905.577,
                        "end": 906.058
                    },
                    {
                        "word": "shoemakers",
                        "start": 906.078,
                        "end": 906.799
                    },
                    {
                        "word": "in",
                        "start": 907.319,
                        "end": 907.4
                    },
                    {
                        "word": "dozens",
                        "start": 907.5,
                        "end": 907.9
                    },
                    {
                        "word": "of",
                        "start": 908.0,
                        "end": 908.04
                    },
                    {
                        "word": "Massachusetts",
                        "start": 908.121,
                        "end": 909.002
                    },
                    {
                        "word": "towns,",
                        "start": 909.082,
                        "end": 909.523
                    },
                    {
                        "word": "whereas",
                        "start": 910.043,
                        "end": 910.604
                    },
                    {
                        "word": "previously",
                        "start": 910.764,
                        "end": 911.385
                    },
                    {
                        "word": "skilled",
                        "start": 911.405,
                        "end": 911.906
                    },
                    {
                        "word": "shoemakers",
                        "start": 911.966,
                        "end": 912.607
                    },
                    {
                        "word": "would",
                        "start": 912.948,
                        "end": 913.108
                    },
                    {
                        "word": "have",
                        "start": 913.168,
                        "end": 913.308
                    },
                    {
                        "word": "made",
                        "start": 913.348,
                        "end": 913.548
                    },
                    {
                        "word": "the",
                        "start": 913.568,
                        "end": 913.689
                    },
                    {
                        "word": "entire",
                        "start": 913.789,
                        "end": 914.229
                    },
                    {
                        "word": "shoe.",
                        "start": 914.33,
                        "end": 915.351
                    },
                    {
                        "word": "This",
                        "start": 915.331,
                        "end": 915.652
                    },
                    {
                        "word": "system",
                        "start": 915.752,
                        "end": 916.133
                    },
                    {
                        "word": "of",
                        "start": 916.193,
                        "end": 916.253
                    },
                    {
                        "word": "production",
                        "start": 916.313,
                        "end": 916.914
                    },
                    {
                        "word": "made",
                        "start": 916.935,
                        "end": 917.295
                    },
                    {
                        "word": "the",
                        "start": 917.335,
                        "end": 917.416
                    },
                    {
                        "word": "employer",
                        "start": 917.516,
                        "end": 917.997
                    },
                    {
                        "word": "a",
                        "start": 918.017,
                        "end": 918.037
                    },
                    {
                        "word": "powerful",
                        "start": 918.518,
                        "end": 919.059
                    },
                    {
                        "word": "shoe",
                        "start": 919.139,
                        "end": 919.4
                    },
                    {
                        "word": "boss",
                        "start": 919.48,
                        "end": 919.861
                    },
                    {
                        "word": "and",
                        "start": 920.282,
                        "end": 920.362
                    },
                    {
                        "word": "eroded",
                        "start": 920.482,
                        "end": 920.903
                    },
                    {
                        "word": "workers'",
                        "start": 920.983,
                        "end": 921.324
                    },
                    {
                        "word": "control",
                        "start": 921.404,
                        "end": 921.905
                    },
                    {
                        "word": "over",
                        "start": 921.925,
                        "end": 922.387
                    },
                    {
                        "word": "the",
                        "start": 922.427,
                        "end": 922.527
                    },
                    {
                        "word": "pace",
                        "start": 922.587,
                        "end": 922.888
                    },
                    {
                        "word": "and",
                        "start": 922.968,
                        "end": 923.068
                    },
                    {
                        "word": "conditions",
                        "start": 923.128,
                        "end": 923.709
                    },
                    {
                        "word": "of",
                        "start": 923.83,
                        "end": 923.87
                    },
                    {
                        "word": "labor.",
                        "start": 923.91,
                        "end": 924.311
                    },
                    {
                        "word": "However,",
                        "start": 925.153,
                        "end": 925.614
                    },
                    {
                        "word": "it",
                        "start": 925.654,
                        "end": 926.235
                    },
                    {
                        "word": "also",
                        "start": 926.355,
                        "end": 926.656
                    },
                    {
                        "word": "dramatically",
                        "start": 926.696,
                        "end": 927.438
                    },
                    {
                        "word": "increased",
                        "start": 927.558,
                        "end": 927.959
                    },
                    {
                        "word": "the",
                        "start": 927.999,
                        "end": 928.099
                    },
                    {
                        "word": "output",
                        "start": 928.199,
                        "end": 928.5
                    },
                    {
                        "word": "of",
                        "start": 928.54,
                        "end": 928.58
                    },
                    {
                        "word": "shoes",
                        "start": 928.66,
                        "end": 929.041
                    },
                    {
                        "word": "while",
                        "start": 929.081,
                        "end": 929.482
                    },
                    {
                        "word": "cutting",
                        "start": 929.622,
                        "end": 929.923
                    },
                    {
                        "word": "the",
                        "start": 929.963,
                        "end": 930.083
                    },
                    {
                        "word": "price.",
                        "start": 930.144,
                        "end": 930.825
                    }
                ]
            },
            {
                "text": "Entrepreneurs created an even more important new organization, the modern factory, which used power-driven machines and assembly-line techniques to turn out large quantities of well-made goods. As early as 1782 the creative inventor Oliver Evans had built a highly automated, laborsaving flour mill driven by water power. His machinery lifted the grain to the top of the mill, cleaned it as it fell into containers known as hoppers, ground the grain into flour, and then conveyed the flour back to the top of the mill to allow it to cool as it descended into barrels. Subsequently, manufacturers made use of new improved stationary steam engines to power their mills. This new technology enabled them to build factories in the nation's largest cities, taking advantage of urban inexpensive labor, good transportation networks, and eager customers.",
                "start": 931.919,
                "end": 993.918,
                "words": [
                    {
                        "word": "Entrepreneurs",
                        "start": 931.919,
                        "end": 932.901
                    },
                    {
                        "word": "created",
                        "start": 933.001,
                        "end": 933.482
                    },
                    {
                        "word": "an",
                        "start": 933.502,
                        "end": 933.542
                    },
                    {
                        "word": "even",
                        "start": 933.762,
                        "end": 933.963
                    },
                    {
                        "word": "more",
                        "start": 934.003,
                        "end": 934.283
                    },
                    {
                        "word": "important",
                        "start": 934.303,
                        "end": 934.924
                    },
                    {
                        "word": "new",
                        "start": 934.984,
                        "end": 935.125
                    },
                    {
                        "word": "organization,",
                        "start": 935.225,
                        "end": 936.026
                    },
                    {
                        "word": "the",
                        "start": 936.427,
                        "end": 936.527
                    },
                    {
                        "word": "Modern",
                        "start": 936.627,
                        "end": 937.068
                    },
                    {
                        "word": "Factory,",
                        "start": 937.168,
                        "end": 937.729
                    },
                    {
                        "word": "which",
                        "start": 938.23,
                        "end": 938.411
                    },
                    {
                        "word": "used",
                        "start": 938.591,
                        "end": 938.811
                    },
                    {
                        "word": "power-driven",
                        "start": 938.952,
                        "end": 939.613
                    },
                    {
                        "word": "machines",
                        "start": 939.673,
                        "end": 940.194
                    },
                    {
                        "word": "and",
                        "start": 940.294,
                        "end": 940.374
                    },
                    {
                        "word": "assembly",
                        "start": 940.434,
                        "end": 940.875
                    },
                    {
                        "word": "line",
                        "start": 940.935,
                        "end": 941.216
                    },
                    {
                        "word": "techniques",
                        "start": 941.296,
                        "end": 941.817
                    },
                    {
                        "word": "to",
                        "start": 942.278,
                        "end": 942.398
                    },
                    {
                        "word": "turn",
                        "start": 942.478,
                        "end": 942.718
                    },
                    {
                        "word": "out",
                        "start": 942.839,
                        "end": 942.959
                    },
                    {
                        "word": "large",
                        "start": 943.139,
                        "end": 943.46
                    },
                    {
                        "word": "quantities",
                        "start": 943.54,
                        "end": 944.101
                    },
                    {
                        "word": "of",
                        "start": 944.201,
                        "end": 944.241
                    },
                    {
                        "word": "well-made",
                        "start": 944.281,
                        "end": 944.882
                    },
                    {
                        "word": "goods.",
                        "start": 944.942,
                        "end": 945.303
                    },
                    {
                        "word": "As",
                        "start": 946.164,
                        "end": 946.245
                    },
                    {
                        "word": "early",
                        "start": 946.345,
                        "end": 946.605
                    },
                    {
                        "word": "as",
                        "start": 946.685,
                        "end": 946.725
                    },
                    {
                        "word": "1782,",
                        "start": 946.746,
                        "end": 947.266
                    },
                    {
                        "word": "the",
                        "start": 947.307,
                        "end": 948.368
                    },
                    {
                        "word": "creative",
                        "start": 948.408,
                        "end": 948.849
                    },
                    {
                        "word": "inventor",
                        "start": 948.929,
                        "end": 949.43
                    },
                    {
                        "word": "Oliver",
                        "start": 949.47,
                        "end": 949.991
                    },
                    {
                        "word": "Evans",
                        "start": 950.152,
                        "end": 950.472
                    },
                    {
                        "word": "had",
                        "start": 950.853,
                        "end": 950.993
                    },
                    {
                        "word": "built",
                        "start": 951.073,
                        "end": 951.294
                    },
                    {
                        "word": "a",
                        "start": 951.314,
                        "end": 951.334
                    },
                    {
                        "word": "highly",
                        "start": 951.474,
                        "end": 951.835
                    },
                    {
                        "word": "automated",
                        "start": 951.975,
                        "end": 952.456
                    },
                    {
                        "word": "labor-saving",
                        "start": 952.496,
                        "end": 953.417
                    },
                    {
                        "word": "flour",
                        "start": 953.518,
                        "end": 953.918
                    },
                    {
                        "word": "mill",
                        "start": 953.978,
                        "end": 954.219
                    },
                    {
                        "word": "driven",
                        "start": 954.62,
                        "end": 954.94
                    },
                    {
                        "word": "by",
                        "start": 955.0,
                        "end": 955.181
                    },
                    {
                        "word": "water",
                        "start": 955.221,
                        "end": 955.681
                    },
                    {
                        "word": "power.",
                        "start": 955.742,
                        "end": 956.543
                    },
                    {
                        "word": "His",
                        "start": 956.523,
                        "end": 956.844
                    },
                    {
                        "word": "machinery",
                        "start": 956.924,
                        "end": 957.525
                    },
                    {
                        "word": "lifted",
                        "start": 957.625,
                        "end": 957.925
                    },
                    {
                        "word": "the",
                        "start": 957.966,
                        "end": 958.046
                    },
                    {
                        "word": "grain",
                        "start": 958.106,
                        "end": 958.406
                    },
                    {
                        "word": "to",
                        "start": 958.486,
                        "end": 958.567
                    },
                    {
                        "word": "the",
                        "start": 958.607,
                        "end": 958.707
                    },
                    {
                        "word": "top",
                        "start": 958.767,
                        "end": 959.027
                    },
                    {
                        "word": "of",
                        "start": 959.088,
                        "end": 959.148
                    },
                    {
                        "word": "the",
                        "start": 959.168,
                        "end": 959.288
                    },
                    {
                        "word": "mill,",
                        "start": 959.328,
                        "end": 959.608
                    },
                    {
                        "word": "cleaned",
                        "start": 960.109,
                        "end": 960.43
                    },
                    {
                        "word": "it",
                        "start": 960.49,
                        "end": 960.55
                    },
                    {
                        "word": "as",
                        "start": 960.75,
                        "end": 960.831
                    },
                    {
                        "word": "it",
                        "start": 960.911,
                        "end": 960.971
                    },
                    {
                        "word": "fell",
                        "start": 961.031,
                        "end": 961.291
                    },
                    {
                        "word": "into",
                        "start": 961.392,
                        "end": 961.552
                    },
                    {
                        "word": "containers",
                        "start": 961.612,
                        "end": 962.173
                    },
                    {
                        "word": "known",
                        "start": 962.253,
                        "end": 962.534
                    },
                    {
                        "word": "as",
                        "start": 962.694,
                        "end": 962.774
                    },
                    {
                        "word": "hoppers,",
                        "start": 962.794,
                        "end": 963.335
                    },
                    {
                        "word": "ground",
                        "start": 963.936,
                        "end": 964.257
                    },
                    {
                        "word": "the",
                        "start": 964.317,
                        "end": 964.377
                    },
                    {
                        "word": "grain",
                        "start": 964.437,
                        "end": 964.778
                    },
                    {
                        "word": "into",
                        "start": 964.798,
                        "end": 965.158
                    },
                    {
                        "word": "flour,",
                        "start": 965.258,
                        "end": 965.699
                    },
                    {
                        "word": "and",
                        "start": 965.739,
                        "end": 966.32
                    },
                    {
                        "word": "then",
                        "start": 966.34,
                        "end": 966.621
                    },
                    {
                        "word": "conveyed",
                        "start": 966.781,
                        "end": 967.262
                    },
                    {
                        "word": "the",
                        "start": 967.282,
                        "end": 967.402
                    },
                    {
                        "word": "flour",
                        "start": 967.442,
                        "end": 967.823
                    },
                    {
                        "word": "back",
                        "start": 967.923,
                        "end": 968.123
                    },
                    {
                        "word": "to",
                        "start": 968.164,
                        "end": 968.264
                    },
                    {
                        "word": "the",
                        "start": 968.304,
                        "end": 968.384
                    },
                    {
                        "word": "top",
                        "start": 968.464,
                        "end": 968.704
                    },
                    {
                        "word": "of",
                        "start": 968.745,
                        "end": 968.805
                    },
                    {
                        "word": "the",
                        "start": 968.845,
                        "end": 968.945
                    },
                    {
                        "word": "mill",
                        "start": 968.985,
                        "end": 969.245
                    },
                    {
                        "word": "to",
                        "start": 969.626,
                        "end": 969.766
                    },
                    {
                        "word": "allow",
                        "start": 969.846,
                        "end": 970.087
                    },
                    {
                        "word": "it",
                        "start": 970.147,
                        "end": 970.187
                    },
                    {
                        "word": "to",
                        "start": 970.227,
                        "end": 970.347
                    },
                    {
                        "word": "cool",
                        "start": 970.448,
                        "end": 970.768
                    },
                    {
                        "word": "as",
                        "start": 970.788,
                        "end": 971.249
                    },
                    {
                        "word": "it",
                        "start": 971.269,
                        "end": 971.409
                    },
                    {
                        "word": "descended",
                        "start": 971.469,
                        "end": 971.97
                    },
                    {
                        "word": "into",
                        "start": 972.01,
                        "end": 972.331
                    },
                    {
                        "word": "barrels.",
                        "start": 972.431,
                        "end": 973.553
                    },
                    {
                        "word": "Subsequently,",
                        "start": 973.533,
                        "end": 974.514
                    },
                    {
                        "word": "manufacturers",
                        "start": 974.534,
                        "end": 975.916
                    },
                    {
                        "word": "made",
                        "start": 975.996,
                        "end": 976.196
                    },
                    {
                        "word": "use",
                        "start": 976.356,
                        "end": 976.517
                    },
                    {
                        "word": "of",
                        "start": 976.597,
                        "end": 976.637
                    },
                    {
                        "word": "new",
                        "start": 976.717,
                        "end": 976.857
                    },
                    {
                        "word": "improved",
                        "start": 976.937,
                        "end": 977.378
                    },
                    {
                        "word": "stationary",
                        "start": 977.498,
                        "end": 978.139
                    },
                    {
                        "word": "steam",
                        "start": 978.199,
                        "end": 978.499
                    },
                    {
                        "word": "engines",
                        "start": 978.619,
                        "end": 978.92
                    },
                    {
                        "word": "to",
                        "start": 979.3,
                        "end": 979.46
                    },
                    {
                        "word": "power",
                        "start": 979.6,
                        "end": 980.001
                    },
                    {
                        "word": "their",
                        "start": 980.081,
                        "end": 980.281
                    },
                    {
                        "word": "mills.",
                        "start": 980.341,
                        "end": 980.702
                    },
                    {
                        "word": "This",
                        "start": 981.463,
                        "end": 981.643
                    },
                    {
                        "word": "new",
                        "start": 981.743,
                        "end": 981.903
                    },
                    {
                        "word": "technology",
                        "start": 981.963,
                        "end": 982.724
                    },
                    {
                        "word": "enabled",
                        "start": 982.744,
                        "end": 983.245
                    },
                    {
                        "word": "them",
                        "start": 983.305,
                        "end": 983.465
                    },
                    {
                        "word": "to",
                        "start": 983.545,
                        "end": 983.625
                    },
                    {
                        "word": "build",
                        "start": 983.685,
                        "end": 983.926
                    },
                    {
                        "word": "factories",
                        "start": 984.026,
                        "end": 984.626
                    },
                    {
                        "word": "in",
                        "start": 985.127,
                        "end": 985.187
                    },
                    {
                        "word": "the",
                        "start": 985.227,
                        "end": 985.307
                    },
                    {
                        "word": "nation's",
                        "start": 985.347,
                        "end": 985.808
                    },
                    {
                        "word": "largest",
                        "start": 985.988,
                        "end": 986.409
                    },
                    {
                        "word": "cities,",
                        "start": 986.489,
                        "end": 986.849
                    },
                    {
                        "word": "taking",
                        "start": 987.33,
                        "end": 987.69
                    },
                    {
                        "word": "advantage",
                        "start": 987.77,
                        "end": 988.251
                    },
                    {
                        "word": "of",
                        "start": 988.331,
                        "end": 988.371
                    },
                    {
                        "word": "urban",
                        "start": 988.411,
                        "end": 988.812
                    },
                    {
                        "word": "inexpensive",
                        "start": 988.932,
                        "end": 989.552
                    },
                    {
                        "word": "labor,",
                        "start": 989.633,
                        "end": 989.973
                    },
                    {
                        "word": "good",
                        "start": 990.474,
                        "end": 990.694
                    },
                    {
                        "word": "transportation",
                        "start": 990.754,
                        "end": 991.615
                    },
                    {
                        "word": "networks,",
                        "start": 991.675,
                        "end": 992.176
                    },
                    {
                        "word": "and",
                        "start": 992.476,
                        "end": 992.596
                    },
                    {
                        "word": "eager",
                        "start": 992.636,
                        "end": 993.177
                    },
                    {
                        "word": "customers.",
                        "start": 993.317,
                        "end": 993.918
                    }
                ]
            }
        ]
    },
    {
        "id": "recording_2",
        "title": "Recording Two",
        "audio_source": "2015.06_cet6_1.mp3",
        "full_audio_range": {
            "start": 1075.458,
            "end": 1248.292
        },
        "sentences": [
            {
                "text": "The economic depression in the late-nineteenth-century United States contributed significantly to a growing movement in literature toward realism and naturalism. After the 1870's, a number of important authors began to reject the romanticism that had prevailed immediately following the Civil War of 1861-1865 and turned instead to realism. Determined to portray life as it was, with loyalty to real life and accurate representation without any idealization, they studied local dialects, wrote stories which focused on life in specific regions of the country, and emphasized the true relationships between people. In doing so, they reflected broader trends in the society, such as industrialization, evolutionary theory which emphasized the effect of the environment on humans, and the influence of science.",
                "start": 1075.458,
                "end": 1137.313,
                "words": [
                    {
                        "word": "The",
                        "start": 1075.458,
                        "end": 1076.019
                    },
                    {
                        "word": "economic",
                        "start": 1076.339,
                        "end": 1078.121
                    },
                    {
                        "word": "depression",
                        "start": 1078.181,
                        "end": 1078.741
                    },
                    {
                        "word": "in",
                        "start": 1078.781,
                        "end": 1078.922
                    },
                    {
                        "word": "the",
                        "start": 1078.962,
                        "end": 1079.042
                    },
                    {
                        "word": "late",
                        "start": 1079.102,
                        "end": 1079.302
                    },
                    {
                        "word": "nineteenth",
                        "start": 1079.382,
                        "end": 1079.903
                    },
                    {
                        "word": "century",
                        "start": 1079.963,
                        "end": 1080.403
                    },
                    {
                        "word": "United",
                        "start": 1080.483,
                        "end": 1080.804
                    },
                    {
                        "word": "States",
                        "start": 1080.864,
                        "end": 1081.284
                    },
                    {
                        "word": "contributed",
                        "start": 1081.785,
                        "end": 1082.345
                    },
                    {
                        "word": "significantly",
                        "start": 1082.405,
                        "end": 1083.206
                    },
                    {
                        "word": "to",
                        "start": 1083.306,
                        "end": 1083.426
                    },
                    {
                        "word": "a",
                        "start": 1083.446,
                        "end": 1083.466
                    },
                    {
                        "word": "growing",
                        "start": 1083.587,
                        "end": 1083.967
                    },
                    {
                        "word": "movement",
                        "start": 1084.027,
                        "end": 1084.447
                    },
                    {
                        "word": "in",
                        "start": 1084.548,
                        "end": 1084.628
                    },
                    {
                        "word": "literature",
                        "start": 1084.708,
                        "end": 1085.208
                    },
                    {
                        "word": "toward",
                        "start": 1085.248,
                        "end": 1086.009
                    },
                    {
                        "word": "realism",
                        "start": 1086.049,
                        "end": 1086.65
                    },
                    {
                        "word": "and",
                        "start": 1086.69,
                        "end": 1086.97
                    },
                    {
                        "word": "naturalism.",
                        "start": 1087.03,
                        "end": 1087.711
                    },
                    {
                        "word": "After",
                        "start": 1087.771,
                        "end": 1088.752
                    },
                    {
                        "word": "the",
                        "start": 1088.812,
                        "end": 1088.892
                    },
                    {
                        "word": "1870s,",
                        "start": 1088.912,
                        "end": 1089.873
                    },
                    {
                        "word": "a",
                        "start": 1090.394,
                        "end": 1090.434
                    },
                    {
                        "word": "number",
                        "start": 1090.494,
                        "end": 1090.754
                    },
                    {
                        "word": "of",
                        "start": 1090.814,
                        "end": 1090.854
                    },
                    {
                        "word": "important",
                        "start": 1090.894,
                        "end": 1091.415
                    },
                    {
                        "word": "authors",
                        "start": 1091.575,
                        "end": 1091.955
                    },
                    {
                        "word": "began",
                        "start": 1092.075,
                        "end": 1092.416
                    },
                    {
                        "word": "to",
                        "start": 1092.476,
                        "end": 1092.576
                    },
                    {
                        "word": "reject",
                        "start": 1092.636,
                        "end": 1093.096
                    },
                    {
                        "word": "the",
                        "start": 1093.136,
                        "end": 1093.297
                    },
                    {
                        "word": "romanticism",
                        "start": 1093.337,
                        "end": 1094.138
                    },
                    {
                        "word": "that",
                        "start": 1094.158,
                        "end": 1094.658
                    },
                    {
                        "word": "had",
                        "start": 1094.698,
                        "end": 1094.798
                    },
                    {
                        "word": "prevailed",
                        "start": 1094.858,
                        "end": 1095.399
                    },
                    {
                        "word": "immediately",
                        "start": 1095.439,
                        "end": 1096.1
                    },
                    {
                        "word": "following",
                        "start": 1096.18,
                        "end": 1096.62
                    },
                    {
                        "word": "the",
                        "start": 1096.68,
                        "end": 1096.76
                    },
                    {
                        "word": "Civil",
                        "start": 1096.82,
                        "end": 1097.081
                    },
                    {
                        "word": "War",
                        "start": 1097.141,
                        "end": 1097.401
                    },
                    {
                        "word": "of",
                        "start": 1097.421,
                        "end": 1097.461
                    },
                    {
                        "word": "1861",
                        "start": 1097.821,
                        "end": 1097.922
                    },
                    {
                        "word": "to",
                        "start": 1097.942,
                        "end": 1097.982
                    },
                    {
                        "word": "1865,",
                        "start": 1098.002,
                        "end": 1100.064
                    },
                    {
                        "word": "and",
                        "start": 1100.885,
                        "end": 1101.525
                    },
                    {
                        "word": "turned",
                        "start": 1101.605,
                        "end": 1101.986
                    },
                    {
                        "word": "instead",
                        "start": 1102.006,
                        "end": 1102.586
                    },
                    {
                        "word": "to",
                        "start": 1102.626,
                        "end": 1102.927
                    },
                    {
                        "word": "realism.",
                        "start": 1102.987,
                        "end": 1104.148
                    },
                    {
                        "word": "Determined",
                        "start": 1104.128,
                        "end": 1104.849
                    },
                    {
                        "word": "to",
                        "start": 1104.889,
                        "end": 1105.109
                    },
                    {
                        "word": "portray",
                        "start": 1105.169,
                        "end": 1105.55
                    },
                    {
                        "word": "life",
                        "start": 1105.63,
                        "end": 1105.89
                    },
                    {
                        "word": "as",
                        "start": 1106.03,
                        "end": 1106.09
                    },
                    {
                        "word": "it",
                        "start": 1106.171,
                        "end": 1106.231
                    },
                    {
                        "word": "was,",
                        "start": 1106.291,
                        "end": 1106.611
                    },
                    {
                        "word": "with",
                        "start": 1107.092,
                        "end": 1107.252
                    },
                    {
                        "word": "loyalty",
                        "start": 1107.292,
                        "end": 1107.853
                    },
                    {
                        "word": "to",
                        "start": 1107.913,
                        "end": 1108.053
                    },
                    {
                        "word": "real",
                        "start": 1108.133,
                        "end": 1108.333
                    },
                    {
                        "word": "life",
                        "start": 1108.373,
                        "end": 1108.654
                    },
                    {
                        "word": "and",
                        "start": 1108.774,
                        "end": 1108.854
                    },
                    {
                        "word": "accurate",
                        "start": 1108.874,
                        "end": 1109.395
                    },
                    {
                        "word": "representation",
                        "start": 1109.435,
                        "end": 1110.336
                    },
                    {
                        "word": "without",
                        "start": 1110.696,
                        "end": 1111.017
                    },
                    {
                        "word": "any",
                        "start": 1111.217,
                        "end": 1111.357
                    },
                    {
                        "word": "idealization,",
                        "start": 1111.537,
                        "end": 1112.418
                    },
                    {
                        "word": "they",
                        "start": 1112.478,
                        "end": 1113.259
                    },
                    {
                        "word": "studied",
                        "start": 1113.339,
                        "end": 1113.7
                    },
                    {
                        "word": "local",
                        "start": 1113.74,
                        "end": 1114.241
                    },
                    {
                        "word": "dialects,",
                        "start": 1114.281,
                        "end": 1114.841
                    },
                    {
                        "word": "wrote",
                        "start": 1115.302,
                        "end": 1115.522
                    },
                    {
                        "word": "stories",
                        "start": 1115.602,
                        "end": 1116.083
                    },
                    {
                        "word": "which",
                        "start": 1116.103,
                        "end": 1116.323
                    },
                    {
                        "word": "focused",
                        "start": 1116.423,
                        "end": 1116.844
                    },
                    {
                        "word": "on",
                        "start": 1116.964,
                        "end": 1117.044
                    },
                    {
                        "word": "life",
                        "start": 1117.124,
                        "end": 1117.425
                    },
                    {
                        "word": "in",
                        "start": 1117.525,
                        "end": 1117.605
                    },
                    {
                        "word": "specific",
                        "start": 1117.665,
                        "end": 1118.165
                    },
                    {
                        "word": "regions",
                        "start": 1118.186,
                        "end": 1118.626
                    },
                    {
                        "word": "of",
                        "start": 1118.686,
                        "end": 1118.746
                    },
                    {
                        "word": "the",
                        "start": 1118.786,
                        "end": 1118.866
                    },
                    {
                        "word": "country,",
                        "start": 1118.926,
                        "end": 1119.347
                    },
                    {
                        "word": "and",
                        "start": 1119.968,
                        "end": 1120.088
                    },
                    {
                        "word": "emphasized",
                        "start": 1120.288,
                        "end": 1120.969
                    },
                    {
                        "word": "the",
                        "start": 1121.149,
                        "end": 1121.249
                    },
                    {
                        "word": "true",
                        "start": 1121.369,
                        "end": 1121.63
                    },
                    {
                        "word": "relationships",
                        "start": 1121.69,
                        "end": 1122.431
                    },
                    {
                        "word": "between",
                        "start": 1122.591,
                        "end": 1122.951
                    },
                    {
                        "word": "people.",
                        "start": 1123.032,
                        "end": 1124.213
                    },
                    {
                        "word": "In",
                        "start": 1124.193,
                        "end": 1124.453
                    },
                    {
                        "word": "doing",
                        "start": 1124.513,
                        "end": 1124.774
                    },
                    {
                        "word": "so,",
                        "start": 1124.874,
                        "end": 1125.134
                    },
                    {
                        "word": "they",
                        "start": 1125.315,
                        "end": 1125.455
                    },
                    {
                        "word": "reflected",
                        "start": 1125.475,
                        "end": 1126.036
                    },
                    {
                        "word": "broader",
                        "start": 1126.156,
                        "end": 1126.516
                    },
                    {
                        "word": "trends",
                        "start": 1126.597,
                        "end": 1126.977
                    },
                    {
                        "word": "in",
                        "start": 1127.037,
                        "end": 1127.097
                    },
                    {
                        "word": "the",
                        "start": 1127.137,
                        "end": 1127.218
                    },
                    {
                        "word": "society,",
                        "start": 1127.278,
                        "end": 1127.879
                    },
                    {
                        "word": "such",
                        "start": 1128.379,
                        "end": 1128.6
                    },
                    {
                        "word": "as",
                        "start": 1128.78,
                        "end": 1128.9
                    },
                    {
                        "word": "industrialization,",
                        "start": 1128.94,
                        "end": 1130.262
                    },
                    {
                        "word": "evolutionary",
                        "start": 1130.723,
                        "end": 1131.344
                    },
                    {
                        "word": "theory,",
                        "start": 1131.444,
                        "end": 1131.844
                    },
                    {
                        "word": "which",
                        "start": 1132.285,
                        "end": 1132.445
                    },
                    {
                        "word": "emphasized",
                        "start": 1132.525,
                        "end": 1133.026
                    },
                    {
                        "word": "the",
                        "start": 1133.046,
                        "end": 1133.126
                    },
                    {
                        "word": "effect",
                        "start": 1133.186,
                        "end": 1133.507
                    },
                    {
                        "word": "of",
                        "start": 1133.547,
                        "end": 1133.587
                    },
                    {
                        "word": "the",
                        "start": 1133.627,
                        "end": 1133.727
                    },
                    {
                        "word": "environment",
                        "start": 1133.787,
                        "end": 1134.268
                    },
                    {
                        "word": "on",
                        "start": 1134.368,
                        "end": 1134.428
                    },
                    {
                        "word": "humans,",
                        "start": 1134.508,
                        "end": 1134.949
                    },
                    {
                        "word": "and",
                        "start": 1135.59,
                        "end": 1135.73
                    },
                    {
                        "word": "the",
                        "start": 1135.77,
                        "end": 1136.051
                    },
                    {
                        "word": "influence",
                        "start": 1136.151,
                        "end": 1136.632
                    },
                    {
                        "word": "of",
                        "start": 1136.692,
                        "end": 1136.752
                    },
                    {
                        "word": "science.",
                        "start": 1136.832,
                        "end": 1137.313
                    }
                ]
            },
            {
                "text": "Realists such as Joel Chandler Harris and Ellen Glasgow depicted life in the South, Hamlin Garland described life on the Great Plains, and Sarah Orne Jewett wrote about everyday life in rural New England. Another realist, Bret Harte, achieved fame with stories that portrayed local life in the California mining camps.",
                "start": 1138.314,
                "end": 1161.726,
                "words": [
                    {
                        "word": "Realists,",
                        "start": 1138.314,
                        "end": 1138.815
                    },
                    {
                        "word": "such",
                        "start": 1139.095,
                        "end": 1139.316
                    },
                    {
                        "word": "as",
                        "start": 1139.456,
                        "end": 1139.556
                    },
                    {
                        "word": "Joel",
                        "start": 1139.576,
                        "end": 1140.197
                    },
                    {
                        "word": "Chandler",
                        "start": 1140.277,
                        "end": 1140.698
                    },
                    {
                        "word": "Harris",
                        "start": 1140.738,
                        "end": 1141.158
                    },
                    {
                        "word": "and",
                        "start": 1141.359,
                        "end": 1141.459
                    },
                    {
                        "word": "Ellen",
                        "start": 1141.619,
                        "end": 1141.839
                    },
                    {
                        "word": "Glasgow,",
                        "start": 1141.879,
                        "end": 1142.46
                    },
                    {
                        "word": "depicted",
                        "start": 1143.041,
                        "end": 1143.502
                    },
                    {
                        "word": "life",
                        "start": 1143.582,
                        "end": 1143.822
                    },
                    {
                        "word": "in",
                        "start": 1143.942,
                        "end": 1144.003
                    },
                    {
                        "word": "the",
                        "start": 1144.043,
                        "end": 1144.123
                    },
                    {
                        "word": "South.",
                        "start": 1144.203,
                        "end": 1144.563
                    },
                    {
                        "word": "Hamlyn",
                        "start": 1145.064,
                        "end": 1145.505
                    },
                    {
                        "word": "Garland",
                        "start": 1145.545,
                        "end": 1145.966
                    },
                    {
                        "word": "described",
                        "start": 1146.186,
                        "end": 1146.687
                    },
                    {
                        "word": "life",
                        "start": 1146.787,
                        "end": 1147.027
                    },
                    {
                        "word": "on",
                        "start": 1147.207,
                        "end": 1147.267
                    },
                    {
                        "word": "the",
                        "start": 1147.308,
                        "end": 1147.388
                    },
                    {
                        "word": "Great",
                        "start": 1147.408,
                        "end": 1147.628
                    },
                    {
                        "word": "Plains,",
                        "start": 1147.708,
                        "end": 1148.129
                    },
                    {
                        "word": "and",
                        "start": 1148.73,
                        "end": 1148.83
                    },
                    {
                        "word": "Sarah",
                        "start": 1148.91,
                        "end": 1149.25
                    },
                    {
                        "word": "Orne",
                        "start": 1149.351,
                        "end": 1149.611
                    },
                    {
                        "word": "Jewett",
                        "start": 1149.651,
                        "end": 1150.012
                    },
                    {
                        "word": "wrote",
                        "start": 1150.452,
                        "end": 1150.673
                    },
                    {
                        "word": "about",
                        "start": 1150.733,
                        "end": 1150.973
                    },
                    {
                        "word": "everyday",
                        "start": 1151.113,
                        "end": 1151.474
                    },
                    {
                        "word": "life",
                        "start": 1151.534,
                        "end": 1151.774
                    },
                    {
                        "word": "in",
                        "start": 1151.934,
                        "end": 1152.015
                    },
                    {
                        "word": "rural",
                        "start": 1152.095,
                        "end": 1152.415
                    },
                    {
                        "word": "New",
                        "start": 1152.495,
                        "end": 1152.615
                    },
                    {
                        "word": "England.",
                        "start": 1152.696,
                        "end": 1153.677
                    },
                    {
                        "word": "Another",
                        "start": 1153.657,
                        "end": 1154.099
                    },
                    {
                        "word": "realist,",
                        "start": 1154.179,
                        "end": 1154.641
                    },
                    {
                        "word": "Brett",
                        "start": 1155.022,
                        "end": 1155.283
                    },
                    {
                        "word": "Hart,",
                        "start": 1155.323,
                        "end": 1155.684
                    },
                    {
                        "word": "achieved",
                        "start": 1156.206,
                        "end": 1156.588
                    },
                    {
                        "word": "fame",
                        "start": 1156.708,
                        "end": 1157.029
                    },
                    {
                        "word": "with",
                        "start": 1157.089,
                        "end": 1157.23
                    },
                    {
                        "word": "stories",
                        "start": 1157.25,
                        "end": 1157.792
                    },
                    {
                        "word": "that",
                        "start": 1157.812,
                        "end": 1157.993
                    },
                    {
                        "word": "portrayed",
                        "start": 1158.073,
                        "end": 1158.535
                    },
                    {
                        "word": "local",
                        "start": 1158.555,
                        "end": 1158.896
                    },
                    {
                        "word": "life",
                        "start": 1158.956,
                        "end": 1159.197
                    },
                    {
                        "word": "in",
                        "start": 1159.317,
                        "end": 1159.378
                    },
                    {
                        "word": "the",
                        "start": 1159.418,
                        "end": 1159.478
                    },
                    {
                        "word": "California",
                        "start": 1159.538,
                        "end": 1160.14
                    },
                    {
                        "word": "mining",
                        "start": 1160.181,
                        "end": 1160.522
                    },
                    {
                        "word": "camps.",
                        "start": 1160.562,
                        "end": 1161.726
                    }
                ]
            },
            {
                "text": "Samuel Clemens, who adopted the pen name Mark Twain, became the country's most outstanding realist author, observing life around him with a humorous and skeptical eye. In his stories and novels, Twain drew on his own experiences and used dialect and common speech instead of literary language, touching off a major change in American prose style.",
                "start": 1161.976,
                "end": 1187.713,
                "words": [
                    {
                        "word": "Samuel",
                        "start": 1161.976,
                        "end": 1162.537
                    },
                    {
                        "word": "Clemens,",
                        "start": 1162.597,
                        "end": 1163.058
                    },
                    {
                        "word": "who",
                        "start": 1163.498,
                        "end": 1163.618
                    },
                    {
                        "word": "adopted",
                        "start": 1163.678,
                        "end": 1164.119
                    },
                    {
                        "word": "the",
                        "start": 1164.179,
                        "end": 1164.259
                    },
                    {
                        "word": "pen",
                        "start": 1164.319,
                        "end": 1164.56
                    },
                    {
                        "word": "name,",
                        "start": 1164.62,
                        "end": 1164.9
                    },
                    {
                        "word": "Mark",
                        "start": 1165.141,
                        "end": 1165.421
                    },
                    {
                        "word": "Twain,",
                        "start": 1165.481,
                        "end": 1165.882
                    },
                    {
                        "word": "became",
                        "start": 1166.462,
                        "end": 1166.803
                    },
                    {
                        "word": "the",
                        "start": 1166.843,
                        "end": 1166.923
                    },
                    {
                        "word": "country's",
                        "start": 1166.983,
                        "end": 1167.424
                    },
                    {
                        "word": "most",
                        "start": 1167.524,
                        "end": 1167.784
                    },
                    {
                        "word": "outstanding",
                        "start": 1167.905,
                        "end": 1168.646
                    },
                    {
                        "word": "realist",
                        "start": 1168.666,
                        "end": 1169.106
                    },
                    {
                        "word": "author,",
                        "start": 1169.246,
                        "end": 1169.547
                    },
                    {
                        "word": "observing",
                        "start": 1170.188,
                        "end": 1170.588
                    },
                    {
                        "word": "life",
                        "start": 1170.628,
                        "end": 1170.869
                    },
                    {
                        "word": "around",
                        "start": 1170.949,
                        "end": 1171.269
                    },
                    {
                        "word": "him",
                        "start": 1171.349,
                        "end": 1171.53
                    },
                    {
                        "word": "with",
                        "start": 1171.59,
                        "end": 1171.73
                    },
                    {
                        "word": "a",
                        "start": 1171.77,
                        "end": 1171.79
                    },
                    {
                        "word": "humorous",
                        "start": 1171.87,
                        "end": 1172.391
                    },
                    {
                        "word": "and",
                        "start": 1172.511,
                        "end": 1172.591
                    },
                    {
                        "word": "skeptical",
                        "start": 1172.671,
                        "end": 1173.212
                    },
                    {
                        "word": "eye.",
                        "start": 1173.473,
                        "end": 1173.593
                    },
                    {
                        "word": "In",
                        "start": 1173.613,
                        "end": 1174.574
                    },
                    {
                        "word": "his",
                        "start": 1174.634,
                        "end": 1174.754
                    },
                    {
                        "word": "stories",
                        "start": 1174.814,
                        "end": 1175.255
                    },
                    {
                        "word": "and",
                        "start": 1175.335,
                        "end": 1175.415
                    },
                    {
                        "word": "novels,",
                        "start": 1175.475,
                        "end": 1175.916
                    },
                    {
                        "word": "Twain",
                        "start": 1176.196,
                        "end": 1176.577
                    },
                    {
                        "word": "drew",
                        "start": 1176.677,
                        "end": 1176.938
                    },
                    {
                        "word": "on",
                        "start": 1177.058,
                        "end": 1177.138
                    },
                    {
                        "word": "his",
                        "start": 1177.178,
                        "end": 1177.318
                    },
                    {
                        "word": "own",
                        "start": 1177.438,
                        "end": 1177.558
                    },
                    {
                        "word": "experiences,",
                        "start": 1177.639,
                        "end": 1178.42
                    },
                    {
                        "word": "and",
                        "start": 1179.021,
                        "end": 1179.101
                    },
                    {
                        "word": "used",
                        "start": 1179.261,
                        "end": 1179.501
                    },
                    {
                        "word": "dialect",
                        "start": 1179.742,
                        "end": 1180.302
                    },
                    {
                        "word": "and",
                        "start": 1180.463,
                        "end": 1180.563
                    },
                    {
                        "word": "common",
                        "start": 1180.663,
                        "end": 1181.003
                    },
                    {
                        "word": "speech",
                        "start": 1181.043,
                        "end": 1181.484
                    },
                    {
                        "word": "instead",
                        "start": 1181.504,
                        "end": 1182.265
                    },
                    {
                        "word": "of",
                        "start": 1182.325,
                        "end": 1182.365
                    },
                    {
                        "word": "literary",
                        "start": 1182.385,
                        "end": 1182.866
                    },
                    {
                        "word": "language,",
                        "start": 1182.926,
                        "end": 1183.387
                    },
                    {
                        "word": "touching",
                        "start": 1183.888,
                        "end": 1184.208
                    },
                    {
                        "word": "off",
                        "start": 1184.308,
                        "end": 1184.448
                    },
                    {
                        "word": "a",
                        "start": 1184.569,
                        "end": 1184.609
                    },
                    {
                        "word": "major",
                        "start": 1184.669,
                        "end": 1185.089
                    },
                    {
                        "word": "change",
                        "start": 1185.149,
                        "end": 1185.55
                    },
                    {
                        "word": "in",
                        "start": 1185.65,
                        "end": 1185.71
                    },
                    {
                        "word": "American",
                        "start": 1185.77,
                        "end": 1186.231
                    },
                    {
                        "word": "prose",
                        "start": 1186.291,
                        "end": 1186.571
                    },
                    {
                        "word": "style.",
                        "start": 1186.591,
                        "end": 1187.713
                    },
                    {
                        "word": "Other",
                        "start": 1187.693,
                        "end": 1188.074
                    }
                ]
            },
            {
                "text": "Other writers became impatient even with realism. Pushing evolutionary theory to its limits, they wrote of a world in which a cruel and merciless environment determined human fate. These writers, called naturalists, often focused on economic hardship, studying people struggling with poverty, and other aspects of urban and industrial life. Naturalists brought to their writing a passion for direct and honest experience.",
                "start": 1187.693,
                "end": 1217.312,
                "words": [
                    {
                        "word": "style.",
                        "start": 1186.591,
                        "end": 1187.713
                    },
                    {
                        "word": "Other",
                        "start": 1187.693,
                        "end": 1188.074
                    },
                    {
                        "word": "writers",
                        "start": 1188.134,
                        "end": 1188.454
                    },
                    {
                        "word": "became",
                        "start": 1188.554,
                        "end": 1188.915
                    },
                    {
                        "word": "impatient",
                        "start": 1189.055,
                        "end": 1189.656
                    },
                    {
                        "word": "even",
                        "start": 1189.896,
                        "end": 1190.136
                    },
                    {
                        "word": "with",
                        "start": 1190.176,
                        "end": 1190.417
                    },
                    {
                        "word": "realism.",
                        "start": 1190.497,
                        "end": 1190.977
                    },
                    {
                        "word": "Pushing",
                        "start": 1191.698,
                        "end": 1192.019
                    },
                    {
                        "word": "evolutionary",
                        "start": 1192.119,
                        "end": 1192.74
                    },
                    {
                        "word": "theory",
                        "start": 1192.82,
                        "end": 1193.12
                    },
                    {
                        "word": "to",
                        "start": 1193.16,
                        "end": 1193.3
                    },
                    {
                        "word": "its",
                        "start": 1193.38,
                        "end": 1193.481
                    },
                    {
                        "word": "limits,",
                        "start": 1193.581,
                        "end": 1193.921
                    },
                    {
                        "word": "they",
                        "start": 1194.382,
                        "end": 1194.502
                    },
                    {
                        "word": "wrote",
                        "start": 1194.562,
                        "end": 1194.802
                    },
                    {
                        "word": "of",
                        "start": 1194.842,
                        "end": 1195.003
                    },
                    {
                        "word": "a",
                        "start": 1195.083,
                        "end": 1195.103
                    },
                    {
                        "word": "world",
                        "start": 1195.163,
                        "end": 1195.483
                    },
                    {
                        "word": "in",
                        "start": 1195.563,
                        "end": 1195.603
                    },
                    {
                        "word": "which",
                        "start": 1195.684,
                        "end": 1195.884
                    },
                    {
                        "word": "a",
                        "start": 1195.904,
                        "end": 1195.924
                    },
                    {
                        "word": "cruel",
                        "start": 1196.164,
                        "end": 1196.565
                    },
                    {
                        "word": "and",
                        "start": 1196.665,
                        "end": 1196.725
                    },
                    {
                        "word": "merciless",
                        "start": 1196.765,
                        "end": 1197.286
                    },
                    {
                        "word": "environment",
                        "start": 1197.386,
                        "end": 1197.967
                    },
                    {
                        "word": "determined",
                        "start": 1198.327,
                        "end": 1198.848
                    },
                    {
                        "word": "human",
                        "start": 1198.928,
                        "end": 1199.248
                    },
                    {
                        "word": "fate.",
                        "start": 1199.328,
                        "end": 1199.649
                    },
                    {
                        "word": "These",
                        "start": 1200.41,
                        "end": 1200.61
                    },
                    {
                        "word": "writers,",
                        "start": 1200.69,
                        "end": 1201.091
                    },
                    {
                        "word": "called",
                        "start": 1201.351,
                        "end": 1201.631
                    },
                    {
                        "word": "Naturalists,",
                        "start": 1201.651,
                        "end": 1202.492
                    },
                    {
                        "word": "often",
                        "start": 1203.193,
                        "end": 1203.474
                    },
                    {
                        "word": "focused",
                        "start": 1203.534,
                        "end": 1203.954
                    },
                    {
                        "word": "on",
                        "start": 1204.075,
                        "end": 1204.135
                    },
                    {
                        "word": "economic",
                        "start": 1204.175,
                        "end": 1204.755
                    },
                    {
                        "word": "hardship,",
                        "start": 1204.816,
                        "end": 1205.316
                    },
                    {
                        "word": "studying",
                        "start": 1205.777,
                        "end": 1206.237
                    },
                    {
                        "word": "people",
                        "start": 1206.318,
                        "end": 1206.658
                    },
                    {
                        "word": "struggling",
                        "start": 1206.718,
                        "end": 1207.159
                    },
                    {
                        "word": "with",
                        "start": 1207.219,
                        "end": 1207.319
                    },
                    {
                        "word": "poverty,",
                        "start": 1207.379,
                        "end": 1207.86
                    },
                    {
                        "word": "and",
                        "start": 1208.42,
                        "end": 1208.52
                    },
                    {
                        "word": "other",
                        "start": 1208.641,
                        "end": 1208.841
                    },
                    {
                        "word": "aspects",
                        "start": 1209.001,
                        "end": 1209.442
                    },
                    {
                        "word": "of",
                        "start": 1209.462,
                        "end": 1209.622
                    },
                    {
                        "word": "urban",
                        "start": 1209.662,
                        "end": 1210.123
                    },
                    {
                        "word": "and",
                        "start": 1210.283,
                        "end": 1210.363
                    },
                    {
                        "word": "industrial",
                        "start": 1210.483,
                        "end": 1211.044
                    },
                    {
                        "word": "life.",
                        "start": 1211.104,
                        "end": 1211.404
                    },
                    {
                        "word": "Naturalists",
                        "start": 1212.305,
                        "end": 1212.946
                    },
                    {
                        "word": "brought",
                        "start": 1213.147,
                        "end": 1213.407
                    },
                    {
                        "word": "to",
                        "start": 1213.487,
                        "end": 1213.587
                    },
                    {
                        "word": "their",
                        "start": 1213.627,
                        "end": 1213.767
                    },
                    {
                        "word": "writing",
                        "start": 1213.827,
                        "end": 1214.168
                    },
                    {
                        "word": "a",
                        "start": 1214.288,
                        "end": 1214.328
                    },
                    {
                        "word": "passion",
                        "start": 1214.408,
                        "end": 1214.889
                    },
                    {
                        "word": "for",
                        "start": 1214.989,
                        "end": 1215.129
                    },
                    {
                        "word": "direct",
                        "start": 1215.189,
                        "end": 1215.61
                    },
                    {
                        "word": "and",
                        "start": 1215.77,
                        "end": 1215.85
                    },
                    {
                        "word": "honest",
                        "start": 1215.99,
                        "end": 1216.411
                    },
                    {
                        "word": "experience.",
                        "start": 1216.531,
                        "end": 1217.312
                    }
                ]
            },
            {
                "text": "Theodore Dreiser, the foremost naturalist writer, in novels such as *Sister Carrie*, grimly portrayed a dark world in which human beings were tossed about by forces beyond their understanding or control. Dreiser thought that writers should tell the truth about human affairs, not fabricate romance, and *Sister Carrie*, he said, was not intended as a piece of literary craftsmanship, but was a picture of conditions.",
                "start": 1218.541,
                "end": 1248.292,
                "words": [
                    {
                        "word": "Theodore",
                        "start": 1218.541,
                        "end": 1219.022
                    },
                    {
                        "word": "Dreiser,",
                        "start": 1219.082,
                        "end": 1219.583
                    },
                    {
                        "word": "the",
                        "start": 1219.643,
                        "end": 1220.064
                    },
                    {
                        "word": "foremost",
                        "start": 1220.105,
                        "end": 1220.626
                    },
                    {
                        "word": "naturalist",
                        "start": 1220.806,
                        "end": 1221.407
                    },
                    {
                        "word": "writer,",
                        "start": 1221.468,
                        "end": 1221.828
                    },
                    {
                        "word": "in",
                        "start": 1222.309,
                        "end": 1222.37
                    },
                    {
                        "word": "novels",
                        "start": 1222.45,
                        "end": 1222.871
                    },
                    {
                        "word": "such",
                        "start": 1222.971,
                        "end": 1223.191
                    },
                    {
                        "word": "as",
                        "start": 1223.312,
                        "end": 1223.412
                    },
                    {
                        "word": "Sister",
                        "start": 1223.432,
                        "end": 1223.993
                    },
                    {
                        "word": "Carrie,",
                        "start": 1224.053,
                        "end": 1224.474
                    },
                    {
                        "word": "grimly",
                        "start": 1225.076,
                        "end": 1225.457
                    },
                    {
                        "word": "portrayed",
                        "start": 1225.537,
                        "end": 1226.038
                    },
                    {
                        "word": "a",
                        "start": 1226.058,
                        "end": 1226.078
                    },
                    {
                        "word": "dark",
                        "start": 1226.298,
                        "end": 1226.599
                    },
                    {
                        "word": "world",
                        "start": 1226.679,
                        "end": 1227.02
                    },
                    {
                        "word": "in",
                        "start": 1227.06,
                        "end": 1227.261
                    },
                    {
                        "word": "which",
                        "start": 1227.301,
                        "end": 1227.481
                    },
                    {
                        "word": "human",
                        "start": 1227.561,
                        "end": 1227.862
                    },
                    {
                        "word": "beings",
                        "start": 1227.922,
                        "end": 1228.283
                    },
                    {
                        "word": "were",
                        "start": 1228.343,
                        "end": 1228.503
                    },
                    {
                        "word": "tossed",
                        "start": 1228.604,
                        "end": 1228.984
                    },
                    {
                        "word": "about",
                        "start": 1229.045,
                        "end": 1229.345
                    },
                    {
                        "word": "by",
                        "start": 1229.385,
                        "end": 1229.927
                    },
                    {
                        "word": "forces",
                        "start": 1229.947,
                        "end": 1230.468
                    },
                    {
                        "word": "beyond",
                        "start": 1230.508,
                        "end": 1230.949
                    },
                    {
                        "word": "their",
                        "start": 1230.989,
                        "end": 1231.229
                    },
                    {
                        "word": "understanding",
                        "start": 1231.33,
                        "end": 1232.051
                    },
                    {
                        "word": "or",
                        "start": 1232.272,
                        "end": 1232.352
                    },
                    {
                        "word": "control.",
                        "start": 1232.412,
                        "end": 1233.715
                    },
                    {
                        "word": "Dreiser",
                        "start": 1233.695,
                        "end": 1234.396
                    },
                    {
                        "word": "thought",
                        "start": 1234.456,
                        "end": 1234.796
                    },
                    {
                        "word": "that",
                        "start": 1234.936,
                        "end": 1235.077
                    },
                    {
                        "word": "writers",
                        "start": 1235.197,
                        "end": 1235.617
                    },
                    {
                        "word": "should",
                        "start": 1235.657,
                        "end": 1236.018
                    },
                    {
                        "word": "tell",
                        "start": 1236.078,
                        "end": 1236.278
                    },
                    {
                        "word": "the",
                        "start": 1236.298,
                        "end": 1236.418
                    },
                    {
                        "word": "truth",
                        "start": 1236.498,
                        "end": 1236.839
                    },
                    {
                        "word": "about",
                        "start": 1236.979,
                        "end": 1237.199
                    },
                    {
                        "word": "human",
                        "start": 1237.259,
                        "end": 1237.54
                    },
                    {
                        "word": "affairs,",
                        "start": 1237.58,
                        "end": 1238.02
                    },
                    {
                        "word": "not",
                        "start": 1238.581,
                        "end": 1238.761
                    },
                    {
                        "word": "fabricate",
                        "start": 1238.781,
                        "end": 1239.462
                    },
                    {
                        "word": "romance,",
                        "start": 1239.502,
                        "end": 1240.062
                    },
                    {
                        "word": "and",
                        "start": 1240.663,
                        "end": 1240.723
                    },
                    {
                        "word": "Sister",
                        "start": 1240.803,
                        "end": 1241.144
                    },
                    {
                        "word": "Carrie,",
                        "start": 1241.204,
                        "end": 1241.604
                    },
                    {
                        "word": "he",
                        "start": 1241.664,
                        "end": 1241.764
                    },
                    {
                        "word": "said,",
                        "start": 1241.865,
                        "end": 1242.105
                    },
                    {
                        "word": "was",
                        "start": 1242.545,
                        "end": 1242.686
                    },
                    {
                        "word": "not",
                        "start": 1242.766,
                        "end": 1242.926
                    },
                    {
                        "word": "intended",
                        "start": 1243.046,
                        "end": 1243.547
                    },
                    {
                        "word": "as",
                        "start": 1243.567,
                        "end": 1243.847
                    },
                    {
                        "word": "a",
                        "start": 1243.867,
                        "end": 1243.887
                    },
                    {
                        "word": "piece",
                        "start": 1244.007,
                        "end": 1244.307
                    },
                    {
                        "word": "of",
                        "start": 1244.408,
                        "end": 1244.468
                    },
                    {
                        "word": "literary",
                        "start": 1244.508,
                        "end": 1245.068
                    },
                    {
                        "word": "craftsmanship,",
                        "start": 1245.168,
                        "end": 1246.009
                    },
                    {
                        "word": "but",
                        "start": 1246.43,
                        "end": 1246.55
                    },
                    {
                        "word": "was",
                        "start": 1246.61,
                        "end": 1246.73
                    },
                    {
                        "word": "a",
                        "start": 1246.81,
                        "end": 1246.83
                    },
                    {
                        "word": "picture",
                        "start": 1246.911,
                        "end": 1247.331
                    },
                    {
                        "word": "of",
                        "start": 1247.551,
                        "end": 1247.611
                    },
                    {
                        "word": "conditions.",
                        "start": 1247.691,
                        "end": 1248.292
                    }
                ]
            }
        ]
    },
    {
        "id": "recording_3",
        "title": "Recording Three",
        "audio_source": "2015.06_cet6_1.mp3",
        "full_audio_range": {
            "start": 1333.223,
            "end": 1468.952
        },
        "sentences": [
            {
                "text": "Well, when a species is no longer adapted to a changed environment, it may perish. The exact causes of a species' death vary from situation to situation. Rapid ecological change may render an environment hostile to a species. For example, temperatures may change and a species may not be able to adapt. Food resources may be affected by environmental changes, which will then cause problems for a species requiring these resources. Other species may become better adapted to an environment, resulting in competition and, ultimately, in the death of a species.",
                "start": 1333.223,
                "end": 1372.172,
                "words": [
                    {
                        "word": "Well,",
                        "start": 1333.223,
                        "end": 1333.644
                    },
                    {
                        "word": "when",
                        "start": 1333.844,
                        "end": 1333.984
                    },
                    {
                        "word": "a",
                        "start": 1334.024,
                        "end": 1334.065
                    },
                    {
                        "word": "species",
                        "start": 1334.145,
                        "end": 1334.766
                    },
                    {
                        "word": "is",
                        "start": 1334.806,
                        "end": 1335.006
                    },
                    {
                        "word": "no",
                        "start": 1335.066,
                        "end": 1335.187
                    },
                    {
                        "word": "longer",
                        "start": 1335.247,
                        "end": 1335.567
                    },
                    {
                        "word": "adapted",
                        "start": 1335.647,
                        "end": 1336.108
                    },
                    {
                        "word": "to",
                        "start": 1336.148,
                        "end": 1336.249
                    },
                    {
                        "word": "a",
                        "start": 1336.329,
                        "end": 1336.349
                    },
                    {
                        "word": "changed",
                        "start": 1336.429,
                        "end": 1336.81
                    },
                    {
                        "word": "environment,",
                        "start": 1336.93,
                        "end": 1337.631
                    },
                    {
                        "word": "it",
                        "start": 1337.851,
                        "end": 1337.912
                    },
                    {
                        "word": "may",
                        "start": 1337.972,
                        "end": 1338.112
                    },
                    {
                        "word": "perish.",
                        "start": 1338.212,
                        "end": 1338.673
                    },
                    {
                        "word": "The",
                        "start": 1339.194,
                        "end": 1339.314
                    },
                    {
                        "word": "exact",
                        "start": 1339.414,
                        "end": 1339.815
                    },
                    {
                        "word": "causes",
                        "start": 1339.935,
                        "end": 1340.376
                    },
                    {
                        "word": "of",
                        "start": 1340.456,
                        "end": 1340.496
                    },
                    {
                        "word": "a",
                        "start": 1340.536,
                        "end": 1340.576
                    },
                    {
                        "word": "species'",
                        "start": 1340.637,
                        "end": 1341.117
                    },
                    {
                        "word": "death",
                        "start": 1341.178,
                        "end": 1341.438
                    },
                    {
                        "word": "vary",
                        "start": 1341.558,
                        "end": 1341.899
                    },
                    {
                        "word": "from",
                        "start": 1341.959,
                        "end": 1342.079
                    },
                    {
                        "word": "situation",
                        "start": 1342.119,
                        "end": 1342.781
                    },
                    {
                        "word": "to",
                        "start": 1342.841,
                        "end": 1342.961
                    },
                    {
                        "word": "situation.",
                        "start": 1343.041,
                        "end": 1343.722
                    },
                    {
                        "word": "Rapid",
                        "start": 1344.183,
                        "end": 1344.524
                    },
                    {
                        "word": "ecological",
                        "start": 1344.544,
                        "end": 1345.285
                    },
                    {
                        "word": "change",
                        "start": 1345.385,
                        "end": 1345.746
                    },
                    {
                        "word": "may",
                        "start": 1345.826,
                        "end": 1345.966
                    },
                    {
                        "word": "render",
                        "start": 1346.067,
                        "end": 1346.367
                    },
                    {
                        "word": "an",
                        "start": 1346.487,
                        "end": 1346.547
                    },
                    {
                        "word": "environment",
                        "start": 1346.628,
                        "end": 1347.229
                    },
                    {
                        "word": "hostile",
                        "start": 1347.389,
                        "end": 1347.97
                    },
                    {
                        "word": "to",
                        "start": 1348.03,
                        "end": 1348.15
                    },
                    {
                        "word": "a",
                        "start": 1348.19,
                        "end": 1348.251
                    },
                    {
                        "word": "species.",
                        "start": 1348.311,
                        "end": 1348.832
                    },
                    {
                        "word": "For",
                        "start": 1349.413,
                        "end": 1349.593
                    },
                    {
                        "word": "example,",
                        "start": 1349.693,
                        "end": 1350.154
                    },
                    {
                        "word": "temperatures",
                        "start": 1350.635,
                        "end": 1351.216
                    },
                    {
                        "word": "may",
                        "start": 1351.296,
                        "end": 1351.436
                    },
                    {
                        "word": "change",
                        "start": 1351.537,
                        "end": 1351.937
                    },
                    {
                        "word": "and",
                        "start": 1352.098,
                        "end": 1352.178
                    },
                    {
                        "word": "a",
                        "start": 1352.218,
                        "end": 1352.238
                    },
                    {
                        "word": "species",
                        "start": 1352.298,
                        "end": 1352.779
                    },
                    {
                        "word": "may",
                        "start": 1352.859,
                        "end": 1352.999
                    },
                    {
                        "word": "not",
                        "start": 1353.079,
                        "end": 1353.26
                    },
                    {
                        "word": "be",
                        "start": 1353.32,
                        "end": 1353.44
                    },
                    {
                        "word": "able",
                        "start": 1353.56,
                        "end": 1353.761
                    },
                    {
                        "word": "to",
                        "start": 1353.821,
                        "end": 1353.941
                    },
                    {
                        "word": "adapt.",
                        "start": 1354.041,
                        "end": 1355.063
                    },
                    {
                        "word": "Food",
                        "start": 1355.262,
                        "end": 1355.663
                    },
                    {
                        "word": "resources",
                        "start": 1355.703,
                        "end": 1356.384
                    },
                    {
                        "word": "may",
                        "start": 1356.464,
                        "end": 1356.604
                    },
                    {
                        "word": "be",
                        "start": 1356.644,
                        "end": 1356.725
                    },
                    {
                        "word": "affected",
                        "start": 1356.785,
                        "end": 1357.185
                    },
                    {
                        "word": "by",
                        "start": 1357.246,
                        "end": 1357.386
                    },
                    {
                        "word": "environmental",
                        "start": 1357.426,
                        "end": 1358.368
                    },
                    {
                        "word": "changes,",
                        "start": 1358.428,
                        "end": 1358.868
                    },
                    {
                        "word": "which",
                        "start": 1359.409,
                        "end": 1359.59
                    },
                    {
                        "word": "will",
                        "start": 1359.63,
                        "end": 1359.79
                    },
                    {
                        "word": "then",
                        "start": 1359.83,
                        "end": 1360.01
                    },
                    {
                        "word": "cause",
                        "start": 1360.111,
                        "end": 1360.391
                    },
                    {
                        "word": "problems",
                        "start": 1360.411,
                        "end": 1360.972
                    },
                    {
                        "word": "for",
                        "start": 1361.052,
                        "end": 1361.172
                    },
                    {
                        "word": "a",
                        "start": 1361.233,
                        "end": 1361.273
                    },
                    {
                        "word": "species",
                        "start": 1361.333,
                        "end": 1361.854
                    },
                    {
                        "word": "requiring",
                        "start": 1361.934,
                        "end": 1362.515
                    },
                    {
                        "word": "these",
                        "start": 1362.595,
                        "end": 1362.835
                    },
                    {
                        "word": "resources.",
                        "start": 1362.896,
                        "end": 1363.617
                    },
                    {
                        "word": "Other",
                        "start": 1364.498,
                        "end": 1364.699
                    },
                    {
                        "word": "species",
                        "start": 1364.779,
                        "end": 1365.28
                    },
                    {
                        "word": "may",
                        "start": 1365.34,
                        "end": 1365.46
                    },
                    {
                        "word": "become",
                        "start": 1365.5,
                        "end": 1365.821
                    },
                    {
                        "word": "better",
                        "start": 1365.861,
                        "end": 1366.121
                    },
                    {
                        "word": "adapted",
                        "start": 1366.201,
                        "end": 1366.642
                    },
                    {
                        "word": "to",
                        "start": 1366.682,
                        "end": 1366.803
                    },
                    {
                        "word": "an",
                        "start": 1366.863,
                        "end": 1366.903
                    },
                    {
                        "word": "environment,",
                        "start": 1366.983,
                        "end": 1367.584
                    },
                    {
                        "word": "resulting",
                        "start": 1368.065,
                        "end": 1368.646
                    },
                    {
                        "word": "in",
                        "start": 1368.726,
                        "end": 1368.786
                    },
                    {
                        "word": "competition",
                        "start": 1368.886,
                        "end": 1369.628
                    },
                    {
                        "word": "and",
                        "start": 1369.748,
                        "end": 1369.848
                    },
                    {
                        "word": "ultimately",
                        "start": 1370.028,
                        "end": 1370.589
                    },
                    {
                        "word": "in",
                        "start": 1370.609,
                        "end": 1370.89
                    },
                    {
                        "word": "the",
                        "start": 1370.95,
                        "end": 1371.03
                    },
                    {
                        "word": "death",
                        "start": 1371.09,
                        "end": 1371.331
                    },
                    {
                        "word": "of",
                        "start": 1371.391,
                        "end": 1371.431
                    },
                    {
                        "word": "a",
                        "start": 1371.451,
                        "end": 1371.471
                    },
                    {
                        "word": "species.",
                        "start": 1371.611,
                        "end": 1372.172
                    }
                ]
            },
            {
                "text": "The fossil record reveals that extinction has occurred throughout the history of Earth. Recent analyses have also revealed that on some occasions many species become extinct at the same time—a mass extinction. One of the best-known examples of mass extinction occurred 65 million years ago with the demise of dinosaurs and many other forms of life. Perhaps the largest mass extinction was the one that occurred 225 million years ago, when approximately 95 percent of all species died. Mass extinctions can be caused by a relatively rapid change in the environment and can be worsened by the close interrelationship of many species.",
                "start": 1372.212,
                "end": 1421.415,
                "words": [
                    {
                        "word": "The",
                        "start": 1372.212,
                        "end": 1373.635
                    },
                    {
                        "word": "fossil",
                        "start": 1373.715,
                        "end": 1374.156
                    },
                    {
                        "word": "record",
                        "start": 1374.256,
                        "end": 1374.576
                    },
                    {
                        "word": "reveals",
                        "start": 1374.636,
                        "end": 1375.157
                    },
                    {
                        "word": "that",
                        "start": 1375.177,
                        "end": 1375.378
                    },
                    {
                        "word": "extinction",
                        "start": 1375.458,
                        "end": 1376.019
                    },
                    {
                        "word": "has",
                        "start": 1376.059,
                        "end": 1376.219
                    },
                    {
                        "word": "occurred",
                        "start": 1376.239,
                        "end": 1376.78
                    },
                    {
                        "word": "throughout",
                        "start": 1376.981,
                        "end": 1377.341
                    },
                    {
                        "word": "the",
                        "start": 1377.381,
                        "end": 1377.481
                    },
                    {
                        "word": "history",
                        "start": 1377.542,
                        "end": 1378.002
                    },
                    {
                        "word": "of",
                        "start": 1378.123,
                        "end": 1378.163
                    },
                    {
                        "word": "Earth.",
                        "start": 1378.203,
                        "end": 1378.924
                    },
                    {
                        "word": "Recent",
                        "start": 1379.512,
                        "end": 1379.994
                    },
                    {
                        "word": "analyses",
                        "start": 1380.094,
                        "end": 1380.817
                    },
                    {
                        "word": "have",
                        "start": 1380.857,
                        "end": 1381.078
                    },
                    {
                        "word": "also",
                        "start": 1381.178,
                        "end": 1381.459
                    },
                    {
                        "word": "revealed",
                        "start": 1381.539,
                        "end": 1381.981
                    },
                    {
                        "word": "that",
                        "start": 1382.041,
                        "end": 1382.202
                    },
                    {
                        "word": "on",
                        "start": 1382.342,
                        "end": 1382.402
                    },
                    {
                        "word": "some",
                        "start": 1382.483,
                        "end": 1382.683
                    },
                    {
                        "word": "occasions",
                        "start": 1382.744,
                        "end": 1383.386
                    },
                    {
                        "word": "many",
                        "start": 1383.787,
                        "end": 1384.008
                    },
                    {
                        "word": "species",
                        "start": 1384.108,
                        "end": 1384.67
                    },
                    {
                        "word": "become",
                        "start": 1384.751,
                        "end": 1385.032
                    },
                    {
                        "word": "extinct",
                        "start": 1385.112,
                        "end": 1385.554
                    },
                    {
                        "word": "at",
                        "start": 1385.734,
                        "end": 1385.774
                    },
                    {
                        "word": "the",
                        "start": 1385.814,
                        "end": 1385.915
                    },
                    {
                        "word": "same",
                        "start": 1385.975,
                        "end": 1386.216
                    },
                    {
                        "word": "time,",
                        "start": 1386.316,
                        "end": 1386.657
                    },
                    {
                        "word": "a",
                        "start": 1387.219,
                        "end": 1387.26
                    },
                    {
                        "word": "mass",
                        "start": 1387.36,
                        "end": 1387.761
                    },
                    {
                        "word": "extinction.",
                        "start": 1387.802,
                        "end": 1389.066
                    },
                    {
                        "word": "One",
                        "start": 1389.367,
                        "end": 1389.587
                    },
                    {
                        "word": "of",
                        "start": 1389.627,
                        "end": 1389.687
                    },
                    {
                        "word": "the",
                        "start": 1389.707,
                        "end": 1389.808
                    },
                    {
                        "word": "best",
                        "start": 1389.848,
                        "end": 1390.048
                    },
                    {
                        "word": "known",
                        "start": 1390.108,
                        "end": 1390.308
                    },
                    {
                        "word": "examples",
                        "start": 1390.368,
                        "end": 1390.869
                    },
                    {
                        "word": "of",
                        "start": 1390.949,
                        "end": 1390.989
                    },
                    {
                        "word": "mass",
                        "start": 1391.029,
                        "end": 1391.41
                    },
                    {
                        "word": "extinction",
                        "start": 1391.49,
                        "end": 1392.031
                    },
                    {
                        "word": "occurred",
                        "start": 1392.151,
                        "end": 1392.591
                    },
                    {
                        "word": "65",
                        "start": 1392.611,
                        "end": 1392.652
                    },
                    {
                        "word": "million",
                        "start": 1393.513,
                        "end": 1393.833
                    },
                    {
                        "word": "years",
                        "start": 1393.873,
                        "end": 1394.154
                    },
                    {
                        "word": "ago",
                        "start": 1394.234,
                        "end": 1394.514
                    },
                    {
                        "word": "with",
                        "start": 1394.534,
                        "end": 1395.195
                    },
                    {
                        "word": "the",
                        "start": 1395.235,
                        "end": 1395.315
                    },
                    {
                        "word": "demise",
                        "start": 1395.355,
                        "end": 1395.876
                    },
                    {
                        "word": "of",
                        "start": 1395.976,
                        "end": 1396.016
                    },
                    {
                        "word": "dinosaurs",
                        "start": 1396.036,
                        "end": 1396.837
                    },
                    {
                        "word": "and",
                        "start": 1396.877,
                        "end": 1397.358
                    },
                    {
                        "word": "many",
                        "start": 1397.398,
                        "end": 1397.698
                    },
                    {
                        "word": "other",
                        "start": 1397.779,
                        "end": 1397.959
                    },
                    {
                        "word": "forms",
                        "start": 1398.039,
                        "end": 1398.379
                    },
                    {
                        "word": "of",
                        "start": 1398.459,
                        "end": 1398.52
                    },
                    {
                        "word": "life.",
                        "start": 1398.6,
                        "end": 1398.86
                    },
                    {
                        "word": "Perhaps",
                        "start": 1399.641,
                        "end": 1400.122
                    },
                    {
                        "word": "the",
                        "start": 1400.202,
                        "end": 1400.302
                    },
                    {
                        "word": "largest",
                        "start": 1400.362,
                        "end": 1400.823
                    },
                    {
                        "word": "mass",
                        "start": 1400.923,
                        "end": 1401.223
                    },
                    {
                        "word": "extinction",
                        "start": 1401.303,
                        "end": 1401.924
                    },
                    {
                        "word": "was",
                        "start": 1402.104,
                        "end": 1402.245
                    },
                    {
                        "word": "the",
                        "start": 1402.305,
                        "end": 1402.385
                    },
                    {
                        "word": "one",
                        "start": 1402.525,
                        "end": 1402.625
                    },
                    {
                        "word": "that",
                        "start": 1402.665,
                        "end": 1402.805
                    },
                    {
                        "word": "occurred",
                        "start": 1402.906,
                        "end": 1403.366
                    },
                    {
                        "word": "225",
                        "start": 1403.386,
                        "end": 1403.907
                    },
                    {
                        "word": "million",
                        "start": 1405.189,
                        "end": 1405.529
                    },
                    {
                        "word": "years",
                        "start": 1405.569,
                        "end": 1405.83
                    },
                    {
                        "word": "ago,",
                        "start": 1405.93,
                        "end": 1406.17
                    },
                    {
                        "word": "when",
                        "start": 1406.21,
                        "end": 1406.891
                    },
                    {
                        "word": "approximately",
                        "start": 1406.951,
                        "end": 1407.712
                    },
                    {
                        "word": "95%",
                        "start": 1407.732,
                        "end": 1408.193
                    },
                    {
                        "word": "of",
                        "start": 1408.874,
                        "end": 1409.074
                    },
                    {
                        "word": "all",
                        "start": 1409.094,
                        "end": 1409.334
                    },
                    {
                        "word": "species",
                        "start": 1409.374,
                        "end": 1410.035
                    },
                    {
                        "word": "died.",
                        "start": 1410.075,
                        "end": 1411.257
                    },
                    {
                        "word": "Mass",
                        "start": 1411.237,
                        "end": 1411.679
                    },
                    {
                        "word": "extinctions",
                        "start": 1411.759,
                        "end": 1412.381
                    },
                    {
                        "word": "can",
                        "start": 1412.421,
                        "end": 1412.582
                    },
                    {
                        "word": "be",
                        "start": 1412.622,
                        "end": 1412.723
                    },
                    {
                        "word": "caused",
                        "start": 1412.763,
                        "end": 1413.124
                    },
                    {
                        "word": "by",
                        "start": 1413.204,
                        "end": 1413.325
                    },
                    {
                        "word": "a",
                        "start": 1413.345,
                        "end": 1413.365
                    },
                    {
                        "word": "relatively",
                        "start": 1413.505,
                        "end": 1414.068
                    },
                    {
                        "word": "rapid",
                        "start": 1414.108,
                        "end": 1414.529
                    },
                    {
                        "word": "change",
                        "start": 1414.59,
                        "end": 1414.951
                    },
                    {
                        "word": "in",
                        "start": 1415.051,
                        "end": 1415.132
                    },
                    {
                        "word": "the",
                        "start": 1415.172,
                        "end": 1415.252
                    },
                    {
                        "word": "environment",
                        "start": 1415.332,
                        "end": 1415.995
                    },
                    {
                        "word": "and",
                        "start": 1416.557,
                        "end": 1416.637
                    },
                    {
                        "word": "can",
                        "start": 1416.718,
                        "end": 1416.918
                    },
                    {
                        "word": "be",
                        "start": 1416.978,
                        "end": 1417.099
                    },
                    {
                        "word": "worsened",
                        "start": 1417.179,
                        "end": 1417.701
                    },
                    {
                        "word": "by",
                        "start": 1417.721,
                        "end": 1418.002
                    },
                    {
                        "word": "the",
                        "start": 1418.042,
                        "end": 1418.143
                    },
                    {
                        "word": "close",
                        "start": 1418.183,
                        "end": 1418.504
                    },
                    {
                        "word": "interrelationship",
                        "start": 1418.645,
                        "end": 1419.608
                    },
                    {
                        "word": "of",
                        "start": 1419.709,
                        "end": 1419.769
                    },
                    {
                        "word": "many",
                        "start": 1419.809,
                        "end": 1420.11
                    },
                    {
                        "word": "species.",
                        "start": 1420.211,
                        "end": 1421.415
                    }
                ]
            },
            {
                "text": "One interesting and controversial finding is that extinctions during the past 250 million years have tended to be more intense every 26 million years. This periodic extinction might be due to intersection of the Earth's orbit with a cloud of comets, but this theory is purely speculative. Some researchers have also speculated that extinction may be random. That is, certain species may be eliminated and others may survive for no particular reason. A species' survival may have nothing to do with its ability or inability to adapt. If so, some of evolutionary history may reflect a sequence of essentially random events.",
                "start": 1421.699,
                "end": 1468.952,
                "words": [
                    {
                        "word": "One",
                        "start": 1421.699,
                        "end": 1422.0
                    },
                    {
                        "word": "interesting",
                        "start": 1422.22,
                        "end": 1422.781
                    },
                    {
                        "word": "and",
                        "start": 1422.901,
                        "end": 1422.981
                    },
                    {
                        "word": "controversial",
                        "start": 1423.062,
                        "end": 1423.823
                    },
                    {
                        "word": "finding",
                        "start": 1423.903,
                        "end": 1424.324
                    },
                    {
                        "word": "is",
                        "start": 1424.765,
                        "end": 1424.845
                    },
                    {
                        "word": "that",
                        "start": 1424.905,
                        "end": 1425.066
                    },
                    {
                        "word": "extinctions",
                        "start": 1425.106,
                        "end": 1425.947
                    },
                    {
                        "word": "during",
                        "start": 1426.007,
                        "end": 1426.268
                    },
                    {
                        "word": "the",
                        "start": 1426.308,
                        "end": 1426.388
                    },
                    {
                        "word": "past",
                        "start": 1426.448,
                        "end": 1426.769
                    },
                    {
                        "word": "250",
                        "start": 1426.789,
                        "end": 1427.089
                    },
                    {
                        "word": "million",
                        "start": 1427.951,
                        "end": 1428.292
                    },
                    {
                        "word": "years",
                        "start": 1428.352,
                        "end": 1428.693
                    },
                    {
                        "word": "have",
                        "start": 1429.214,
                        "end": 1429.374
                    },
                    {
                        "word": "tended",
                        "start": 1429.454,
                        "end": 1429.795
                    },
                    {
                        "word": "to",
                        "start": 1429.875,
                        "end": 1429.955
                    },
                    {
                        "word": "be",
                        "start": 1430.015,
                        "end": 1430.175
                    },
                    {
                        "word": "more",
                        "start": 1430.215,
                        "end": 1430.556
                    },
                    {
                        "word": "intense",
                        "start": 1430.576,
                        "end": 1431.257
                    },
                    {
                        "word": "every",
                        "start": 1431.558,
                        "end": 1431.778
                    },
                    {
                        "word": "26",
                        "start": 1431.799,
                        "end": 1432.159
                    },
                    {
                        "word": "million",
                        "start": 1432.56,
                        "end": 1432.921
                    },
                    {
                        "word": "years.",
                        "start": 1432.981,
                        "end": 1433.342
                    },
                    {
                        "word": "This",
                        "start": 1434.263,
                        "end": 1434.464
                    },
                    {
                        "word": "periodic",
                        "start": 1434.604,
                        "end": 1435.185
                    },
                    {
                        "word": "extinction",
                        "start": 1435.305,
                        "end": 1435.866
                    },
                    {
                        "word": "might",
                        "start": 1435.947,
                        "end": 1436.147
                    },
                    {
                        "word": "be",
                        "start": 1436.227,
                        "end": 1436.347
                    },
                    {
                        "word": "due",
                        "start": 1436.407,
                        "end": 1436.668
                    },
                    {
                        "word": "to",
                        "start": 1436.768,
                        "end": 1436.888
                    },
                    {
                        "word": "intersection",
                        "start": 1436.928,
                        "end": 1437.73
                    },
                    {
                        "word": "of",
                        "start": 1438.131,
                        "end": 1438.191
                    },
                    {
                        "word": "the",
                        "start": 1438.231,
                        "end": 1438.351
                    },
                    {
                        "word": "Earth's",
                        "start": 1438.411,
                        "end": 1438.672
                    },
                    {
                        "word": "orbit",
                        "start": 1438.892,
                        "end": 1439.193
                    },
                    {
                        "word": "with",
                        "start": 1439.413,
                        "end": 1439.554
                    },
                    {
                        "word": "a",
                        "start": 1439.614,
                        "end": 1439.634
                    },
                    {
                        "word": "cloud",
                        "start": 1439.714,
                        "end": 1440.014
                    },
                    {
                        "word": "of",
                        "start": 1440.075,
                        "end": 1440.115
                    },
                    {
                        "word": "comets,",
                        "start": 1440.215,
                        "end": 1440.696
                    },
                    {
                        "word": "but",
                        "start": 1441.257,
                        "end": 1441.397
                    },
                    {
                        "word": "this",
                        "start": 1441.457,
                        "end": 1441.638
                    },
                    {
                        "word": "theory",
                        "start": 1441.718,
                        "end": 1442.078
                    },
                    {
                        "word": "is",
                        "start": 1442.239,
                        "end": 1442.299
                    },
                    {
                        "word": "purely",
                        "start": 1442.459,
                        "end": 1442.88
                    },
                    {
                        "word": "speculative.",
                        "start": 1443.04,
                        "end": 1444.483
                    },
                    {
                        "word": "Some",
                        "start": 1444.463,
                        "end": 1444.823
                    },
                    {
                        "word": "researchers",
                        "start": 1444.904,
                        "end": 1445.524
                    },
                    {
                        "word": "have",
                        "start": 1445.604,
                        "end": 1445.724
                    },
                    {
                        "word": "also",
                        "start": 1445.825,
                        "end": 1446.145
                    },
                    {
                        "word": "speculated",
                        "start": 1446.245,
                        "end": 1446.926
                    },
                    {
                        "word": "that",
                        "start": 1446.946,
                        "end": 1447.126
                    },
                    {
                        "word": "extinction",
                        "start": 1447.206,
                        "end": 1447.827
                    },
                    {
                        "word": "may",
                        "start": 1447.967,
                        "end": 1448.107
                    },
                    {
                        "word": "be",
                        "start": 1448.167,
                        "end": 1448.268
                    },
                    {
                        "word": "random.",
                        "start": 1448.368,
                        "end": 1448.848
                    },
                    {
                        "word": "That",
                        "start": 1449.569,
                        "end": 1449.769
                    },
                    {
                        "word": "is,",
                        "start": 1449.889,
                        "end": 1450.03
                    },
                    {
                        "word": "certain",
                        "start": 1450.09,
                        "end": 1450.75
                    },
                    {
                        "word": "species",
                        "start": 1450.831,
                        "end": 1451.411
                    },
                    {
                        "word": "may",
                        "start": 1451.551,
                        "end": 1451.712
                    },
                    {
                        "word": "be",
                        "start": 1451.752,
                        "end": 1451.852
                    },
                    {
                        "word": "eliminated",
                        "start": 1451.932,
                        "end": 1452.472
                    },
                    {
                        "word": "and",
                        "start": 1452.513,
                        "end": 1452.953
                    },
                    {
                        "word": "others",
                        "start": 1453.073,
                        "end": 1453.313
                    },
                    {
                        "word": "may",
                        "start": 1453.374,
                        "end": 1453.534
                    },
                    {
                        "word": "survive",
                        "start": 1453.654,
                        "end": 1454.275
                    },
                    {
                        "word": "for",
                        "start": 1454.295,
                        "end": 1454.595
                    },
                    {
                        "word": "no",
                        "start": 1454.675,
                        "end": 1454.855
                    },
                    {
                        "word": "particular",
                        "start": 1454.935,
                        "end": 1455.496
                    },
                    {
                        "word": "reason.",
                        "start": 1455.556,
                        "end": 1455.917
                    },
                    {
                        "word": "A",
                        "start": 1456.738,
                        "end": 1456.778
                    },
                    {
                        "word": "species'",
                        "start": 1456.838,
                        "end": 1457.278
                    },
                    {
                        "word": "survival",
                        "start": 1457.318,
                        "end": 1457.879
                    },
                    {
                        "word": "may",
                        "start": 1457.919,
                        "end": 1458.059
                    },
                    {
                        "word": "have",
                        "start": 1458.099,
                        "end": 1458.219
                    },
                    {
                        "word": "nothing",
                        "start": 1458.319,
                        "end": 1458.58
                    },
                    {
                        "word": "to",
                        "start": 1458.62,
                        "end": 1458.7
                    },
                    {
                        "word": "do",
                        "start": 1458.76,
                        "end": 1458.9
                    },
                    {
                        "word": "with",
                        "start": 1458.94,
                        "end": 1459.08
                    },
                    {
                        "word": "its",
                        "start": 1459.14,
                        "end": 1459.261
                    },
                    {
                        "word": "ability",
                        "start": 1459.321,
                        "end": 1459.781
                    },
                    {
                        "word": "or",
                        "start": 1459.901,
                        "end": 1459.981
                    },
                    {
                        "word": "inability",
                        "start": 1460.001,
                        "end": 1460.742
                    },
                    {
                        "word": "to",
                        "start": 1460.842,
                        "end": 1460.963
                    },
                    {
                        "word": "adapt.",
                        "start": 1461.063,
                        "end": 1461.483
                    },
                    {
                        "word": "If",
                        "start": 1462.304,
                        "end": 1462.384
                    },
                    {
                        "word": "so,",
                        "start": 1462.484,
                        "end": 1462.785
                    },
                    {
                        "word": "some",
                        "start": 1463.365,
                        "end": 1463.566
                    },
                    {
                        "word": "of",
                        "start": 1463.646,
                        "end": 1463.686
                    },
                    {
                        "word": "evolutionary",
                        "start": 1463.826,
                        "end": 1464.507
                    },
                    {
                        "word": "history",
                        "start": 1464.607,
                        "end": 1465.047
                    },
                    {
                        "word": "may",
                        "start": 1465.168,
                        "end": 1465.308
                    },
                    {
                        "word": "reflect",
                        "start": 1465.388,
                        "end": 1465.828
                    },
                    {
                        "word": "a",
                        "start": 1465.908,
                        "end": 1465.928
                    },
                    {
                        "word": "sequence",
                        "start": 1466.029,
                        "end": 1466.489
                    },
                    {
                        "word": "of",
                        "start": 1466.629,
                        "end": 1466.669
                    },
                    {
                        "word": "essentially",
                        "start": 1466.709,
                        "end": 1467.49
                    },
                    {
                        "word": "random",
                        "start": 1467.691,
                        "end": 1468.151
                    },
                    {
                        "word": "events.",
                        "start": 1468.311,
                        "end": 1468.952
                    }
                ]
            }
        ]
    }
];

// 合并新旧数据
export const RAW_CONVERSATION_DATA: Conversation[] = [
    ...existingData,
    ...processedNewData,
    ...processedIelts18Data
];

// -------- Helpers: 拆分过长句子为更短的 Sentence --------

const MAX_WORDS_PER_SENTENCE = 40;

function isSentenceEndWord(word: string): boolean {
    const trimmed = word.trim();
    if (!trimmed) return false;
    const lastChar = trimmed.charAt(trimmed.length - 1);
    return lastChar === '.' || lastChar === '?' || lastChar === '!';
}

function splitLongSentence(original: Sentence, maxWords: number = MAX_WORDS_PER_SENTENCE): Sentence[] {
    const result: Sentence[] = [];
    let currentWords: Word[] = [];

    for (let i = 0; i < original.words.length; i++) {
        const w = original.words[i];
        currentWords.push(w);

        const reachedMax = currentWords.length >= maxWords;
        const isEndPunc = isSentenceEndWord(w.word);
        const isLastWord = i === original.words.length - 1;

        if (isEndPunc || reachedMax || isLastWord) {
            const start = currentWords[0].start;
            const end = currentWords[currentWords.length - 1].end;

            const text = currentWords
                .map(wordObj => wordObj.word)
                .join(' ')
                .replace(/\s+([,.!?;:])/g, '$1');

            result.push({
                text,
                start,
                end,
                words: currentWords,
                // 继承原句的配图信息，用于 Study 模式句子画面展示
                img: original.img,
            });

            currentWords = [];
        }
    }

    return result;
}

function normalizeConversationSentences(sentences: Sentence[]): Sentence[] {
    return sentences.flatMap(s => splitLongSentence(s, MAX_WORDS_PER_SENTENCE));
}

// 对外暴露的对话数据：已按规则拆分过长句子
export const CONVERSATION_DATA: Conversation[] = RAW_CONVERSATION_DATA.map(conversation => ({
    ...conversation,
    // # TODO: 不拆分试试
    sentences: normalizeConversationSentences(conversation.sentences),
    // sentences: conversation.sentences,
}));
