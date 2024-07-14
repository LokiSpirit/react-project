import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://swapi.dev/api/films/1/', () => {
    return HttpResponse.json({
      name: 'A New Hope',
      director: 'George Lucas',
    });
  }),
];
