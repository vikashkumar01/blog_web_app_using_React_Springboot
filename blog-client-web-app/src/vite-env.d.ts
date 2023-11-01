/// <reference types="vite/client" />

export interface signupPropsType {
    message: string;
}

export interface signinPropsType {
    token: string;
    message: string;

}

export interface errorMessagePropsType {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    message?: string
}

export interface signinPropsType {
    message: string,
    user: userPropsType,
}

export interface errorMessageProps {
    email?: string,
    password?: string,
    message?: string,
}

export interface errorUserMessage {
    firstName?: string,
    lastName?: string,
    email?: string,
    message?: string
}


export interface contactPropsType {
    id: string,
    name: string,
    email: string,
    message: string
}

export interface rolesPropsType {
    id: number
    name: string
}

export interface categoryPropsType {
    id: string,
    cateName: string,
    created_At: string,
    updated_At: string
}

export interface errorCategoryPropsType {
    message: string
}

export interface postWithPage {
    content: postPropsType[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number:number,
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    size: number,
    pageable:{
        offset: number,
        pageSize: number,
        pageNumber: number,
        paged:boolean,
        unpaged:boolean,
        sort:[
            empty:boolean,
            sorted:boolean,
            unsorted:boolean
        ]
    }


}

export interface userWithPage {
    content: userPropsType[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number:number,
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    size: number,
    pageable:{
        offset: number,
        pageSize: number,
        pageNumber: number,
        paged:boolean,
        unpaged:boolean,
        sort:[
            empty:boolean,
            sorted:boolean,
            unsorted:boolean
        ]
    }


}

export interface CategoryWithPage {
    content: categoryPropsType[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number:number,
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    size: number,
    pageable:{
        offset: number,
        pageSize: number,
        pageNumber: number,
        paged:boolean,
        unpaged:boolean,
        sort:[
            empty:boolean,
            sorted:boolean,
            unsorted:boolean
        ]
    }


}

export interface postPropsType {
    id: string,
    title: string
    subTitle: string
    description: string
    postImgUrl: string
    postImageId: string
    isFeatured: boolean
    category: categoryPropsType
    createdAt: string
    updatedAt: string
}

export interface errorPostPropsType {
    message: string,
    title: string,
    subTitle: string,
    description: string,
}

export interface userPropsType {
    id: string
    firstName: string,
    lastName: string
    email: string
    userPicUrl?: string
    userPicId?: string
    roles: rolesPropsType[]
    userPost: postPropsType[]
    created_At: string
    updated_At: string

}

export interface dashboardPropsTypes{
    userCount:number,
    postCount:number,
    categoryCount:number,

}

export interface pageableProps {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
  }
  
 export interface pageProps {
    totalPages: number
    firstPage: boolean
    lastPage: boolean
    pageable: pageableProps
    setOffset: React.Dispatch<React.SetStateAction<number>>
    offset?:number
  }

  export interface messageWithPage {
    content: messagePropsType[],
    empty: boolean,
    first: boolean,
    last: boolean,
    number:number,
    numberOfElements: number,
    totalElements: number,
    totalPages: number,
    size: number,
    pageable:{
        offset: number,
        pageSize: number,
        pageNumber: number,
        paged:boolean,
        unpaged:boolean,
        sort:[
            empty:boolean,
            sorted:boolean,
            unsorted:boolean
        ]
    }
  }

 export interface messagePropsType{
      id:string,
      name:string,
      email:string,
      message:string,
      created_At:string,
  }
