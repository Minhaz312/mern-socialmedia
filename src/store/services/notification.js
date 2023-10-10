import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/constants';
import getAuthToken from '../../helpers/getAuthToken';
import { jsonHeaders } from '../../helpers/axiosHeaders';
const {token,user} = getAuthToken()
export const notificationApi = createApi({
    reducerPath:"notificationApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${API_URL}/notification`
    }),
    endpoints:builder=>({
        getNotification:builder.mutation({
            query:(page)=>({
                url:`/get/${page}`,
                method:"GET",
                headers:jsonHeaders
            })
        }),
    })
})

export const { useGetNotificationMutation } = notificationApi;