import React from 'react'
import axios from 'axios'

const API_KEY = '50f53cd4518d47e1be6462049f82e2da';
    const url = 'https://newsapi.org/v2'
    export const getTopHeadlines = async (country = 'us', page = 1, pageSize = 8) => {
        try {
            const response =  await axios.get(`${url}/top-headlines`, {
                params:{
                    country: country,
                    apiKey: API_KEY,
                    page: page,
                    pageSize: pageSize
                }
            })
            return {
                articles: response.data.articles,
                totalResults: response.data.totalResults
            }
        } catch (error) {
            console.error('Error fetching top headlines:', error)
            return []
        }
    }
    export const getBreakingNews = async () => {
        try {
            const response = await axios.get(`${url}/everything`,{
                params:{
                    q: 'breaking',
                    sortBy: 'publishedAt',
                    language: 'en',
                    apiKey: API_KEY,
                    pageSize: 10,
                }
            })
            return {
                articles: response.data.articles,
                totalResults: response.data.totalResults
            }
        } catch (error) {
            console.error('Error fetching breaking news:', error)
            return []
        }
    }
    export const getCategoryNews = async (category, page = 1, pageSize = 8) => {
        try {
            const response = await axios.get(`${url}/top-headlines`, {
                params:{
                    category,
                    country: 'us',
                    apiKey: API_KEY,
                    page: page,
                    pageSize: pageSize,
                    
                }
            })
            return {
                articles: response.data.articles,
                totalResults: response.data.totalResults
            }
        } catch (error) {
            console.error('Error fetching category news:', error)
            return { articles: [], totalResults: 0 }
        }
    }
    export const getSearchNews = async (query, page = 1, pageSize = 8) => {
        try {
            const response = await axios.get(`${url}/everything`, {
                params: {
                    q: query,
                    apiKey: API_KEY,
                    page: page,
                    pageSize: pageSize
                }
            })
            return {
                articles: response.data.articles,
                totalResults: response.data.totalResults
            }
        } catch (error) {
            console.error('Error searching news:', error)
            return { articles: [], totalResults: 0 }
        }
    }
