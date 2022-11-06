import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '32da0f0546msh0f1a8c6c543af8fp18dd2fjsn89afb5544787',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      
}
    
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';
const createRequest = (url) => ({
    url, 
    headers: cryptoNewsApiHeaders
});

export const cryptoNewsApi = createApi({
        reducerPath : 'cryptoNewsApi',
        baseQuery : fetchBaseQuery({
            baseUrl
        }),
        endpoints : (builder) => ({
            getCryptoNews : builder.query({
                query : ({newsCategory, count}) =>  createRequest(`/news/search?q=${newsCategory}&safeSearch=off&textFormat=Raw&freshness=Day&count=${count}`)
            })
        })
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;


