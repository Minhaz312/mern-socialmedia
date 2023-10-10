import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/constants';
import getAuthToken from '../../helpers/getAuthToken';
import { jsonHeaders } from '../../helpers/axiosHeaders';
const {token,user} = getAuthToken()
export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${API_URL}/user`
    }),
    endpoints:builder=>({
        getAuthUser:builder.query({
            query:()=>({
                url:`/get/${user}`,
                method:"GET",
                headers:jsonHeaders
            })
        }),
    })
})

export const { useGetAuthUserQuery } = userApi;