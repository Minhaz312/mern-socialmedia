import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/constants';
import getAuthToken from '../../helpers/getAuthToken';
import { jsonHeaders } from '../../helpers/axiosHeaders';
export const friendshipApi = createApi({
    reducerPath:"friendshipApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${API_URL}/friendship`
    }),
    endpoints:builder=>({
        getFriendList:builder.query({
            query:(page=0)=>({
                url:`/get/${page}`,
                method:"GET",
                headers:jsonHeaders
            })
        })
    })
})

export const { useGetFriendListQuery } = friendshipApi;