import React, { useEffect, useState } from 'react'
import Layout from './../../components/common/Layout'
import SearchHelpTobBar from '../../components/search/SearchHelpTobBar'
import { useParams } from 'react-router-dom'
import { getSearchItem } from '../../api/search'
import PeopleItem from '../../components/search/PeopleItem'
import { useGetAuthUserQuery } from '../../store/services/user'

function RenderResult({searchItem}){
    const {error,isLoading,data} = useGetAuthUserQuery()
    if(searchItem.type==="people" && isLoading===false && data!==undefined && error===undefined){
        const peopleList = searchItem.data.filter(item=>item._id!==data.data._id);
        return <div className='grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-3 mt-3'>
            {peopleList.map((people,i)=><PeopleItem key={i} people={people} />)}
        </div>
    }else{
        return "hoo"
    }
}

export default function Search() {
    const params = useParams()
    const [searchResult, setSearchResult] = useState([])
    useEffect(()=>{
        getSearchItem(params.keyword,(err,result)=>{
            console.log("came to search effect",result,err)
            if(err===null){
                console.log(result)
                setSearchResult(result);
            }
        })
    },[params.keyword])
  return (
    <Layout>
        <SearchHelpTobBar />
        {
            searchResult.map((item,i)=><RenderResult key={i} searchItem={item} />)
        }
    </Layout>
  )
}
