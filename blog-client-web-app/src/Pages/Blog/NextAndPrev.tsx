

import './blog.scss'
import { pageProps } from '../../vite-env'


const NextAndPrev: React.FC<pageProps> = ({ totalPages, firstPage, lastPage, pageable, setOffset }) => {
    
      
    return (
        <div className='next-prev-container'>
            <button disabled={firstPage} onClick={()=>setOffset(0)} >First</button>
            <button disabled={firstPage} onClick={()=>setOffset(pageable?.pageNumber-1)}>Prev</button>
            {
                [...Array(totalPages)]?.map((_, i: number) => (
                    <button key={i} onClick={()=>setOffset(i)} className={pageable?.pageNumber===i?"activeBtn":undefined}>{i+1}</button>
                ))
            }
            <button disabled={lastPage} onClick={()=>{setOffset(pageable?.pageNumber+1)}}>Next</button>
            <button disabled={lastPage} onClick={()=>setOffset(totalPages-1)}>Last</button>
        </div>
    )
}

export default NextAndPrev