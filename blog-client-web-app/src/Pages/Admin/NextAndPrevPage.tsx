
import { pageProps } from '../../vite-env';
import './admin.scss'

const NextAndPrevPage: React.FC<pageProps> = ({ totalPages, firstPage, lastPage, pageable, setOffset }) => {
   
  if(totalPages === 0) {
    return null;
  }

  return (
    <>
      <button disabled={firstPage} onClick={()=>setOffset(0)} className={firstPage?"disableBtn":"activeBtn"}>First</button>
      <button disabled={firstPage} onClick={()=>setOffset(pageable.pageNumber-1)} className={firstPage?"disableBtn":"activeBtn"}>{"<"}</button>
      <span>{pageable?.pageNumber+1} of {totalPages}</span>
      <button disabled={lastPage} onClick={()=>setOffset(pageable.pageNumber+1)} className={lastPage?"disableBtn":"activeBtn"}>{">"}</button>
      <button disabled={lastPage} onClick={()=>setOffset(totalPages-1)} className={lastPage?"disableBtn":"activeBtn"}>Last</button>
    </>
  )
}

export default NextAndPrevPage