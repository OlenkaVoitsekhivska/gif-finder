import { GenericResponse } from '../../../shared/models/api-response.model';
import { Gif } from '../../../shared/models/gif.model';

export const mockGifDetailsResponse: GenericResponse<Gif[]> = {
  data: [
    {
      id: 'ND6xkVPaj8tHO',
      url: 'https://giphy.com/gifs/cat-money-cash-ND6xkVPaj8tHO',
      username: '',
      slug: 'funny-cat',
      source: 'http://gifs.tastefullyoffensive.com/post/127026664737',
      title: 'Cat Money GIF',
      create_datetime: '2016-06-13 17:26:20',
      images: {
        original: {
          height: '310',
          width: '334',
          mp4: 'https://media0.giphy.com/media/v1.Y2lkPWZlMGIxZGVhN2Q4NmNzOWpoZWdleWF3bGVxdjQzbjl0dXlrdnNyb2NwN2J1c3kzdSZlcD12MV9naWZzJmN0PWc/ND6xkVPaj8tHO/giphy.mp4',
          webp: 'https://media0.giphy.com/media/v1.Y2lkPWZlMGIxZGVhN2Q4NmNzOWpoZWdleWF3bGVxdjQzbjl0dXlrdnNyb2NwN2J1c3kzdSZlcD12MV9naWZzJmN0PWc/ND6xkVPaj8tHO/giphy.webp',
        },

        fixed_width: {
          height: '200',
          width: '216',
          url: 'https://media0.giphy.com/media/v1.Y2lkPWZlMGIxZGVhN2Q4NmNzOWpoZWdleWF3bGVxdjQzbjl0dXlrdnNyb2NwN2J1c3kzdSZlcD12MV9naWZzJmN0PWc/ND6xkVPaj8tHO/200.gif',

          mp4: 'https://media0.giphy.com/media/v1.Y2lkPWZlMGIxZGVhN2Q4NmNzOWpoZWdleWF3bGVxdjQzbjl0dXlrdnNyb2NwN2J1c3kzdSZlcD12MV9naWZzJmN0PWc/ND6xkVPaj8tHO/200.mp4',
          webp: 'https://media0.giphy.com/media/v1.Y2lkPWZlMGIxZGVhN2Q4NmNzOWpoZWdleWF3bGVxdjQzbjl0dXlrdnNyb2NwN2J1c3kzdSZlcD12MV9naWZzJmN0PWc/ND6xkVPaj8tHO/200.webp',
        },
      },
      alt_text:
        'Video gif. A gray kitten guards a banded stack of money from an invading human hand with a sassy swat.',
    },
  ],
  meta: {
    status: 200,
    msg: 'OK',
    response_id: '7d86cs9jhegeyawleqv43n9tuykvsrocp7busy3u',
  },
  pagination: {
    total_count: 1,
    count: 1,
    offset: 0,
  },
};
